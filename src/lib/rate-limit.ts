/**
 * Tiny in-memory, best-effort rate limiter.
 *
 * This is intentionally simple: it guards a single server instance against
 * obvious abuse (rapid repeated submissions from one IP). It is NOT a
 * distributed limiter — for production scale behind multiple instances, back
 * this with Redis/Upstash or a WAF rule. It fails open on purpose so a limiter
 * hiccup never blocks a legitimate signup.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

// Opportunistic cleanup so the map doesn't grow unbounded on long-lived servers.
export function pruneRateLimitBuckets(now = Date.now()): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}
