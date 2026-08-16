/**
 * Shared validation and normalization helpers for waitlist submissions.
 * Used on both the server (authoritative) and, where useful, the client.
 */

// Pragmatic email pattern: one @, a dot in the domain, no whitespace.
// Deliberately not RFC-5322-exhaustive — we want to reject obvious junk without
// bouncing valid real-world addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const USE_CASES = [
  "Dinner with friends",
  "College / student groups",
  "Work meals",
  "Trips",
  "Something else",
] as const;

export type UseCase = (typeof USE_CASES)[number];

export interface WaitlistInput {
  email: string;
  firstName?: string;
  organization?: string;
  useCase?: string;
  referralCode?: string;
}

export interface NormalizedWaitlistEntry {
  email: string;
  firstName: string | null;
  organization: string | null;
  useCase: UseCase | null;
  referralCode: string | null;
}

export type ValidationResult =
  | { ok: true; value: NormalizedWaitlistEntry }
  | { ok: false; error: string };

/** Lowercases and trims an email for consistent storage and dedupe. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  const e = normalizeEmail(email);
  return e.length <= 254 && EMAIL_RE.test(e);
}

/** Trims a free-text field to a max length, returning null when empty. */
function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, maxLength);
  return trimmed.length > 0 ? trimmed : null;
}

/** Referral codes are alphanumeric + dash/underscore, capped for safety. */
function cleanReferralCode(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const match = value.trim().slice(0, 64).match(/^[A-Za-z0-9_-]+$/);
  return match ? match[0] : null;
}

/**
 * Validates and normalizes raw waitlist input into a storable entry.
 * All server-side gatekeeping (required email, format) lives here.
 */
export function validateWaitlist(input: WaitlistInput): ValidationResult {
  const email = normalizeEmail(input.email ?? "");

  if (!email) {
    return { ok: false, error: "Please enter your email address." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: "That email doesn't look quite right." };
  }

  const useCaseRaw = cleanText(input.useCase, 64);
  const useCase = (USE_CASES as readonly string[]).includes(useCaseRaw ?? "")
    ? (useCaseRaw as UseCase)
    : null;

  return {
    ok: true,
    value: {
      email,
      firstName: cleanText(input.firstName, 80),
      organization: cleanText(input.organization, 120),
      useCase,
      referralCode: cleanReferralCode(input.referralCode),
    },
  };
}
