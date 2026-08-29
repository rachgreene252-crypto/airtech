import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { resources } from "@/content/resources";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.airtech.com.np";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/expertise",
    "/industries",
    "/projects",
    "/service-support",
    "/company",
    "/company/history",
    "/company/leadership",
    "/company/quality-certifications",
    "/company/careers",
    "/how-we-work",
    "/engineering-library",
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

  const industryRoutes = industries.map((i) => ({
    url: `${siteUrl}/industries/${i.slug}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  const resourceRoutes = resources.map((r) => ({
    url: `${siteUrl}/engineering-library/${r.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...projectRoutes, ...resourceRoutes];
}
