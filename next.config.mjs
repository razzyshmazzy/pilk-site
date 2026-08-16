/** @type {import('next').NextConfig} */

// GitHub Pages serves static files only, so the site is built as a static
// export. When hosted at https://<user>.github.io/<repo>, all routes live under
// a "/<repo>" base path. Both are configurable via env so the same code can
// deploy to a custom domain (set NEXT_PUBLIC_BASE_PATH="") without edits.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/pilk-site";

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  basePath: basePath || undefined,
  // Emit /route/index.html so paths resolve cleanly on static hosts.
  trailingSlash: true,
  images: {
    // The static export target can't run the Next image optimizer.
    unoptimized: true,
  },
};

export default nextConfig;
