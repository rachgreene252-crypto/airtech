import type { Industry } from "./types";

/**
 * Source: brochure sector pages (Hotels & Resorts, Pharmaceuticals & Laboratories,
 * Hospitals, Banks & Corporate Institutions, Telecom Air Conditioning, Industries,
 * Auditorium/Theatres/Studios, Embassies & INGOs) plus Master Source of Truth §6–7.
 *
 * Generic unverified performance claims from the brochure (e.g. "up to 45%
 * electricity savings", "up to 67% power saving", "pioneer") are deliberately
 * excluded per §7 and §19 of the Master Source of Truth — do_not_publish.
 * Superlative claims are omitted, not softened.
 */
export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare & Hospitals",
    overview:
      "Airtech has designed and executed HVAC systems for a large number of hospitals in Nepal, including the supply and installation of operation-theatre air-conditioning with laminar airflow, and remains a partner in maintaining indoor air quality across clinical environments.",
    operationalChallenges: [
      "Patient rooms, consulting rooms and OPDs require reliable general comfort air-conditioning",
      "ICU, operation theatres and post-operative recovery rooms carry stringent demands on airflow pattern, cross-contamination control and a germ-free environment",
      "Diagnostic equipment areas (MRI, CATH-LAB, CT) need air-conditioning that ensures smooth, hassle-free operation of high-end, life-saving equipment",
      "Hospital air-conditioning operates 24/7, making reliability non-negotiable.",
    ],
    technicalRequirements: [
      "Laminar airflow operation-theatre air-conditioning",
      "High-filtration systems to maintain air quality and prevent release of in-born pollutants",
      "Contamination control across treatment areas",
    ],
    airtechCapabilities: [
      "HVAC design, supply, installation, testing and commissioning for hospital environments",
      "Operation-theatre air-conditioning with laminar airflow pattern",
    ],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health", "fire-protection", "elv-security"],
    relatedProjectSlugs: [],
    proofPoints: [],
    seo: {
      title: "Healthcare & Hospital HVAC / MEP",
      description:
        "HVAC and MEP engineering for hospitals and healthcare facilities: operation theatres, ICUs, diagnostic areas and 24×7 clinical environments.",
    },
    status: "client_confirmed",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    overview:
      "Airtech designs zone-specific HVAC for hotels and resorts: guest rooms, restaurants, lobbies, health clubs and banquet halls each carry distinct load and comfort requirements, and the system is designed around the precise needs of each area.",
    operationalChallenges: [
      "Partial load due to varying occupancy rates",
      "Higher load at more heavily occupied zones such as banquet halls and restaurants",
      "Frequent door openings in reception areas",
      "Ventilation to utility areas such as kitchens, toilets and car parks",
      "Low noise levels required in guest rooms",
    ],
    technicalRequirements: ["Zone-specific load design", "High energy efficiency", "Aesthetic integration with interior design"],
    airtechCapabilities: [
      "Zone-specific HVAC design across guest rooms, restaurants, lobbies, health clubs and banquet halls",
      "Integrated electrical, plumbing and fire-protection delivery for hotel and resort projects",
    ],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health", "fire-protection", "elv-security"],
    relatedProjectSlugs: [],
    proofPoints: [],
    seo: {
      title: "Hospitality HVAC & MEP Engineering",
      description:
        "Zone-specific HVAC, electrical, plumbing and fire-protection engineering for hotels and resorts: from guest rooms to banquet halls.",
    },
    status: "client_confirmed",
  },
  {
    slug: "pharmaceuticals",
    name: "Pharmaceuticals & Laboratories",
    overview:
      "Airtech has worked with a large number of pharmaceutical companies in Nepal, helping maintain critical process parameters across the manufacture of tablets, ointments, capsules, liquids and sterile products in facilities conforming to WHO GMP standards.",
    operationalChallenges: [
      "Maintaining varied temperature, relative humidity and air-change rates across preparation, manufacturing, packing and storage areas",
      "Handling peak load at the time of batch production and dropping to lower levels once a batch is complete",
    ],
    technicalRequirements: [
      "Precise control of temperature, relative humidity, pressure gradients, air changes, air filtration and air direction",
      "High levels of filtration, including HEPA filtration, to maintain required air quality",
      "Conformance to WHO GMP validation parameters",
    ],
    airtechCapabilities: [
      "HVAC systems designed to fulfil precise air-conditioning requirements for different classes of pharmaceutical cleanliness",
      "Awareness of validation parameters to support client conformance with WHO GMP standards",
    ],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health", "fire-protection", "elv-security"],
    relatedProjectSlugs: [],
    proofPoints: [],
    seo: {
      title: "Pharmaceutical & Laboratory HVAC Engineering",
      description:
        "Precision HVAC for pharmaceutical manufacturing and laboratories: temperature, humidity, pressure gradients, air changes and HEPA filtration to WHO GMP context.",
    },
    status: "client_confirmed",
  },
  {
    slug: "industrial",
    name: "Industrial & Manufacturing",
    overview:
      "Industrial air-conditioning needs vary from simple comfort cooling for a manager's office to process chilling for sensitive production requirements. Airtech designs around the actual production process, working from feedback provided by production managers.",
    operationalChallenges: [
      "Cooling sensitive panel boards that dissipate heat during operation",
      "Fresh-air and exhaust systems for warehousing to prevent microbial growth",
      "Some warehoused products degrade in adverse climate and require air-conditioning",
      "Extreme outside conditions can shorten the working life of air-cooled outdoor units",
    ],
    technicalRequirements: [
      "System design informed by the specific production process, not generic comfort cooling",
      "Water-cooled package units considered in extreme outside conditions to extend equipment life versus air-cooled alternatives",
    ],
    airtechCapabilities: [
      "Process-informed HVAC design incorporating production-manager feedback",
      "Panel and warehouse cooling for manufacturing environments",
    ],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health", "fire-protection", "elv-security"],
    relatedProjectSlugs: [],
    proofPoints: [],
    seo: {
      title: "Industrial & Manufacturing HVAC / MEP",
      description:
        "Process-informed HVAC and MEP engineering for manufacturing facilities: panel cooling, warehouse ventilation and production-specific design.",
    },
    status: "client_confirmed",
  },
  {
    slug: "corporate-commercial",
    name: "Corporate & Commercial",
    overview:
      "Airtech is associated with Nepal's leading commercial banks, financial institutions and corporate offices, designing for optimum performance, energy efficiency and the aesthetic expectations of architects and interior designers.",
    operationalChallenges: [
      "Air-conditioning systems typically run every working day, so energy efficiency is essential.",
      "Some offices need partial air-conditioning during extended working hours and holidays",
      "Many AC units run on generator (DG) power during outages and must be selected to operate correctly on DG supply",
      "Faster air circulation and temperature control needed in customer-facing service areas",
      "Server rooms need high sensible cooling and can require standby capacity for continuous operation",
    ],
    technicalRequirements: [
      "Equipment compatible with generator (DG) power and local voltage conditions",
      "VRF systems for high-end corporate buildings — long piping runs, multiple indoor units per outdoor unit and low sound pressure.",
      "Standby cooling capacity for server rooms",
      "Chiller plant for larger commercial cooling loads.",
    ],
    airtechCapabilities: [
      "HVAC systems selected for compatibility with DG power and site voltage conditions",
      "VRF design for high-end corporate fit-outs; chiller plant for larger loads.",
      "Integrated electrical distribution for banks and corporate offices",
    ],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health", "fire-protection", "elv-security"],
    relatedProjectSlugs: [],
    proofPoints: [],
    seo: {
      title: "Corporate & Commercial HVAC / MEP",
      description:
        "HVAC, electrical and BMS engineering for banks, financial institutions and corporate offices: DG-compatible systems, VRF/VRV design and server-room cooling.",
    },
    status: "client_confirmed",
  },
  {
    slug: "telecom-data-centres",
    name: "Telecom & Data Centres",
    overview:
      "Data centres and server rooms operate 24×7, 365 days a year, and Airtech has provided cost-effective, energy-efficient cooling solutions to leading telecom operators and data centres in Nepal.",
    operationalChallenges: [
      "Telecom equipment needs cooling year-round and carries a high sensible heat load, unlike comfort air-conditioning",
      "Zero-failure tolerance for continuous operation",
    ],
    technicalRequirements: [
      "Precision-type air-conditioning of correct capacity, with an additional standby unit at sensitive installations",
      "HVAC equipment with higher sensible-load capacity suited to telecom equipment heat output",
      "Understanding of heat dissipation from servers to size temperature and relative-humidity control correctly",
    ],
    airtechCapabilities: [
      "Green telecom shelters for BTS sites",
      "Telecom air-conditioning with direct free cooling for BTS sites",
      "Precision-type air-conditioners for data centres and server rooms, with and without indirect free cooling",
      "Modular access flooring",
    ],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health", "fire-protection", "elv-security"],
    relatedProjectSlugs: ["ncell-corporate-office"],
    proofPoints: [],
    seo: {
      title: "Telecom & Data Centre Cooling",
      description:
        "Precision cooling for telecom BTS sites, server rooms and data centres: designed for 24×7 operation, high sensible loads and zero-failure reliability.",
    },
    status: "client_confirmed",
  },
  {
    slug: "banking-financial",
    name: "Banks & Financial Institutions",
    overview:
      "Airtech is associated with Nepal's leading commercial banks and financial institutions, delivering HVAC and electrical systems built for daily operation, customer-facing service areas and site power conditions.",
    operationalChallenges: [
      "Daily operating hours demand consistently energy-efficient systems",
      "Customer service areas require fast air circulation and stable temperature control",
      "Site power conditions and generator compatibility must be accounted for in equipment selection",
    ],
    technicalRequirements: [
      "Equipment selected for compatibility with available power and DG backup",
      "Aesthetic integration with architect and interior-designer expectations",
    ],
    airtechCapabilities: [
      "HVAC and electrical systems for bank branches and financial-institution offices",
    ],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health", "fire-protection", "elv-security"],
    relatedProjectSlugs: [],
    proofPoints: [],
    seo: {
      title: "Banking & Financial Institution HVAC / Electrical",
      description: "HVAC and electrical engineering for bank branches and financial institutions across Nepal.",
    },
    status: "client_confirmed",
  },
  {
    slug: "auditoriums-studios",
    name: "Auditoriums, Halls, Theatres & Studios",
    overview:
      "Airtech designs for the specific requirements of auditoriums, halls, theatres, recording studios, FM studios and lecture halls, where acoustic performance and peak-load handling are as important as comfort.",
    operationalChallenges: [
      "Auditoriums carry a specific peak load for a short duration that the installed HVAC system must handle",
      "Noise control is critical, particularly for recording studios, lecture halls and theatres",
      "Fresh air and proper exhaust are essential for large halls",
      "Equipment and lighting loads in specialised studios add to the cooling load",
    ],
    technicalRequirements: [
      "Duct design with suitable acoustic insulation to meet stringent noise-level requirements",
      "Fresh-air and exhaust provisioning sized to hall occupancy",
      "Air distribution designed alongside the space's interior aesthetics",
    ],
    airtechCapabilities: [
      "Acoustic-conscious duct design for recording studios, lecture halls and theatres",
      "Peak-load HVAC design for auditoriums and cinema halls",
    ],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health", "fire-protection", "elv-security"],
    relatedProjectSlugs: [],
    proofPoints: [],
    seo: {
      title: "Auditorium, Theatre & Studio HVAC",
      description: "Acoustic-conscious HVAC design for auditoriums, theatres, cinema halls, recording studios and lecture halls.",
    },
    status: "client_confirmed",
  },
  {
    slug: "embassies-ingos",
    name: "Embassies & INGOs",
    overview:
      "Airtech has provided heating, ventilation and air-conditioning services to a number of embassies, INGOs and foreign offices operating in Nepal.",
    operationalChallenges: [],
    technicalRequirements: [],
    airtechCapabilities: ["HVAC services for diplomatic and international-organisation offices"],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health", "fire-protection", "elv-security"],
    relatedProjectSlugs: [],
    proofPoints: [],
    seo: {
      title: "Embassy & INGO HVAC Services",
      description: "HVAC services for embassies, INGOs and foreign offices operating in Nepal.",
    },
    status: "source_only",
  },
  {
    slug: "education-institutional",
    name: "Education & Institutional",
    overview:
      "Airtech's MEP capability extends to educational and institutional facilities, delivering the same integrated HVAC, electrical, plumbing and fire-protection systems used across its commercial and healthcare work.",
    operationalChallenges: [],
    technicalRequirements: [],
    airtechCapabilities: ["Integrated HVAC, electrical, plumbing and fire-protection delivery for educational and institutional buildings"],
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health", "fire-protection", "elv-security"],
    relatedProjectSlugs: ["nobel-college-health-education"],
    proofPoints: [],
    seo: {
      title: "Education & Institutional MEP",
      description: "Integrated HVAC, electrical, plumbing and fire-protection engineering for schools, colleges and institutional facilities.",
    },
    status: "source_only",
  },
];

export function getIndustries() {
  return industries;
}

export function getIndustryBySlug(slug: string) {
  return industries.find((i) => i.slug === slug);
}
