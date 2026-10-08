import type { NextConfig } from "next";
import { sanity } from "next-sanity/live/cache-life";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: { default: sanity },
  experimental: {
    // Default 1MB is too small for the project-enquiry form's document
    // upload (drawings/PDFs). See src/app/(site)/contact/actions.ts.
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // 90 is the site default (src/components/ui/Image.tsx); 75 stays allowed
    // for anything still calling next/image directly.
    qualities: [75, 90],
    // Photographs are cached for a year once optimised.
    minimumCacheTTL: 31536000,
  },
  typedRoutes: true,
  async redirects() {
    return [
      { source: "/resources", destination: "/engineering-library", permanent: true },
      { source: "/resources/:slug*", destination: "/engineering-library/:slug*", permanent: true },
      // Merged 2026-09-28: same resort was listed twice (client filename
      // "The Terraces Resort & Spa, Lalitpur").
      { source: "/projects/the-terraces-resort-spa", destination: "/projects/the-terrace-resort-lalitpur", permanent: true },
    ];
  },
};

export default nextConfig;
