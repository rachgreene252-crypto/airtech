import type { Project } from "./types";

/**
 * Images that clear the width floor but still shouldn't run large: soft
 * architectural renderings supplied as web grabs. They stay as index
 * thumbnails and on the project's own page.
 */
const THUMBNAIL_ONLY = new Set(["/images/projects/chhaya-center-render.jpg"]);

/**
 * Whether a project's photograph is good enough for a large tile. Photos
 * under 640px wide (client-supplied web grabs) stay as index thumbnails
 * rather than being stretched into soft, oversized frames.
 */
export function hasTileImage(project: Project) {
  const img = project.heroImage;
  if (!img?.src || THUMBNAIL_ONLY.has(img.src)) return false;
  return (img.width ?? 1600) >= 640;
}
