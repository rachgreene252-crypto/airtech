export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3000/studio";

/**
 * True once a real Sanity project has been provisioned and connected via env
 * vars (see docs/OPEN_DECISIONS.md #8). Until then, `src/lib/data` serves
 * content from the local seed in `src/content` so the site is fully
 * functional without live CMS credentials.
 */
export const isSanityConfigured = Boolean(projectId && dataset);
