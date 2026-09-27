import { services } from "@/content/services";

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
  { label: "How We Work", href: "/how-we-work" },
  // Expertise is deliberately a plain link, not a dropdown: it's one page
  // with a persistent left-rail switcher for the six disciplines
  // (src/app/(site)/expertise/layout.tsx). A visitor picks the discipline
  // inside the page, not from a menu.
  { label: "Expertise", href: "/expertise" },
  { label: "Projects", href: "/projects" },
  { label: "Service & Support", href: "/service-support" },
  // Was a dropdown (About/History/Leadership/Quality/Engineering
  // Library/Careers) — client feedback 2026-09-16: "i dont want drop down
  // in the Company page, make it Our Company." Now a plain link like
  // Expertise; the sub-pages are still reachable from footerNav and from
  // /company itself.
  { label: "Our Company", href: "/company" },
];

// Trimmed 2026-09-27 ("too big of a footer ... more concise and formal"):
// four columns became three and the Industries column was dropped (it
// duplicated the /projects sector filter, several of whose sectors have no
// published projects yet).
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Expertise",
    links: services.map((s) => ({ label: s.name, href: `/expertise/${s.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About Airtech", href: "/company" },
      { label: "History", href: "/company/history" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "Quality & Certifications", href: "/company/quality-certifications" },
      { label: "Careers", href: "/company/careers" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "Service & AMC", href: "/service-support" },
      { label: "Engineering Library", href: "/engineering-library" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
