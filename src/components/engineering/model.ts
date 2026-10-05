/**
 * Shared axonometric building model (2026-09-29) — the one drawing behind
 * both THE BUILDING (what Airtech engineers) and THE AIRTECH METHOD (how it
 * gets delivered), so the two sections read as one system.
 *
 * Coordinates are building units [x, y, z]: x along the facade (0..9), y up
 * (basement −3, ground 0, four storeys of 3 to the roof slab at 12), z into
 * the plan (0..6). A standard 30° isometric projection, as in a real
 * axonometric drawing. Visible facades are x = 9 and z = 6.
 *
 * Every system and every labelled component comes from Airtech's documented
 * capability list (AIRTECH_WEBSITE_MASTER_SOURCE_OF_TRUTH_v1 §5 and
 * AIPL PROFILE - 2026.pptx slide 4 "Our Services"): chillers/VRF,
 * ventilation/AHU, HT/LT panels, transformers, distribution boards,
 * hydro-pneumatic pumps, STP, water supply/drainage, fire pumps,
 * sprinklers, hydrants, CCTV, access control, networking, BMS.
 * Placement follows ordinary building-services practice (plant on the roof
 * and in the basement, risers grouped at a service zone, distribution in
 * each floor's ceiling void) — it is a typical building, not a drawing of
 * any specific Airtech project.
 */
export type Vec3 = readonly [number, number, number];

export const S = 17; // screen px per building unit
const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);

export function project([x, y, z]: Vec3): [number, number] {
  return [(x - z) * COS * S, ((x + z) * SIN - y) * S];
}

const f = (n: number) => Math.round(n * 10) / 10;

export function path(points: Vec3[], close = false): string {
  return (
    points
      .map(project)
      .map(([x, y], i) => `${i ? "L" : "M"}${f(x)},${f(y)}`)
      .join(" ") + (close ? " Z" : "")
  );
}

export function box(origin: Vec3, size: Vec3) {
  const [x, y, z] = origin;
  const [w, h, d] = size;
  const p = (dx: number, dy: number, dz: number): Vec3 => [x + dx, y + dy, z + dz];
  return {
    top: path([p(0, h, 0), p(w, h, 0), p(w, h, d), p(0, h, d)], true),
    left: path([p(0, 0, d), p(w, 0, d), p(w, h, d), p(0, h, d)], true),
    right: path([p(w, 0, 0), p(w, 0, d), p(w, h, d), p(w, h, 0)], true),
    centre: project(p(w / 2, h / 2, d / 2)),
    topCentre: project(p(w / 2, h, d / 2)),
  };
}

export const W = 9;
export const D = 6;
export const FLOOR_H = 3;
export const LEVELS = [0, 3, 6, 9, 12]; // slab levels: ground … roof
export const BASEMENT = -3;
const FLOOR_BASES = [0, 3, 6, 9]; // occupied storeys

/* ------------------------------------------------------------------ */
/* Architecture                                                        */
/* ------------------------------------------------------------------ */

export const SLABS = LEVELS.map((y) => path([[0, y, 0], [W, y, 0], [W, y, D], [0, y, D]], true));
export const BASEMENT_SLAB = path([[0, BASEMENT, 0], [W, BASEMENT, 0], [W, BASEMENT, D], [0, BASEMENT, D]], true);
export const PARAPET = path([[0, 12.7, 0], [W, 12.7, 0], [W, 12.7, D], [0, 12.7, D]], true);

const COL_POS: [number, number][] = [
  [0, 0], [4.5, 0], [9, 0], [0, 6], [4.5, 6], [9, 6], [0, 3], [9, 3],
];
/** Columns; `front` = on a visible facade (drawn over the services). */
export const COLUMNS = COL_POS.map(([x, z]) => ({
  d: path([[x, BASEMENT, z], [x, 12.7, z]]),
  front: x === W || z === D,
}));

