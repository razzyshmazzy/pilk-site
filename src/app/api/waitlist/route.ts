/**
 * Waitlist submission endpoint.
 *
 * POST /api/waitlist
 *
 * Responsibilities:
 *   - Server-side validation + normalization (authoritative).
 *   - Spam defense: honeypot field, minimum fill time, per-IP rate limit.
 *   - Persistence via the pluggable waitlist store.
 *   - Safe errors: never leaks stack traces or internal detail to the client.
 */

import { NextResponse } from "next/server";
import { validateWaitlist } from "@/lib/validation";
import { getWaitlistStore } from "@/lib/waitlist";
import { rateLimit, pruneRateLimitBuckets } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";

// This route must run on the Node.js runtime (filesystem + optional pg driver).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface WaitlistBody {
  email?: string;
  firstName?: string;
  organization?: string;
  useCase?: string;
  referralCode?: string;
  // Honeypot: named to look like a real field to naive bots. Humans never see it.
  company_website?: string;
  // Client timestamp (ms) of when the form was rendered, for a fill-time check.
  renderedAt?: number;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  let body: WaitlistBody;
  try {
    body = (await req.json()) as WaitlistBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  // 1) Honeypot — a filled hidden field means a bot. Pretend success.
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return NextResponse.json({ ok: true, status: "created" });
  }

  // 2) Fill-time heuristic — submissions faster than a human can type are bots.
  if (typeof body.renderedAt === "number" && Number.isFinite(body.renderedAt)) {
    const elapsedSeconds = (Date.now() - body.renderedAt) / 1000;
    if (elapsedSeconds >= 0 && elapsedSeconds < siteConfig.waitlist.minSubmitSeconds) {
      // Silently accept without persisting — don't tip off bots.
      return NextResponse.json({ ok: true, status: "created" });
    }
  }

  // 3) Rate limit per IP.
  pruneRateLimitBuckets();
  const limit = rateLimit(`waitlist:${clientIp(req)}`, { limit: 5, windowMs: 60_000 });
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again in a moment." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  // 4) Validate + normalize.
  const result = validateWaitlist({
    email: body.email ?? "",
    firstName: body.firstName,
    organization: body.organization,
    useCase: body.useCase,
    referralCode: body.referralCode,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  // 5) Persist.
  try {
    const store = getWaitlistStore();
    const { status } = await store.add(result.value);
    return NextResponse.json({ ok: true, status });
  } catch (err) {
    // Log server-side for debugging; return a generic message to the client.
    console.error("[waitlist] failed to persist submission:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Please try again." },
      { status: 500 },
    );
  }
}

// Reject other methods cleanly.
export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
