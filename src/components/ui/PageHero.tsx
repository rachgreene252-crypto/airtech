import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import type { ReactNode } from "react";

/**
 * Standard interior-page hero. Rebuilt 2026-09-11 for a quieter, more
 * "posh" opening on every interior page (client: pages read as too texty
 * outside actual content fields; take cues from Apple's generous, uncluttered
 * headers) — more air above/below, a soft ambient wash instead of a bare
 * hairline-bordered block, a thin rule under the eyebrow as the one small
 * flourish, and heavier display weight for a more confident first read.
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
    <section className="bg-soft-glow border-b border-(--color-line) pt-10 pb-20 sm:pt-16 sm:pb-28">
      <Container className="flex flex-col items-center text-center">
        <Breadcrumbs items={breadcrumbs} />
        {eyebrow && (
          <div className="mt-12 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue)" />
            <p className="font-mono text-label font-medium uppercase tracking-[0.16em] text-(--color-brand-blue)">
              {eyebrow}
            </p>
            <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue)" />
          </div>
        )}
        <h1 className="mt-6 max-w-[19ch] font-display text-display-xl font-semibold leading-[1.04] tracking-[-0.018em] text-balance">
          {heading}
        </h1>
        {description && (
          <p className="mt-7 max-w-[42rem] text-body-l text-(--color-steel) leading-relaxed">
            {description}
          </p>
        )}
        {meta && <div className="mt-10">{meta}</div>}
      </Container>
    </section>
  );
}
