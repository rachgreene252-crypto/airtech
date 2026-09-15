/**
 * Isometric projection helpers for the engineering scene.
 *
 * Coordinates are expressed as [x, y, z] in "building units": x runs along
 * the structural bay, y is height (0 = floor, positive = up), z is depth
 * into the ceiling void. project() turns that into 2D SVG points using a
 * standard 30° isometric projection — the same convention used in real
 * technical/axonometric drawings, chosen specifically so this reads as a
 * drawing, not a 3D render.
 */
export type Vec3 = readonly [number, number, number];

const ISO = Math.PI / 6;
const COS = Math.cos(ISO);
const SIN = Math.sin(ISO);
export const SCALE = 42;

export function project([x, y, z]: Vec3): [number, number] {
  const sx = (x - z) * COS * SCALE;
  const sy = ((x + z) * SIN - y) * SCALE;
  return [sx, sy];
}

function fmt(n: number) {
  return Math.round(n * 10) / 10;
}

export function pathFrom(points: Vec3[]): string {
  return points
    .map(project)
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${fmt(x)},${fmt(y)}`)
    .join(" ");
}

export function pointOnPath(points: Vec3[], t: number): Vec3 {
  const segs = points.length - 1;
  const pos = t * segs;
  const i = Math.min(segs - 1, Math.floor(pos));
  const local = pos - i;
  const [x1, y1, z1] = points[i];
  const [x2, y2, z2] = points[i + 1];
  return [x1 + (x2 - x1) * local, y1 + (y2 - y1) * local, z1 + (z2 - z1) * local];
}

function poly(points: [number, number][]): string {
  return points.map(([x, y]) => `${fmt(x)},${fmt(y)}`).join(" ");
}

/** Three visible faces of an axis-aligned box (top / front / side), for
 * drawing equipment as solid technical blocks (AHU, panels, pumps). */
export function boxFaces(origin: Vec3, size: Vec3) {
  const [x, y, z] = origin;
  const [w, h, d] = size;
  const p = (dx: number, dy: number, dz: number) => project([x + dx, y + dy, z + dz]);
  return {
    top: poly([p(0, h, 0), p(w, h, 0), p(w, h, d), p(0, h, d)]),
    front: poly([p(0, 0, 0), p(w, 0, 0), p(w, h, 0), p(0, h, 0)]),
    side: poly([p(w, 0, 0), p(w, 0, d), p(w, h, d), p(w, h, 0)]),
  };
}

export function projectPt(v: Vec3): [number, number] {
  return project(v);
}
