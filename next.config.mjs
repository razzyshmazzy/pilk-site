/** @type {import('next').NextConfig} */

// Security headers applied to every route. These are intentionally conservative
// so they don't interfere with the marketing site while still hardening it.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // `pg` is an optional dependency used only when DATABASE_URL is configured.
  // Externalizing it keeps it out of the bundle so the build never requires it
  // to be installed; it's require()d at runtime only when actually used.
  serverExternalPackages: ["pg"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
