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
  },
  typedRoutes: true,
};

export default nextConfig;
