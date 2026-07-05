import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
  },
  // No provider-locked APIs — deployable to Vercel, Netlify, or any Node host.
};

export default nextConfig;
