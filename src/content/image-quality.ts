import type { Project } from "./types";

/**
 * Whether a project's photograph is good enough for a large tile. Photos
 * under 640px wide (client-supplied web grabs) stay as index thumbnails
 * rather than being stretched into soft, oversized frames.
 */
export function hasTileImage(project: Project) {
  const img = project.heroImage;
  return Boolean(img?.src) && (img?.width ?? 1600) >= 640;
}
