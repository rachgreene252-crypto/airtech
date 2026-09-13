import type { Service } from "./types";

/**
 * Source: Master Source of Truth §5 (canonical service taxonomy), cross-checked
 * against the completed client questionnaire §4 and brochure service pages.
 * Capability/sub-service lists are drawn directly from supplied material —
 * nothing here is invented.
 */
export const services: Service[] = [
  {
    slug: "hvac",
    name: "HVAC",
    category: "hvac",
    disciplineCode: "M",
    homeSummary:
      "Air-conditioning and ventilation, from room comfort cooling to commercial chiller plant and specialised process cooling.",
    shortDescription:
      "Design, equipment selection, procurement, installation, testing and commissioning of air-conditioning and ventilation systems, from single-room comfort cooling to large commercial chiller plant and specialised process cooling.",
    detailedDescription:
      "Airtech's HVAC capability spans the full delivery chain: system design and equipment selection, supply and procurement, installation, and testing and commissioning. The practice covers chillers, commercial air-conditioning, industrial and process cooling, ventilation, precision air-conditioning for telecom and data-centre environments, and energy-efficient HVAC solutions, extending from small-capacity room air-conditioning to large commercial chiller plant and specialised applications such as pharmaceutical and healthcare environments.",
    capabilities: [
      "HVAC system design",
      "Equipment selection",
      "Supply and procurement",
      "Installation",
      "Testing and commissioning",
      "After-sales service and maintenance",
    ],
    subServices: [
      "Chiller systems",
      "Commercial air-conditioning",
      "Industrial / process cooling",
      "Ventilation",
      "Precision air-conditioning",
      "Telecom / data-centre cooling",
      "Energy-efficient HVAC solutions",
    ],
    systems: ["Chillers", "Packaged units", "Precision AC", "Ventilation systems"],
    applications: [
      "Hospitality",
      "Commercial buildings",
      "Hospitals and healthcare facilities",
      "Pharmaceutical and laboratory environments",
      "Telecom sites and data centres",
      "Industrial process cooling",
    ],
    relatedIndustrySlugs: [
      "hospitality",
      "healthcare",
      "pharmaceuticals",
      "industrial",
      "telecom-data-centres",
    ],
    relatedProjectSlugs: [],
    seo: {
      title: "HVAC Engineering & Installation",
      description:
        "Airtech's HVAC capability: design, equipment selection, procurement, installation, testing and commissioning across commercial, healthcare, pharmaceutical, hospitality and industrial environments.",
    },
    status: "client_confirmed",
  },
  {
    slug: "electrical",
    name: "Electrical",
    category: "electrical",
    disciplineCode: "E",
    homeSummary:
      "Internal and external electrification: HT/LT feeders and panels, transformers, lightning protection and earthing.",
    shortDescription:
      "Internal and external electrification: HT/LT feeders and panels, distribution boards, schematics, transformers, lightning protection and earthing.",
    detailedDescription:
      "Airtech's electrical team executes both internal and external electrification works, covering the schematic and working-drawing preparation through to complete installation of panels, transformers, distribution boards and protective systems for hotels, resorts, hospitals, malls, industries and other institutional clients.",
    capabilities: [
      "Execution of HT and LT feeders and cables",
      "Execution of HT and LT panels, distribution boards",
      "Cabling and wiring works",
      "Preparation of schematic and working drawings",
      "Complete installation of internal and external equipment",
      "Lightning protection and complete earthing systems",
      "Intelligent and external lighting",
    ],
    subServices: [
      "HT/LT feeders and cables",
      "HT/LT panels and distribution boards",
      "Transformers and metering panels",
      "ACB / VCB panels",
      "Internal and external electrification",
      "Lightning protection and earthing",
      "Intelligent and external lighting",
    ],
    systems: ["HT/LT panels", "Distribution boards", "Transformers", "ACB/VCB panels"],
    applications: ["Hotels and resorts", "Hospitals", "Malls", "Industries", "Institutional buildings"],
    relatedIndustrySlugs: ["hospitality", "healthcare", "industrial", "corporate-commercial"],
    relatedProjectSlugs: [],
    seo: {
      title: "Electrical Engineering & Installation",
      description:
        "Internal and external electrification: HT/LT feeders, panels and distribution boards, transformers, lightning protection and earthing systems.",
    },
    status: "client_confirmed",
  },
  {
    slug: "plumbing-public-health",
    name: "Plumbing & Public Health",
    category: "plumbing-public-health",
    disciplineCode: "PHE",
    homeSummary:
      "Water supply, drainage and rainwater harvesting, plus sewage and water treatment plants.",
    shortDescription:
      "Internal and external plumbing and sanitary systems, domestic water supply, drainage, rainwater harvesting, and sewage and water treatment plants.",
    detailedDescription:
      "Public Health Engineering at Airtech takes a whole-building approach across water efficiency, energy and pollution-related systems, from domestic water supply and drainage through to sewage treatment plants (STP), water treatment plants (WTP) and rainwater harvesting.",
    capabilities: [
      "Internal and external plumbing/sanitary systems",
      "Domestic water supply systems",
      "Internal and external drainage systems",
      "Rain water / storm water recharge wells",
      "Sewerage Treatment Plants (STP), Water Treatment Plants (WTP), Effluent Treatment Plants (ETP)",
      "Pump room equipment (hot and cold water supply)",
      "Modern sanitary fixtures",
      "Rainwater harvesting",
    ],
    subServices: [
      "Domestic water supply",
      "Drainage systems",
      "Sewage treatment plants",
      "Water treatment plants",
      "Hot water systems",
      "Hydro-pneumatic systems",
      "Rainwater harvesting",
    ],
    systems: ["STP", "WTP", "ETP", "Pump rooms", "Hydro-pneumatic systems"],
    applications: ["Hospitality", "Healthcare", "Industrial", "Corporate/commercial"],
    relatedIndustrySlugs: ["hospitality", "healthcare", "industrial"],
    relatedProjectSlugs: [],
    seo: {
      title: "Plumbing & Public Health Engineering",
      description:
        "Internal and external plumbing, sanitary works, domestic water supply, drainage, sewage/water treatment plants and rainwater harvesting.",
    },
    status: "client_confirmed",
  },
  {
    slug: "fire-protection",
    name: "Fire Fighting & Fire Protection",
    category: "fire-protection",
    disciplineCode: "FP",
    homeSummary:
      "Wet and dry firefighting, hydrants and pumps, and sprinkler systems.",
    shortDescription:
      "Wet and dry firefighting systems, fire hydrants and pumps, and sprinkler systems.",
    detailedDescription:
      "Airtech designs and installs fire fighting and fire protection systems for commercial properties, covering wet and dry firefighting, internal and external hydrants, fire pumps and equipment, and sprinkler systems.",
    capabilities: [
      "Wet and dry firefighting systems",
      "Internal and external fire hydrants",
      "Fire pumps and fire equipment",
      "Sprinkler systems",
    ],
    subServices: [
      "Wet firefighting systems",
      "Dry firefighting systems",
      "Internal fire hydrants",
      "External fire hydrants",
      "Fire pumps",
      "Sprinkler systems",
    ],
    systems: ["Wet/dry firefighting", "Fire hydrants", "Fire pumps", "Sprinkler systems"],
    applications: ["Hospitality", "Healthcare", "Commercial", "Industrial", "Auditoriums and studios"],
    relatedIndustrySlugs: ["hospitality", "healthcare", "corporate-commercial", "auditoriums-studios"],
    relatedProjectSlugs: [],
    seo: {
      title: "Fire Fighting & Fire Protection Systems",
      description:
        "Wet and dry firefighting, fire hydrants and pumps, and sprinkler systems for commercial and institutional buildings.",
    },
    status: "client_confirmed",
  },
  {
    slug: "elv-security",
    name: "ELV / Security / IT",
    category: "elv-security",
    disciplineCode: "ELV",
    homeSummary:
      "Extra-low-voltage systems: data networking and telecommunication, security and surveillance, fire detection and alarm, guest-room management, IPTV and nurse call.",
    shortDescription:
      "Extra-low-voltage systems: data networking and telecommunication, security and surveillance, intelligent fire detection and alarm, guest room management (GRMS), IPTV and nurse call.",
    detailedDescription:
      "A dedicated team of electronics and electrical engineers, supervisors and technicians delivers comprehensive ELV solutions across three core areas (data networking, telecommunication and security systems), alongside intelligent fire detection and alarm, guest room management and audio-visual systems. The team is OEM-trained on national and international security, life-safety and communication platforms.",
    capabilities: [
      "Data networking and structured cabling",
      "Telecommunication and telephone systems",
      "Security systems: access control and CCTV surveillance",
      "Intelligent fire alarm systems",
      "Automatic smoke and heat detection",
      "Annunciation and repeater panels",
      "Fire alarm and public-address (FAS/PA) systems",
      "Guest room management systems (GRMS)",
      "IPTV and nurse call systems",
    ],
    subServices: [
      "Data networking / structured cabling",
      "Telecommunication systems",
      "Access control",
      "CCTV and surveillance",
      "Addressable fire alarm systems",
      "Wireless fire alarm systems",
      "Integrated fire alarm systems",
      "Guest room management systems (GRMS)",
      "IPTV / MATV",
      "Nurse call systems",
    ],
    systems: ["Structured cabling / networking", "Telecommunication", "Access control", "CCTV", "Intelligent fire alarm panels", "GRMS", "Nurse call"],
    applications: ["Hospitality", "Healthcare", "Corporate/commercial", "Institutional"],
    relatedIndustrySlugs: ["hospitality", "healthcare", "corporate-commercial", "education-institutional"],
    relatedProjectSlugs: [],
    seo: {
      title: "ELV, Security & IT Systems",
      description:
        "Data networking and telecommunication, security and surveillance, intelligent fire detection and alarm, guest room management (GRMS), IPTV and nurse call systems delivered by a dedicated ELV engineering team.",
    },
    status: "client_confirmed",
  },
  {
    slug: "bms-systems-integration",
    name: "BMS / Systems Integration",
    category: "bms-systems-integration",
    disciplineCode: "BMS",
    homeSummary:
      "Real-time monitoring and integration of a building's mechanical, electrical, security and life-safety systems.",
    shortDescription:
      "Building Management Systems for real-time monitoring, control and integration of a building's mechanical, electrical, security and life-safety systems.",
    detailedDescription:
      "Airtech's Building Management System (BMS) offering provides real-time monitoring of a building's day-to-day operation from a centralised control room: early detection of emerging issues, reduced field-supervision costs, reduced downtime, and interfacing between individual smart-building applications.",
    capabilities: [
      "Enterprise systems integration",
      "Real-time monitoring and control",
      "HVAC maintenance monitoring",
      "Fire detection and alarm integration",
      "Security and access control integration",
      "Lighting control",
      "Indoor air quality monitoring",
    ],
    subServices: [
      "Digital video management",
      "Intrusion detection",
      "Mechanical maintenance monitoring",
      "On-site technical service",
    ],
    systems: ["Centralised BMS control room", "Smart building integration platforms"],
    applications: ["Corporate/commercial", "Industrial", "Telecom/data centres", "Healthcare"],
    relatedIndustrySlugs: ["corporate-commercial", "industrial", "telecom-data-centres", "healthcare"],
    relatedProjectSlugs: [],
    seo: {
      title: "Building Management Systems (BMS)",
      description:
        "Real-time monitoring, control and enterprise systems integration for a building's mechanical, electrical, security and life-safety systems.",
    },
    status: "client_confirmed",
  },
];

export function getServices() {
  return services;
}

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
