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

// Deployment origin (scheme + host, no path). On GitHub Pages this is
// https://<user>.github.io; with a custom domain it's that domain.
const origin = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

// Base path the site is served under. Empty for the custom domain (gotpilk.com)
// or a user page; "/<repo>" for a GitHub project page. Kept in sync with
// next.config.mjs via the same env var.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

// Full public URL of the site's home page (origin + base path).
const siteUrl = `${origin}${basePath}`;

// Brand domain used for contact emails. Intentionally independent of where the
// site is hosted. Defaults to the production domain, gotpilk.com.
const domain = process.env.NEXT_PUBLIC_BRAND_DOMAIN || "gotpilk.com";

export const siteConfig = {
  /** Deployment origin (no path), used as metadataBase. */
  origin,

  /** Base path the site is served under (e.g. "/pilk-site", or "" for a domain). */
  basePath,


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

/**
 * Builds a root-relative canonical path including the base path. Resolved by
 * Next against `metadataBase` (the origin) to a full URL. Pass "/" for home.
 */
export function canonical(path = "/"): string {
  const suffix = path === "/" ? "/" : path;
  return `${siteConfig.basePath}${suffix}` || "/";
}

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
