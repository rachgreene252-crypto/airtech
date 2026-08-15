import type { Person } from "./types";

/**
 * Source: completed client questionnaire §10.1, which names a Managing
 * Director and one member of senior management "at minimum" to appear on the
 * site, and explicitly flags names/positions/bios/photos as still to be
 * provided by Airtech beyond this. No bio text or photography exists yet —
 * fields are left undefined rather than invented. See docs/OPEN_DECISIONS.md.
 */
export const team: Person[] = [
  { id: "manoj-bhansali", name: "Manoj Bhansali", role: "Managing Director", status: "client_confirmed" },
  { id: "ashok-ji", name: "Ashok Ji", role: "Senior Management", status: "client_confirmed" },
];

export function getTeam() {
  return team;
}