/** Curtain wall on the two visible facades: mullions + floor transoms. */
export const GLASS_FACES = [
  path([[W, 0, 0], [W, 12, 0], [W, 12, D], [W, 0, D]], true),
  path([[0, 0, D], [W, 0, D], [W, 12, D], [0, 12, D]], true),
];
export const MULLIONS: string[] = [
  ...[1.5, 3, 4.5, 6, 7.5].map((x) => path([[x, 0, D], [x, 12, D]])),
  ...[1.5, 3, 4.5].map((z) => path([[W, 0, z], [W, 12, z]])),
  ...[1.5, 4.5, 7.5, 10.5].map((y) => path([[0, y, D], [W, y, D], [W, y, 0]])),
];

/** Site plane and grade line. */
export const SITE = path([[-2.5, 0, -2], [13.5, 0, -2], [13.5, 0, 9], [-2.5, 0, 9]], true);
export const SITE_GRID: string[] = [
  ...[-1, 1, 3, 5, 7, 9, 11, 13].map((x) => path([[x, 0, -2], [x, 0, 9]])),
  ...[-1, 1, 3, 5, 7].map((z) => path([[-2.5, 0, z], [13.5, 0, z]])),
];
/** Brief-stage footprint (dashed massing outline). */
export const MASSING: string[] = [
  path([[0, 0, 0], [W, 0, 0], [W, 0, D], [0, 0, D]], true),
  path([[0, 12, 0], [W, 12, 0], [W, 12, D], [0, 12, D]], true),
  ...[[0, 0], [W, 0], [W, D], [0, D]].map(([x, z]) => path([[x, 0, z], [x, 12, z]])),
];

/* ------------------------------------------------------------------ */
/* Systems                                                             */
/* ------------------------------------------------------------------ */

export type SystemSlug =
  | "hvac"
  | "electrical"
  | "plumbing-public-health"
  | "fire-protection"
  | "elv-security"
  | "bms-systems-integration";

export type Equipment = {
  id: string;
  label: string;
  origin: Vec3;
  size: Vec3;
};

export type SystemGeometry = {
  slug: SystemSlug;
  /** Distribution runs (risers + per-floor mains). */
  runs: string[];
  /** Thin secondary runs (branches, drops). */
  branches: string[];
  dashed?: boolean;
  /** Terminal points (diffusers, sprinklers, devices) in screen space. */
  terminals: [number, number][];
  equipment: Equipment[];
  /** One representative run for the flow pulse. */
  flow: string;
};

const floors = (fn: (y0: number) => string) => FLOOR_BASES.map(fn);

