// GitHub Pages project sites are served from a subpath (https://<user>.github.io/VPM).
// basePath makes all routes and asset URLs resolve correctly there. Only applied
// for production builds so the local dev server keeps working at "/".
// → Hosting at a user/org page or a custom domain (served from root)? Set
//   NEXT_PUBLIC_BASE_PATH="" (empty) or change the fallback below to "".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a fully static site (no Node server needed) for GitHub Pages.
  output: "export",
  // next/image optimization needs a server; disable it for static export.
  images: { unoptimized: true },
  // Export each route as a folder with index.html — plays nicely with Pages.
  trailingSlash: true,
  basePath,
};

export default nextConfig;
