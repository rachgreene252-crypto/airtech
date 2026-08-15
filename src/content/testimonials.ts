import type { Testimonial } from "./types";

/**
 * No testimonial text, attributed name or title was supplied in any source
 * document — the questionnaire and brochure both note testimonials as
 * "need to collect" / not yet available. Deliberately empty rather than
 * invented. See docs/OPEN_DECISIONS.md.
 */
export const testimonials: Testimonial[] = [];

export function getTestimonials() {
  return testimonials;
}

export function getTestimonialForProject(projectSlug: string) {
  return testimonials.find((t) => t.projectSlug === projectSlug);
}