export const SYSTEMS: SystemGeometry[] = [
  {
    slug: "hvac",
    runs: [
      path([[1.2, 12, 1.4], [1.2, 0.9, 1.4]]),
      ...floors((y) => path([[1.2, y + 2.6, 1.4], [8.2, y + 2.6, 1.4], [8.2, y + 2.6, 4.2]])),
    ],
    branches: floors((y) =>
      [3.2, 5.2, 7.2]
        .map((x) => path([[x, y + 2.6, 1.4], [x, y + 2.25, 1.4]]))
        .join(" ")
    ),
    terminals: FLOOR_BASES.flatMap((y) => [3.2, 5.2, 7.2].map((x) => project([x, y + 2.2, 1.4]))),
    equipment: [
      { id: "chiller-1", label: "Chiller / outdoor units", origin: [0.6, 12, 0.6], size: [1.8, 0.9, 1.4] },
      { id: "chiller-2", label: "", origin: [2.8, 12, 0.6], size: [1.8, 0.9, 1.4] },
      { id: "ahu", label: "Air handling unit", origin: [0.4, 0, 0.5], size: [1.9, 1.3, 1.3] },
    ],
    flow: path([[1.2, 12, 1.4], [1.2, 8.6, 1.4], [8.2, 8.6, 1.4], [8.2, 8.6, 4.2]]),
  },
  {
    slug: "electrical",
    runs: [
      path([[7.9, BASEMENT + 1.7, 5.1], [7.9, 11.4, 5.1]]),
      ...floors((y) => path([[7.9, y + 2.3, 5.1], [1.4, y + 2.3, 5.1]])),
    ],
    branches: floors((y) => path([[7.9, y + 2.3, 5.1], [7.9, y + 1.2, 5.1]])),
    terminals: [],
    equipment: [
      { id: "transformer", label: "Transformer", origin: [6.7, BASEMENT, 3.6], size: [1.4, 1.5, 1.1] },
      { id: "lt-panel", label: "HT/LT panels", origin: [4.9, BASEMENT, 4.7], size: [1.5, 1.8, 0.6] },
      ...FLOOR_BASES.map((y, i) => ({
        id: `db-${i}`,
        label: i === 2 ? "Distribution board" : "",
        origin: [7.55, y + 0.4, 5.25] as Vec3,
        size: [0.7, 0.9, 0.3] as Vec3,
      })),
    ],
    flow: path([[7.9, BASEMENT + 1.7, 5.1], [7.9, 5.3, 5.1], [1.4, 5.3, 5.1]]),
  },
  {
    slug: "plumbing-public-health",
    runs: [
      path([[2.9, BASEMENT + 0.8, 5.0], [2.9, 12.3, 5.0], [6.6, 12.3, 5.0], [6.6, 12.3, 3.0]]),
      ...floors((y) => path([[2.9, y + 2.0, 5.0], [2.9, y + 2.0, 3.0], [5.6, y + 2.0, 3.0]])),
    ],
    branches: [path([[3.5, 11.6, 5.4], [3.5, BASEMENT + 1.4, 5.4], [1.6, BASEMENT + 1.4, 2.6]])],
    dashed: false,
    terminals: FLOOR_BASES.map((y) => project([5.6, y + 2.0, 3.0])),
    equipment: [
      { id: "tank", label: "Overhead water tank", origin: [5.7, 12, 1.2], size: [1.8, 1.4, 1.8] },
      { id: "pumps", label: "Hydro-pneumatic pumps", origin: [2.3, BASEMENT, 4.4], size: [1.1, 0.8, 0.9] },
      { id: "stp", label: "STP / WTP", origin: [0.4, BASEMENT, 1.6], size: [2.2, 1.2, 1.9] },
    ],
    flow: path([[2.9, BASEMENT + 0.8, 5.0], [2.9, 8.0, 5.0], [2.9, 8.0, 3.0], [5.6, 8.0, 3.0]]),
  },
  {
    slug: "fire-protection",
    runs: [
      path([[1.4, BASEMENT + 0.9, 5.5], [1.4, 12, 5.5]]),
      ...floors((y) => path([[1.4, y + 2.8, 5.5], [1.4, y + 2.8, 3.4], [8.4, y + 2.8, 3.4]])),
    ],
    branches: [],
    terminals: FLOOR_BASES.flatMap((y) => [3.0, 4.8, 6.6, 8.4].map((x) => project([x, y + 2.72, 3.4]))),
    equipment: [
      { id: "fire-pumps", label: "Fire pumps", origin: [0.3, BASEMENT, 4.6], size: [1.4, 0.9, 1.0] },
      { id: "hydrant", label: "Hydrant / landing valve", origin: [1.15, 0.6, 5.7], size: [0.5, 0.7, 0.25] },
    ],
    flow: path([[1.4, BASEMENT + 0.9, 5.5], [1.4, 5.8, 5.5], [1.4, 5.8, 3.4], [8.4, 5.8, 3.4]]),
  },
  {
    slug: "elv-security",
    runs: [
      path([[4.5, 1.8, 5.5], [4.5, 11.4, 5.5]]),
      ...floors((y) => path([[4.5, y + 2.45, 5.5], [4.5, y + 2.45, 0.6], [8.4, y + 2.45, 0.6]])),
    ],
    branches: [],
    dashed: true,
    terminals: FLOOR_BASES.flatMap((y) => [project([8.4, y + 2.3, 0.6]), project([4.5, y + 2.3, 2.6])]),
    equipment: [
      { id: "rack", label: "ELV / network rack", origin: [4.2, 0, 5.1], size: [0.7, 1.8, 0.6] },
      { id: "cctv", label: "CCTV / access control", origin: [8.25, 9.6, 0.45], size: [0.3, 0.3, 0.3] },
    ],
    flow: path([[4.5, 1.8, 5.5], [4.5, 5.45, 5.5], [4.5, 5.45, 0.6], [8.4, 5.45, 0.6]]),
  },
  {
    slug: "bms-systems-integration",
    runs: [],
    branches: [],
    dashed: true,
    terminals: [],
    equipment: [{ id: "bms", label: "BMS control", origin: [5.6, 0, 0.7], size: [1.2, 1.2, 0.7] }],
    flow: "",
  },
];

