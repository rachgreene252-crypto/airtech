import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { projects } from "@/content/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.airtech.com.np";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/expertise",
    "/projects",
    "/service-support",
    "/company",
    "/company/history",
    "/company/leadership",
    "/company/quality-certifications",
    "/company/careers",
    "/how-we-work",
    "/contact",
    "/contact/project-enquiry",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${siteUrl}/expertise/${s.slug}`,
    lastModified: new Date(),
  }));

  // /industries and /industries/[slug] redirect into the project explorer
  // (/projects?industry=…), so they aren't listed.

  const projectRoutes = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  // The Engineering Library was removed 2026-10-29 (client); its URLs redirect.

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
