import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";

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

  // Engineering Library document detail pages (/engineering-library/[slug])
  // are unlinked "content coming soon" stubs until Airtech supplies the real
  // decks — they resolve on demand but aren't indexable content yet, so they
  // stay out of the sitemap. Add them back once the list links to them.

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...projectRoutes];
}
