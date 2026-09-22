/**
 * Nepal outline data, shared by every map on the site (ProjectsMap,
 * BuiltForNepal) so there is exactly one traced source of the national
 * boundary, not two copies that can drift apart.
 *
 * The point list itself is the real client-supplied outline traced via
 * OpenCV contour extraction (see BuiltForNepal.tsx's original note) —
 * unchanged. `NEPAL_PATH` renders it as the straight-line polygon that
 * trace produced; `NEPAL_PATH_SMOOTH` runs the same points through a
 * closed Catmull-Rom spline (converted to cubic Beziers) so the render is
 * a smooth curve through the real vertices instead of a jagged low-poly
 * outline ("the outline should be intricate," 2026-09-16 feedback) —
 * interpolation of the real trace, not invented geography.
 */

export type Point = [number, number];

export const NEPAL_POINTS: Point[] = [
  [15.4, 38], [0, 89], [22, 105.6], [54.6, 116.3], [60.5, 128.8], [87.2, 144.8],
  [127.6, 155.5], [129.4, 165.6], [152.5, 168.5], [158.5, 175.1], [165.6, 168.5],
  [222, 173.3], [223.7, 189.9], [255.2, 206.5], [276, 204.2], [284.3, 215.4],
  [312.2, 213.6], [357.3, 224.9], [395.8, 217.8], [400, 198.2], [391.1, 181.6],
  [395.3, 135.9], [378.6, 132.3], [373.9, 137.7], [346, 139.5], [325.2, 125.8],
  [313.4, 132.3], [302.7, 132.3], [299.7, 123.4], [284.9, 125.8], [276, 111.6],
  [252.8, 114.5], [251, 98.5], [228.5, 99.7], [205.3, 84.3], [203, 66.5],
  [191.1, 60.5], [169.1, 65.3], [157.3, 47.5], [107.4, 19.6], [99.7, 3.6],
  [67.1, 0], [64.1, 14.2], [42.7, 10.7],
];

export const NEPAL_PATH =
  "M" + NEPAL_POINTS.map(([x, y]) => `${x},${y}`).join(" L") + " Z";

function closedCatmullRomToBezier(points: Point[], tension = 6): string {
  const n = points.length;
  const at = (i: number) => points[((i % n) + n) % n];
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < n; i++) {
    const [p0x, p0y] = at(i - 1);
    const [p1x, p1y] = at(i);
    const [p2x, p2y] = at(i + 1);
    const [p3x, p3y] = at(i + 2);
    const c1x = p1x + (p2x - p0x) / tension;
    const c1y = p1y + (p2y - p0y) / tension;
    const c2x = p2x - (p3x - p1x) / tension;
    const c2y = p2y - (p3y - p1y) / tension;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2x},${p2y}`;
  }
  return d + " Z";
}

export const NEPAL_PATH_SMOOTH = closedCatmullRomToBezier(NEPAL_POINTS);
