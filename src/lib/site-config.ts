/**
 * Central site configuration.
 *
 * This is the single source of truth for company-level values that change over
 * time (name, domain, contact email, effective dates, governing law, etc.).
 * Legal pages and metadata pull from here so nothing has to be hunted down
 * across multiple files when something changes.
 *
 * Values wrapped in brackets like `[PILK LEGAL ENTITY NAME]` are intentional
 * placeholders that require input from the Pilk founders before public launch.
 * They are tracked in the README "Before Public Launch" checklist.
 */

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

// The public-facing domain, derived from the site URL, used for `hello@domain`.
function domainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "pilk.com";
  }
}

const domain = domainFromUrl(siteUrl === "http://localhost:3000" ? "https://pilk.com" : siteUrl);

export const siteConfig = {
  /** Product / brand display name. */
  name: "Pilk",

  /** Short tagline used in metadata and social cards. */
  tagline: "Split the check. Not the friendship.",

  /** One-line description used for SEO. */
  description:
    "Pilk makes splitting restaurant checks simple. Scan in, choose your share, and get everyone paid without the post-dinner Venmo chase.",

  /** Canonical site URL (no trailing slash). Configured via NEXT_PUBLIC_SITE_URL. */
  url: siteUrl,

  /** Public domain, e.g. "pilk.com". */
  domain,

  /**
   * Registered legal entity name. UNKNOWN until the founders confirm it.
   * Placeholder — see README "Before Public Launch".
   */
  legalName: "[PILK LEGAL ENTITY NAME]",

  /**
   * Governing law for the Terms of Service. UNKNOWN until confirmed.
   * Placeholder — see README "Before Public Launch".
   */
  governingLaw: "[GOVERNING STATE / JURISDICTION]",

  /**
   * Business mailing address, if legally required to be published. UNKNOWN.
   * Placeholder — see README "Before Public Launch".
   */
  businessAddress: "[BUSINESS ADDRESS, IF REQUIRED]",

  /** Support / general contact email. Defaults to hello@<domain>. */
  supportEmail: `hello@${domain}`,

  /** Privacy-specific contact email. */
  privacyEmail: `privacy@${domain}`,

  /**
   * Effective / last-updated date for legal documents. Update when legal
   * language changes. Keep in ISO format; display is formatted for readers.
   */
  legalEffectiveDate: "2026-08-15",

  /** Social profiles. Leave empty to hide the corresponding footer link. */
  social: {
    x: "", // e.g. "https://x.com/pilk"
    instagram: "",
  },

  /** Waitlist behavior toggles. */
  waitlist: {
    enabled: true,
    // Minimum seconds a human is expected to take before submitting the form.
    // Used as a lightweight bot heuristic alongside the honeypot field.
    minSubmitSeconds: 2,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Formats an ISO date (YYYY-MM-DD) as e.g. "August 15, 2026". */
export function formatLegalDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
