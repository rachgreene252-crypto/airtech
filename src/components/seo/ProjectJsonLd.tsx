import type { Project } from "@/content/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.airtech.com.np";

/**
 * schema.org has no dedicated "construction project" type, so this encodes
 * the case study as CreativeWork (name/description/image/location are all
 * well-supported there) plus a BreadcrumbList. Only fields the project
 * actually has are included — no capacity/value/date invented to fill out
 * the schema. See docs/AIRTECH_CONTENT_AUDIT.md for what's sourced.
 */
export function ProjectJsonLd({ project, industryName }: { project: Project; industryName?: string }) {
  const creativeWork: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.seo.description,
    url: `${siteUrl}/projects/${project.slug}`,
  };
  if (project.heroImage?.src) {
    creativeWork.image = `${siteUrl}${project.heroImage.src}`;
  }
  if (project.location) {
    creativeWork.locationCreated = { "@type": "Place", name: project.location };
  }
  if (industryName) {
    creativeWork.about = industryName;
  }
  if (project.clientDisplayApproved && project.client) {
    creativeWork.creditText = project.client;
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${siteUrl}/projects` },
      { "@type": "ListItem", position: 3, name: project.name, item: `${siteUrl}/projects/${project.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
