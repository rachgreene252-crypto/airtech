/**
 * Airtech content model.
 *
 * These types are the single source of truth for content shape across the
 * site. They mirror the Sanity schema definitions in `src/sanity/schemaTypes`
 * field-for-field, so the local seed data in this folder and live Sanity
 * data can be swapped without touching page/component code.
 *
 * `VerificationStatus` is carried on every fact-bearing content type per the
 * source-of-truth rule: nothing marked below `client_confirmed` or `verified`
 * renders as a bare factual claim in the UI.
 */

export type VerificationStatus =
  | "verified"
  | "client_confirmed"
  | "source_only"
  | "needs_verification"
  | "historical"
  | "do_not_publish";

export interface SanityImageRef {
  /** Sanity asset reference id, or a static path under /public for seed content. */
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export type ServiceCategory =
  | "hvac"
  | "electrical"
  | "plumbing-public-health"
  | "fire-protection"
  | "elv-security"
  | "bms-systems-integration"
  | "engineering-advisory";

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  /** Short drawing-sheet style code, e.g. "M", "E", "PHE", "FP", "ELV", "BMS" */
  disciplineCode: string;
  /** One-line compression of shortDescription for the homepage discipline grid. */
  homeSummary: string;
  shortDescription: string;
  detailedDescription: string;
  capabilities: string[];
  subServices: string[];
  systems: string[];
  applications: string[];
  relatedIndustrySlugs: string[];
  relatedProjectSlugs: string[];
  heroImage?: SanityImageRef;
  seo: SEOFields;
  status: VerificationStatus;
}

export type IndustrySlug =
  | "healthcare"
  | "hospitality"
  | "pharmaceuticals"
  | "industrial"
  | "corporate-commercial"
  | "telecom-data-centres"
  | "banking-financial"
  | "auditoriums-studios"
  | "embassies-ingos"
  | "education-institutional";

export interface Industry {
  slug: IndustrySlug;
  name: string;
  overview: string;
  operationalChallenges: string[];
  technicalRequirements: string[];
  airtechCapabilities: string[];
  relatedServiceSlugs: string[];
  relatedProjectSlugs: string[];
  proofPoints: string[];
  heroImage?: SanityImageRef;
  seo: SEOFields;
  status: VerificationStatus;
}

export type ProjectStatus = "completed" | "ongoing" | "provisional";

export interface ProjectAtAGlance {
  client?: string;
  location?: string;
  industry?: string;
  airtechRole?: string;
  scope?: string;
  installedCapacity?: string;
  completionYear?: string;
}

export interface Project {
  slug: string;
  name: string;
  client?: string;
  clientDisplayApproved: boolean;
  location?: string;
  industrySlug: IndustrySlug;
  projectType: string;
  completionYear?: string;
  projectStatus: ProjectStatus;
  airtechRole: string;
  servicesDelivered: string[];
  serviceSlugsDelivered: string[];
  installedCapacity?: string;
  challenge?: string;
  engineeringApproach?: string;
  executionScope?: string;
  oemSystems?: string[];
  testingCommissioning?: string;
  outcome?: string;
  heroImage?: SanityImageRef;
  gallery: SanityImageRef[];
  testimonialId?: string;
  relatedServiceSlugs: string[];
  relatedProjectSlugs: string[];
  featured: boolean;
  seo: SEOFields;
  status: VerificationStatus;
}

export interface Testimonial {
  id: string;
  quote: string;
  personName: string;
  personTitle: string;
  organisation: string;
  projectSlug?: string;
  status: VerificationStatus;
}

export interface Certification {
  id: string;
  name: string;
  issuingBody: string;
  validUntil?: string;
  documentImage?: SanityImageRef;
  status: VerificationStatus;
}

export interface Partner {
  id: string;
  name: string;
  logo?: SanityImageRef;
  relationshipNote: string;
  status: VerificationStatus;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: SanityImageRef;
  yearsWithAirtech?: string;
  status: VerificationStatus;
}

export interface Resource {
  slug: string;
  title: string;
  kind: "guideline" | "bulletin" | "download" | "insight";
  summary: string;
  publishedDate?: string;
  body?: string;
  fileUrl?: string;
  seo: SEOFields;
  status: VerificationStatus;
}

export interface SEOFields {
  title: string;
  description: string;
  ogImage?: SanityImageRef;
}

export interface SiteSettings {
  companyName: string;
  brandName: string;
  tagline: string;
  establishedYear: string;
  headOffice: string;
  primaryEmail: string;
  /** Deliberately optional — see docs/OPEN_DECISIONS.md #1 (phone number conflict, unresolved). */
  phone?: string;
  whatsapp?: string;
}
