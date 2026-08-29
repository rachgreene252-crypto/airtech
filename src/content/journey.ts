export interface JourneyStep {
  index: number;
  label: string;
  sentence: string;
  subLabel: string;
  description: string;
  points: string[];
  visual: "conversation" | "engineer" | "procure" | "site" | "commission" | "support";
}

/**
 * The canonical Airtech project lifecycle (spec §7): Engineering ->
 * Procurement -> Installation -> Testing -> Commissioning -> Long-term
 * support, with step 1 (Understand) as the discovery front-end of that same
 * lifecycle. One data file for both the homepage (compact) and
 * /how-we-work (full) renderings of ClientJourney — no second lifecycle
 * definition anywhere.
 */
export const journeySteps: JourneyStep[] = [
  {
    index: 1,
    label: "Understand",
    sentence: "Every project begins with a conversation.",
    subLabel: "Discovery & brief",
    description: "We understand your building, requirements, timelines and challenges.",
    points: ["Project brief", "Site & context", "Client requirements", "Coordination requirements"],
    visual: "conversation",
  },
  {
    index: 2,
    label: "Engineer",
    sentence: "We engineer the solution.",
    subLabel: "Design & technical planning",
    description: "Our team translates requirements into practical, efficient MEP solutions.",
    points: ["System design", "Engineering calculations", "Equipment selection", "Cross-discipline coordination"],
    visual: "engineer",
  },
  {
    index: 3,
    label: "Procure",
    sentence: "We source and supply.",
    subLabel: "Procurement & logistics",
    description:
      "The right equipment, sourced from trusted manufacturers and delivered when the project needs it.",
    points: ["Equipment & material sourcing", "Supplier coordination", "Project procurement & logistics"],
    visual: "procure",
  },
  {
    index: 4,
    label: "Execute",
    sentence: "We bring it to site.",
    subLabel: "Installation & execution",
    description:
      "From equipment placement to ducting, piping and electrical integration, our teams coordinate the system on site.",
    points: ["Installation", "Site coordination", "MEP integration"],
    visual: "site",
  },
  {
    index: 5,
    label: "Test & Commission",
    sentence: "We test. We commission.",
    subLabel: "Performance & handover",
    description: "We don't simply install a system. We ensure it performs as designed.",
    points: ["Testing", "Balancing & checks where applicable", "Commissioning", "Handover"],
    visual: "commission",
  },
  {
    index: 6,
    label: "Support",
    sentence: "We stay with you.",
    subLabel: "After-sales & long-term support",
    description: "Because our relationship doesn't end when the project is handed over.",
    points: ["After-sales", "Maintenance", "AMC", "Technical support"],
    visual: "support",
  },
];

export const journeyIntro =
  "Airtech is a single engineering partner across the whole project lifecycle — from the first conversation to long-term support.";
