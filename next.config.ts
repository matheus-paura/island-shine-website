import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the whole site is prerendered HTML with no server-side
  // logic (the quote form posts client-side straight to the n8n webhook),
  // so it deploys as plain static files — ideal for Cloudflare Pages.
  output: "export",
  // `next dev` and `next build` sharing one .next folder corrupts the dev
  // cache (CSS 404s, unstyled page) whenever a build runs mid-session.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    // The image optimization API needs a server, which static export
    // doesn't have. Source images are already pre-sized/compressed.
    unoptimized: true,
  },
  // No provider-locked APIs — deployable to Cloudflare Pages, Vercel,
  // Netlify, or any static host.
};

export default nextConfig;
