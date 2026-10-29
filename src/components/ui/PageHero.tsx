import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import type { ReactNode } from "react";

/**
 * Standard interior-page header. 2026-10-29: one editorial header for every
 * interior page, the same as /projects: eyebrow and a large left-aligned
 * headline, the description in a narrower column beside it, closed by a
 * hairline. The centred layout, ambient blue glow and accent rule are gone
 * (the redesign brief asks for no decorative gradients). Breadcrumbs stay
 * screen-reader-only (client, 2026-09-16), so the JSON-LD trail is kept.
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
    <section className="pt-8 pb-2 sm:pt-12">
      <Container>
        <Breadcrumbs items={breadcrumbs} visuallyHidden />
        <div className="grid gap-6 border-b border-(--color-line-strong) pb-10 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-14">
          <div className="lg:col-span-8">
            {eyebrow && (
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">
                {eyebrow}
              </p>
            )}
            <h1 className="mt-5 max-w-[20ch] font-display text-display-2xl font-semibold leading-[1.02] tracking-[-0.026em] text-balance text-(--color-ink)">
              {heading}
            </h1>
          </div>
          {description && (
            <p className="max-w-md text-body-l leading-relaxed text-(--color-steel) lg:col-span-4">{description}</p>
          )}
        </div>
        {meta && <div className="mt-10">{meta}</div>}
      </Container>
    </section>
  );
}
