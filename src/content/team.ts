import type { Person } from "./types";

/**
 * Source: completed client questionnaire §10.1, which names a Managing
 * Director and one member of senior management "at minimum" to appear on the
 * site. Photography for the MD supplied directly (2026-09-09, ASSETS/founder.png)
 * for use on the site. Bio text for either person is still not supplied —
 * left undefined rather than invented. See docs/OPEN_DECISIONS.md.
 */
export const team: Person[] = [
  {
    id: "manoj-bhansali",
    name: "Manoj Bhansali",
    role: "Managing Director",
    photo: { src: "/images/team/founder-manoj-bhansali.jpg", alt: "Manoj Bhansali, Managing Director of Airtech Industries" },
    status: "client_confirmed",
  },
  { id: "ashok-ji", name: "Ashok Ji", role: "Senior Management", status: "client_confirmed" },
];

export function getTeam() {
  return team;
}
