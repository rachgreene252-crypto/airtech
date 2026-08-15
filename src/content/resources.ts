import type { Resource } from "./types";

/**
 * No technical bulletins, downloads or insight articles were supplied.
 * Deliberately empty — the Resources page renders its empty state rather
 * than lorem-ipsum placeholder articles. Structure is ready for Airtech to
 * populate via the CMS post-launch (see Master Source of Truth §20,
 * "Post-launch priority": technical resource centre).
 */
export const resources: Resource[] = [];

export function getResources() {
  return resources;
}

export function getResourceBySlug(slug: string) {
  return resources.find((r) => r.slug === slug);
}
