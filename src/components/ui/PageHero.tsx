import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import type { ReactNode } from "react";

/**
 * Standard interior-page hero. Centred column — the site's standing layout
 * rule. Typography-first: a Fraunces H1 at a light display weight, generous
 * space, no photo. `meta` slot sits under the description for stat rows or
 * chips.
 */
export function PageHero({
  breadcrumbs,
  eyebrow,
  heading,
  description,
  meta,
}: {
  breadcrumbs: Crumb[];
  eyebrow?: string;
  heading: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <section className="border-b border-(--color-line) pt-8 pb-16 sm:pt-12 sm:pb-24">
      <Container className="flex flex-col items-center text-center">
        <Breadcrumbs items={breadcrumbs} />
        {eyebrow && (
          <p className="mt-10 font-mono text-label font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-5 max-w-[20ch] font-display text-display-xl font-normal leading-[1.05] tracking-[-0.014em] text-balance">
          {heading}
        </h1>
        {description && (
          <p className="mt-6 max-w-[44rem] text-body-l text-(--color-steel) leading-relaxed">
            {description}
          </p>
        )}
        {meta && <div className="mt-9">{meta}</div>}
      </Container>
    </section>
  );
}
