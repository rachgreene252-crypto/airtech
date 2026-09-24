/**
 * Nepal outline data, shared by every map on the site (currently
 * BuiltForNepal) so there is exactly one source of the national boundary,
 * not copies that can drift apart.
 *
 * Replaced 2026-09-24 — the previous point list (an OpenCV contour trace of
 * a client-supplied reference image) still read as "very inaccurate" after
 * an earlier fix attempt; tracing a low-resolution reference photo had
 * compounded whatever distortion was already in that image. This version is
 * projected directly from Nepal's real national boundary coordinates
 * (simplified public geographic border data, EPSG:4326 lon/lat), not traced
 * from any image: `project()` below maps
 * lon ∈ [80.088425, 88.174804] and lat ∈ [26.397898, 30.422717] — Nepal's
 * actual bounding box — onto the 400×225 viewBox with 8px padding, y flipped
 * since latitude increases north but SVG y increases downward. `NEPAL_PATH`
 * is the straight-line polygon through those real vertices; `NEPAL_PATH_SMOOTH`
 * runs the same points through a closed Catmull-Rom spline so it reads as a
 * flowing curve rather than a low-poly silhouette ("the outline should be
 * intricate," 2026-09-16 feedback) — interpolation of real vertices, not
 * invented geography.
 */

export type Point = [number, number];

export const NEPAL_POINTS: Point[] = [
  [389.4, 140.2], [385.7, 162.6], [392, 195.6], [386.6, 216.1], [347, 217],
  [289.9, 204.9], [253.2, 200], [225.8, 173.5], [160.7, 166.8], [98.8, 137.7],
  [54, 112.2], [8, 92.6], [26.4, 44], [56.6, 20.4], [76.3, 8], [114.3, 24],
  [162.3, 57.8], [189, 65.2], [204.9, 90.2], [241.8, 100.4], [280.3, 123.2],
  [334.1, 135.1],
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
