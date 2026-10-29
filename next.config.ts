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
      // Engineering Library removed 2026-10-29 (client: "we will cut off").
      { source: "/resources/:slug*", destination: "/expertise", permanent: false },
      { source: "/engineering-library/:slug*", destination: "/expertise", permanent: false },
      // Merged 2026-09-28: same resort was listed twice (client filename
      // "The Terraces Resort & Spa, Lalitpur").
      { source: "/projects/the-terraces-resort-spa", destination: "/projects/the-terrace-resort-lalitpur", permanent: true },
      // 2026-10-29 client brief: Hyatt Place → Hyatt Centric; Aloft and
      // Marwadi Parishad withdrawn from the portfolio.
      { source: "/projects/hyatt-place-kathmandu", destination: "/projects/hyatt-centric-kathmandu", permanent: true },
      { source: "/projects/aloft-kathmandu-thamel", destination: "/projects?industry=hospitality", permanent: false },
      { source: "/projects/marwadi-parishad", destination: "/projects", permanent: false },
    ];
  },
};

export default nextConfig;
