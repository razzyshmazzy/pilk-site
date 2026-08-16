/** @type {import('next').NextConfig} */

// GitHub Pages serves static files only, so the site is built as a static
// export. The site is deployed to the custom domain https://gotpilk.com, which
// serves at the root — so the base path is empty by default. To host at a
// project-page path instead (https://<user>.github.io/<repo>), set
// NEXT_PUBLIC_BASE_PATH="/<repo>". The deploy workflow sets this automatically.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
