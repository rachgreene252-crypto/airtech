import type { Vec3 } from "./iso";

/**
 * The coordination model. One structural bay of a ceiling void — where MEP
 * disciplines are actually coordinated on a real project — not a building
 * silhouette. Every discipline runs as a "lane" (a trunk distribution run)
 * through the void at its own height/depth, exactly how a real reflected
 * ceiling coordination drawing stacks services (ductwork highest, nearest
 * the slab; cable tray below that; pipework below that; fire main; ELV
 * lowest and lightest), with branches dropping to real terminal equipment.
 */
export type DisciplineSlug =
  | "hvac"
  | "electrical"
  | "plumbing-public-health"
  | "fire-protection"
  | "elv-security";

export type TerminalKind = "ahu" | "panel" | "diffuser" | "valve" | "sprinkler" | "node" | "rack" | "cap";

export type Branch = {
  /** t along the trunk (0..1) where this branch leaves the lane. */
  t: number;
  to: Vec3;
  kind: TerminalKind;
};

export type Lane = {
  slug: DisciplineSlug;
  trunk: Vec3[];
  branches: Branch[];
  /** Extra riser: a vertical run from the lane down to floor level. */
  riser?: { t: number; kind: TerminalKind };
};

// Bay: x 0..10 along the building, z 0..5 into the void, y 0 (floor) .. 6.4 (slab soffit).
export const BAY = {
  width: 10,
  depth: 5,
  height: 6.4,
};

export const COLUMNS: Vec3[] = [
  [0, 0, 0],
  [5, 0, 0],
  [10, 0, 0],
  [0, 0, 5],
  [5, 0, 5],
  [10, 0, 5],
];

export const SLAB_OUTLINE: Vec3[] = [
  [0, BAY.height, 0],
  [10, BAY.height, 0],
  [10, BAY.height, 5],
  [0, BAY.height, 5],
  [0, BAY.height, 0],
];

export const FLOOR_OUTLINE: Vec3[] = [
  [0, 0, 0],
  [10, 0, 0],
  [10, 0, 5],
  [0, 0, 5],
  [0, 0, 0],
];

export const LANES: Lane[] = [
  {
    slug: "hvac",
    trunk: [
      [1.1, 5.7, 1.0],
      [9.0, 5.7, 1.0],
    ],
    branches: [
      { t: 0.06, to: [1.6, 1.3, 1.15], kind: "ahu" },
      { t: 0.46, to: [5.0, 2.0, 0.8], kind: "diffuser" },
      { t: 0.78, to: [7.6, 2.3, 1.3], kind: "diffuser" },
    ],
    riser: { t: 0.92, kind: "cap" },
  },
  {
    slug: "electrical",
    trunk: [
      [1.1, 5.35, 1.7],
      [9.0, 5.35, 1.7],
    ],
    branches: [
      { t: 0.14, to: [2.05, 1.5, 1.7], kind: "panel" },
      { t: 0.5, to: [5.4, 2.4, 1.9], kind: "node" },
      { t: 0.84, to: [7.85, 1.5, 1.7], kind: "panel" },
    ],
  },
  {
    slug: "plumbing-public-health",
    trunk: [
      [1.1, 5.0, 2.4],
      [9.0, 5.0, 2.4],
    ],
    branches: [
      { t: 0.24, to: [2.7, 0.35, 2.4], kind: "valve" },
      { t: 0.56, to: [5.6, 1.9, 2.1], kind: "valve" },
      { t: 0.86, to: [8.3, 0.35, 2.4], kind: "valve" },
    ],
  },
  {
    slug: "fire-protection",
    trunk: [
      [1.1, 4.65, 3.1],
      [9.0, 4.65, 3.1],
    ],
    branches: [
      { t: 0.28, to: [3.3, 3.2, 2.9], kind: "sprinkler" },
      { t: 0.5, to: [5.1, 3.2, 2.9], kind: "sprinkler" },
      { t: 0.72, to: [6.9, 3.2, 2.9], kind: "sprinkler" },
      { t: 0.92, to: [8.5, 3.2, 2.9], kind: "sprinkler" },
    ],
    riser: { t: 0.06, kind: "cap" },
  },
  {
    slug: "elv-security",
    trunk: [
      [1.1, 4.3, 3.8],
      [9.0, 4.3, 3.8],
    ],
    branches: [
      { t: 0.3, to: [3.0, 3.6, 4.0], kind: "node" },
      { t: 0.62, to: [6.1, 3.6, 4.0], kind: "node" },
    ],
    riser: { t: 0.9, kind: "rack" },
  },
];

/** BMS ties: two vertical "tie" x-positions where a coordination link
 * threads through every lane, in lane order (top to bottom) — the literal
 * picture of one control layer holding the five disciplines together. */
export const BMS_TIE_X = [3.4, 7.3];

export const LANE_ORDER: DisciplineSlug[] = [
  "hvac",
  "electrical",
  "plumbing-public-health",
  "fire-protection",
  "elv-security",
];