/** BMS ties: from the control point to each system's plant. */
const BMS_FROM: Vec3 = [6.2, 1.2, 1.05];
const tieTo = (v: Vec3) => path([BMS_FROM, [v[0], BMS_FROM[1], BMS_FROM[2]], v]);
SYSTEMS[5].runs = [
  tieTo([1.35, 1.3, 1.15]), // AHU
  tieTo([1.2, 12.9, 1.3]), // chillers
  tieTo([7.4, BASEMENT + 1.5, 4.1]), // transformer
  tieTo([2.85, BASEMENT + 0.8, 4.85]), // pumps
  tieTo([1.0, BASEMENT + 0.9, 5.1]), // fire pumps
  tieTo([4.55, 1.8, 5.4]), // ELV rack
];
SYSTEMS[5].flow = SYSTEMS[5].runs[1];

export const SYSTEM_ORDER: SystemSlug[] = SYSTEMS.map((s) => s.slug);

/* ------------------------------------------------------------------ */
/* Framing                                                             */
/* ------------------------------------------------------------------ */

function bounds(points: Vec3[]) {
  const xs: number[] = [];
  const ys: number[] = [];
  for (const p of points) {
    const [x, y] = project(p);
    xs.push(x);
    ys.push(y);
  }
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
}

const BUILDING_BOUNDS = bounds([
  [0, BASEMENT, 0], [W, BASEMENT, 0], [W, BASEMENT, D], [0, BASEMENT, D],
  [0, 13.6, 0], [W, 13.6, 0], [W, 13.6, D], [0, 13.6, D],
]);
const SITE_BOUNDS = bounds([[-2.5, 0, -2], [13.5, 0, -2], [13.5, 0, 9], [-2.5, 0, 9]]);

const PAD = 34;
/** Assembled: the building on its site. */
export const VIEW_ASSEMBLED = (() => {
  const minX = Math.min(BUILDING_BOUNDS.minX, SITE_BOUNDS.minX) - PAD;
  const maxX = Math.max(BUILDING_BOUNDS.maxX, SITE_BOUNDS.maxX) + PAD;
  const minY = BUILDING_BOUNDS.minY - PAD;
  const maxY = Math.max(BUILDING_BOUNDS.maxY, SITE_BOUNDS.maxY) + PAD;
  return [minX, minY, maxX - minX, maxY - minY] as const;
})();

/** Exploded: architecture on the left, each system pulled out to its right. */
export const EXPLODE_STEP = (BUILDING_BOUNDS.maxX - BUILDING_BOUNDS.minX) * 0.82;
export const VIEW_EXPLODED = (() => {
  const minX = BUILDING_BOUNDS.minX - PAD;
  const maxX = BUILDING_BOUNDS.maxX + EXPLODE_STEP * SYSTEMS.length + PAD;
  const minY = BUILDING_BOUNDS.minY - PAD;
  const maxY = BUILDING_BOUNDS.maxY + PAD + 58;
  return [minX, minY, maxX - minX, maxY - minY] as const;
})();
export const EXPLODED_LABEL_Y = BUILDING_BOUNDS.maxY + 34;
export const BUILDING_CENTRE_X = (BUILDING_BOUNDS.minX + BUILDING_BOUNDS.maxX) / 2;

/** Procurement staging: plant lined up on site before installation. */
export const STAGING: Record<string, Vec3> = {
  "chiller-1": [10.4, 0, 0.2],
  "chiller-2": [10.4, 0, 2.0],
  ahu: [12.4, 0, 0.2],
  transformer: [10.4, 0, 4.0],
  "lt-panel": [12.4, 0, 2.2],
  tank: [12.3, 0, 4.1],
  pumps: [10.4, 0, 6.2],
  "fire-pumps": [11.8, 0, 6.2],
  rack: [13.3, 0, 6.3],
  bms: [13.2, 0, 7.8],
  stp: [10.2, 0, 7.6],
};
