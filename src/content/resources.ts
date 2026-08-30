import type { Resource } from "./types";

/** Sentence-case display labels for `Resource["kind"]`, shared by the
 * library list and the document detail page so both read identically. */
export const RESOURCE_KIND_LABELS: Record<Resource["kind"], string> = {
  guideline: "Guideline",
  bulletin: "Bulletin",
  download: "Download",
  insight: "Insight",
};

/**
 * Engineering Library seed — technical-credibility placeholders for
 * consultants, architects and specifiers (spec §9), not a blog. Every entry
 * is status: "source_only" with no fileUrl: it renders as a "Document
 * coming soon" row (engineering-library/page.tsx) until Airtech supplies
 * the actual PDF — adding fileUrl is the only change needed to make an
 * entry downloadable, no code change required.
 */
export const resources: Resource[] = [
  {
    slug: "mechanical-hvac-capability-deck",
    title: "Mechanical / HVAC capability deck",
    kind: "download",
    summary: "Airtech's HVAC design, procurement, installation, testing and commissioning capability.",
    seo: {
      title: "Mechanical / HVAC Capability Deck",
      description: "Airtech's HVAC engineering capability, for consultants and specifiers.",
    },
    status: "source_only",
  },
  {
    slug: "electrical-capability-deck",
    title: "Electrical capability deck",
    kind: "download",
    summary: "Airtech's internal and external electrification capability, from schematics through installation.",
    seo: {
      title: "Electrical Capability Deck",
      description: "Airtech's electrical engineering capability, for consultants and specifiers.",
    },
    status: "source_only",
  },
  {
    slug: "plumbing-public-health-capability-deck",
    title: "Plumbing & Public Health capability deck",
    kind: "download",
    summary: "Airtech's plumbing, sanitary and water/sewage treatment capability.",
    seo: {
      title: "Plumbing & Public Health Capability Deck",
      description: "Airtech's plumbing and public health engineering capability, for consultants and specifiers.",
    },
    status: "source_only",
  },
  {
    slug: "fire-protection-capability-deck",
    title: "Fire Protection capability deck",
    kind: "download",
    summary: "Airtech's fire protection and fire alarm system capability.",
    seo: {
      title: "Fire Protection Capability Deck",
      description: "Airtech's fire protection engineering capability, for consultants and specifiers.",
    },
    status: "source_only",
  },
  {
    slug: "elv-security-capability-deck",
    title: "ELV / Security / IT capability deck",
    kind: "download",
    summary: "Airtech's extra-low-voltage, access control, CCTV and networking capability.",
    seo: {
      title: "ELV / Security / IT Capability Deck",
      description: "Airtech's ELV, security and IT systems capability, for consultants and specifiers.",
    },
    status: "source_only",
  },
  {
    slug: "company-profile",
    title: "Company profile",
    kind: "download",
    summary: "Airtech Industries' company profile: history, capability and project experience.",
    seo: {
      title: "Airtech Company Profile",
      description: "Airtech Industries' company profile document.",
    },
    status: "source_only",
  },
  {
    slug: "quality-certificates",
    title: "Quality certificates",
    kind: "download",
    summary: "Current management-system certification. See also Quality & Certifications.",
    seo: {
      title: "Quality Certificates",
      description: "Airtech's quality management system certification documents.",
    },
    status: "source_only",
  },
];

export function getResources() {
  return resources;
}

export function getResourceBySlug(slug: string) {
  return resources.find((r) => r.slug === slug);
}
