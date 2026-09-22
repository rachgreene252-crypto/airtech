import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import type { ReactNode } from "react";

/**
 * Standard interior-page hero. Rebuilt 2026-09-16: the breadcrumb trail
 * ("Home / X") above the heading read as clutter on an otherwise clean
 * opener (client: "i dont want the 'Home/...'") — it's now sr-only (the
 * BreadcrumbList JSON-LD, real SEO value, is unaffected). The heading also
 * got a real visual anchor instead of sitting as plain dark text over the
 * soft-glow wash ("looks very pale... make it a little interesting"): an
 * ambient blue glow behind it plus a short vivid-blue accent rule beneath.
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
    <section className="relative overflow-hidden bg-soft-glow border-b border-(--color-line) pt-10 pb-20 sm:pt-16 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[36rem] -translate-x-1/2 rounded-full bg-(--color-brand-blue-soft)/20 blur-[110px]"
      />
      <Container className="relative flex flex-col items-center text-center">
        <Breadcrumbs items={breadcrumbs} visuallyHidden />
        {eyebrow && (
          <div className="flex items-center gap-3">
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
        <span aria-hidden="true" className="mt-5 h-1 w-16 rounded-full bg-(--color-brand-blue-vivid)" />
        {description && (
          <p className="mt-6 max-w-[42rem] text-body-l text-(--color-steel) leading-relaxed">
            {description}
          </p>
        )}
        {meta && <div className="mt-10">{meta}</div>}
      </Container>
    </section>
  );
}
