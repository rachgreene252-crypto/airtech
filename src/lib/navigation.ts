import { services } from "@/content/services";
import { industries } from "@/content/industries";

// Industries is deliberately not a top-level primaryNav entry: Projects owns
// industry classification (browse via /projects?industry=<slug>) so a visitor
// sees actual built work, not a second directory competing with Projects.
// The dedicated /industries/[slug] pages still exist (technical
// requirements/challenges per sector, not just a project list) and stay
// reachable from footerNav.
export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  children?: NavLink[];
}

export const primaryNav: NavGroup[] = [
  {
    label: "Expertise",
    href: "/expertise",
    children: services.map((s) => ({
      label: s.name,
      href: `/expertise/${s.slug}`,
      description: s.shortDescription,
    })),
  },
  { label: "Projects", href: "/projects" },
  { label: "Service & Support", href: "/service-support" },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "About", href: "/company" },
      { label: "History", href: "/company/history" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "Quality & Certifications", href: "/company/quality-certifications" },
      { label: "Careers", href: "/company/careers" },
    ],
  },
  { label: "Resources", href: "/resources" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Expertise",
    links: services.map((s) => ({ label: s.name, href: `/expertise/${s.slug}` })),
  },
  {
    title: "Industries",
    links: industries.slice(0, 7).map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "History", href: "/company/history" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "Quality & Certifications", href: "/company/quality-certifications" },
      { label: "Careers", href: "/company/careers" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Discuss your project", href: "/contact/project-enquiry" },
      { label: "Service & AMC", href: "/service-support" },
      { label: "Projects", href: "/projects" },
    ],
  },
];
