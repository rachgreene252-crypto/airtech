import type { ServiceCategory } from "./types";

/**
 * Company milestones, shared by /company and /company/history.
 * Source: Master Source of Truth (established 2000 as an HVAC company; MEP
 * division from 2013) and the 25th-anniversary event (AIPL PROFILE - 2026,
 * slides 22–23). No intermediate milestones are sourced, so none are added.
 *
 * `disciplines` is what Airtech offered at that point, as each body states:
 * HVAC only in 2000; mechanical, electrical, PHE and ELV from 2013; today
 * every discipline in src/content/services.ts.
 */
export interface Milestone {
  year: string;
  title: string;
  body: string;
  disciplines?: ServiceCategory[];
}

export const milestones: Milestone[] = [
  {
    year: "2000",
    title: "Established",
    body: "Airtech was established with a focus on Heating, Ventilation and Air Conditioning (HVAC) engineering solutions in Nepal.",
    disciplines: ["hvac"],
  },
  {
    year: "2013",
    title: "MEP division launched",
    body: "Airtech expanded beyond HVAC, launching its MEP division to provide integrated mechanical, electrical, PHE and ELV solutions.",
    disciplines: ["hvac", "electrical", "plumbing-public-health", "elv-security"],
  },
  {
    year: "2025",
    title: "25 years: Reliability Matters",
    body: "Airtech marked 25 years in business with a company-wide anniversary celebration, reaffirming the reliability the brand was built on.",
  },
  {
    year: "Today",
    title: "Integrated engineering contractor",
    body: "Airtech operates as a comprehensive engineering and MEP contractor, with capabilities spanning HVAC, electrical, PHE, fire protection, ELV, ventilation and water systems.",
    disciplines: ["hvac", "electrical", "plumbing-public-health", "fire-protection", "elv-security", "bms-systems-integration"],
  },
];
