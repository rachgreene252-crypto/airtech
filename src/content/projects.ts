import type { Project } from "./types";

/**
 * Source: Master Source of Truth §9 (Initial project database) for the five
 * projects with fuller scope descriptions, and the brochure's "Our Landmark
 * Projects" photo captions (pp. 39–43) for the lighter portfolio entries —
 * name, client and location only, since the brochure gives no further scope
 * detail for those. No challenge/engineering-approach/outcome narrative is
 * invented anywhere below; fields with no supplied source content are left
 * undefined so the case-study template renders an honest empty state rather
 * than fabricated prose. Huawei Technologies Nepal is deliberately excluded
 * despite appearing in the brochure photo grid — the client questionnaire
 * (the higher-authority, more recent source) states Huawei should not be
 * photographed/publicised. See docs/OPEN_DECISIONS.md #4–#5.
 */
export const projects: Project[] = [
  {
    slug: "ncell-corporate-office",
    name: "Ncell Corporate Office",
    client: "Ncell",
    clientDisplayApproved: true,
    location: "Lainchaur, Kathmandu",
    industrySlug: "telecom-data-centres",
    projectType: "Corporate office",
    projectStatus: "provisional",
    airtechRole: "HVAC and MEP works for the new corporate office.",
    servicesDelivered: ["HVAC", "MEP"],
    serviceSlugsDelivered: ["hvac", "electrical", "plumbing-public-health"],
    // Reconciled with "Ncell Iconic Building, Kathmandu" (AIPL PROFILE - 2026.pptx, slide 8)
    // per docs/AIRTECH_CONTENT_AUDIT.md §2d — same client, treated as the same entry.
    heroImage: { src: "/images/projects/ncell-iconic-building.jpg", alt: "Ncell Iconic Building, Kathmandu" },
    gallery: [],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health"],
    relatedProjectSlugs: ["sipradi-trading"],
    featured: true,
    seo: {
      title: "Ncell Corporate Office — HVAC & MEP",
      description: "HVAC and MEP works delivered for the Ncell corporate office in Lainchaur, Kathmandu.",
    },
    status: "source_only",
  },
  {
    slug: "sipradi-trading",
    name: "Sipradi Trading Corporate Office",
    client: "Sipradi Trading Pvt. Ltd.",
    clientDisplayApproved: true,
    location: "Gairidhara, Kathmandu",
    industrySlug: "corporate-commercial",
    projectType: "Corporate office",
    projectStatus: "provisional",
    airtechRole: "Complete MEP and HVAC works for the new office building.",
    servicesDelivered: ["Complete MEP", "HVAC"],
    serviceSlugsDelivered: ["hvac", "electrical", "plumbing-public-health", "fire-protection"],
    gallery: [],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health", "fire-protection"],
    relatedProjectSlugs: ["ncell-corporate-office"],
    featured: true,
    seo: {
      title: "Sipradi Trading Corporate Office — Complete MEP",
      description: "Complete MEP and HVAC works delivered for the Sipradi Trading office building in Gairidhara, Kathmandu.",
    },
    status: "source_only",
  },
  {
    slug: "new-airport-commercial-office-parking",
    name: "New Airport Commercial Office & Parking Lot",
    clientDisplayApproved: true,
    location: "Kathmandu",
    industrySlug: "corporate-commercial",
    projectType: "Infrastructure / commercial",
    projectStatus: "provisional",
    airtechRole: "MEP works for the commercial office and parking facility.",
    servicesDelivered: ["MEP"],
    serviceSlugsDelivered: ["hvac", "electrical", "plumbing-public-health"],
    gallery: [],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health"],
    relatedProjectSlugs: [],
    featured: false,
    seo: {
      title: "New Airport Commercial Office & Parking — MEP",
      description: "MEP works for the new airport commercial office and parking lot facility in Kathmandu.",
    },
    status: "needs_verification",
  },
  {
    slug: "nobel-college-health-education",
    name: "Nobel College of Health and Education Foundation",
    client: "Nobel College of Health and Education Foundation",
    clientDisplayApproved: true,
    location: "Baneshwor, Kathmandu",
    industrySlug: "education-institutional",
    projectType: "Healthcare / education",
    projectStatus: "provisional",
    airtechRole: "MEP works including supply, delivery, installation, testing and commissioning.",
    servicesDelivered: ["MEP"],
    serviceSlugsDelivered: ["hvac", "electrical", "plumbing-public-health", "fire-protection"],
    gallery: [],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health", "fire-protection"],
    relatedProjectSlugs: ["nepal-mediciti"],
    featured: true,
    seo: {
      title: "Nobel College of Health and Education Foundation — MEP",
      description: "MEP works including supply, delivery, installation, testing and commissioning at Nobel College, Baneshwor, Kathmandu.",
    },
    status: "source_only",
  },
  {
    slug: "nepal-mediciti",
    name: "Nepal Mediciti / Ashwin's Medical College & Hospital",
    client: "Nepal Mediciti / Ashwin's Medical College & Hospital",
    clientDisplayApproved: true,
    location: "Lalitpur, Nepal",
    industrySlug: "healthcare",
    projectType: "Hospital",
    projectStatus: "provisional",
    airtechRole: "HVAC/MEP engineering and execution.",
    servicesDelivered: ["HVAC", "MEP"],
    serviceSlugsDelivered: ["hvac", "electrical", "plumbing-public-health", "fire-protection"],
    heroImage: { src: "/images/projects/nepal-mediciti-hospital.jpg", alt: "Nepal Mediciti hospital, Lalitpur" },
    gallery: [],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health", "fire-protection"],
    relatedProjectSlugs: ["nobel-college-health-education"],
    featured: true,
    seo: {
      title: "Nepal Mediciti Hospital — HVAC & MEP",
      description: "HVAC/MEP engineering and execution at Nepal Mediciti / Ashwin's Medical College & Hospital.",
    },
    status: "needs_verification",
  },
  // Lighter portfolio entries — brochure "Our Landmark Projects" photo captions only.
  // No scope narrative supplied, so challenge/approach/outcome fields are omitted.
  {
    slug: "norvic-international-hospital",
    name: "Norvic International Hospital",
    client: "Norvic International Hospital",
    clientDisplayApproved: true,
    location: "Kathmandu",
    industrySlug: "healthcare",
    projectType: "Hospital",
    projectStatus: "provisional",
    airtechRole: "Featured in Airtech's project portfolio.",
    servicesDelivered: [],
    serviceSlugsDelivered: ["hvac"],
    gallery: [],
    relatedServiceSlugs: ["hvac"],
    relatedProjectSlugs: [],
    featured: false,
    seo: {
      title: "Norvic International Hospital",
      description: "Norvic International Hospital, Kathmandu — featured in Airtech's project portfolio.",
    },
    status: "source_only",
  },
  {
    slug: "grande-international-hospital",
    name: "Grande International Hospital",
    client: "Grande International Hospital",
    clientDisplayApproved: true,
    location: "Kathmandu",
    industrySlug: "healthcare",
    projectType: "Hospital",
    projectStatus: "provisional",
    airtechRole: "Featured in Airtech's project portfolio.",
    servicesDelivered: [],
    serviceSlugsDelivered: ["hvac"],
    gallery: [],
    relatedServiceSlugs: ["hvac"],
    relatedProjectSlugs: [],
    featured: false,
    seo: {
      title: "Grande International Hospital",
      description: "Grande International Hospital, Kathmandu — featured in Airtech's project portfolio.",
    },
    status: "source_only",
  },
  {
    slug: "the-soaltee",
    name: "The Soaltee",
    client: "Soaltee",
    clientDisplayApproved: true,
    location: "Kathmandu",
    industrySlug: "hospitality",
    projectType: "Hotel",
    projectStatus: "provisional",
    airtechRole: "Featured in Airtech's project portfolio.",
    servicesDelivered: [],
    serviceSlugsDelivered: ["hvac"],
    gallery: [],
    relatedServiceSlugs: ["hvac"],
    relatedProjectSlugs: ["radisson-hotel-kathmandu"],
    featured: false,
    seo: {
      title: "The Soaltee, Kathmandu",
      description: "The Soaltee, Kathmandu — featured in Airtech's project portfolio.",
    },
    status: "source_only",
  },
  {
    slug: "radisson-hotel-kathmandu",
    name: "Radisson Hotel Kathmandu",
    client: "Hotel Radisson",
    clientDisplayApproved: true,
    location: "Kathmandu",
    industrySlug: "hospitality",
    projectType: "Hotel",
    projectStatus: "provisional",
    airtechRole: "Featured in Airtech's project portfolio.",
    servicesDelivered: [],
    serviceSlugsDelivered: ["hvac"],
    gallery: [],
    relatedServiceSlugs: ["hvac"],
    relatedProjectSlugs: ["the-soaltee"],
    featured: false,
    seo: {
      title: "Radisson Hotel Kathmandu",
      description: "Radisson Hotel, Kathmandu — featured in Airtech's project portfolio.",
    },
    status: "source_only",
  },
  {
    slug: "universal-college-medical-sciences",
    name: "Universal College of Medical Sciences",
    client: "Universal College of Medical Sciences",
    clientDisplayApproved: true,
    location: "Bhairahawa",
    industrySlug: "education-institutional",
    projectType: "Educational / medical college",
    projectStatus: "provisional",
    airtechRole: "Featured in Airtech's project portfolio.",
    servicesDelivered: [],
    serviceSlugsDelivered: ["hvac"],
    gallery: [],
    relatedServiceSlugs: ["hvac"],
    relatedProjectSlugs: [],
    featured: false,
    seo: {
      title: "Universal College of Medical Sciences",
      description: "Universal College of Medical Sciences, Bhairahawa — featured in Airtech's project portfolio.",
    },
    status: "source_only",
  },
  {
    slug: "shanker-group-corporate-office",
    name: "Shanker Group Corporate Office",
    client: "Shanker Group",
    clientDisplayApproved: true,
    location: "Kathmandu",
    industrySlug: "corporate-commercial",
    projectType: "Corporate office",
    projectStatus: "provisional",
    airtechRole: "Featured in Airtech's project portfolio.",
    servicesDelivered: [],
    serviceSlugsDelivered: ["hvac"],
    gallery: [],
    relatedServiceSlugs: ["hvac"],
    relatedProjectSlugs: [],
    featured: false,
    seo: {
      title: "Shanker Group Corporate Office",
      description: "Shanker Group Corporate Office, Kathmandu — featured in Airtech's project portfolio.",
    },
    status: "source_only",
  },
  {
    slug: "caan-civil-aviation-authority",
    name: "CAAN Office Building",
    client: "Civil Aviation Authority of Nepal",
    clientDisplayApproved: true,
    location: "Kathmandu",
    industrySlug: "corporate-commercial",
    projectType: "Infrastructure / institutional",
    projectStatus: "provisional",
    airtechRole: "Featured in Airtech's project portfolio.",
    servicesDelivered: [],
    serviceSlugsDelivered: ["hvac"],
    // AIPL PROFILE - 2026.pptx, slide 8 — "CAAN Office Building, Kathmandu".
    heroImage: { src: "/images/projects/caan-office-building.jpg", alt: "CAAN Office Building, Kathmandu" },
    gallery: [],
    relatedServiceSlugs: ["hvac"],
    relatedProjectSlugs: ["new-airport-commercial-office-parking"],
    featured: true,
    seo: {
      title: "Civil Aviation Authority of Nepal (CAAN)",
      description: "Civil Aviation Authority of Nepal (CAAN), Kathmandu — featured in Airtech's project portfolio.",
    },
    status: "source_only",
  },
  {
    slug: "laxmi-motor-corporation",
    name: "Laxmi Motors KD Plant",
    client: "Laxmi Motor Corporation",
    clientDisplayApproved: true,
    location: "Parasi, Nepal",
    industrySlug: "industrial",
    projectType: "Industrial facility",
    projectStatus: "provisional",
    airtechRole: "Featured in Airtech's project portfolio.",
    servicesDelivered: [],
    serviceSlugsDelivered: ["hvac"],
    // AIPL PROFILE - 2026.pptx, slide 8 — "Laxmi Motors KD Plant, Parasi"; reconciled with the
    // existing "Laxmi Motor Corporation" client record per docs/AIRTECH_CONTENT_AUDIT.md §2d.
    heroImage: { src: "/images/projects/laxmi-motors-kd-plant.jpg", alt: "Laxmi Motors KD Plant, Parasi" },
    gallery: [],
    relatedServiceSlugs: ["hvac"],
    relatedProjectSlugs: [],
    featured: true,
    seo: {
      title: "Laxmi Motor Corporation",
      description: "Laxmi Motor Corporation, Parasi — featured in Airtech's project portfolio.",
    },
    status: "source_only",
  },
];

export function getProjects() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProjectsByIndustry(industrySlug: string) {
  return projects.filter((p) => p.industrySlug === industrySlug);
}

export function getProjectsByService(serviceSlug: string) {
  return projects.filter((p) => p.serviceSlugsDelivered.includes(serviceSlug));
}

export function getRelatedProjects(project: Project, limit = 3) {
  const related = project.relatedProjectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => Boolean(p));
  if (related.length >= limit) return related.slice(0, limit);
  const sameIndustry = projects.filter(
    (p) => p.slug !== project.slug && p.industrySlug === project.industrySlug && !related.includes(p)
  );
  return [...related, ...sameIndustry].slice(0, limit);
}
