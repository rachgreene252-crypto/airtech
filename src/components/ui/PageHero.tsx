import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import type { ReactNode } from "react";

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
    <section className="border-b border-(--color-line) bg-(--color-paper) pt-8 pb-14 sm:pt-10 sm:pb-16">
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        {eyebrow && (
          <p className="mt-8 font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 max-w-4xl font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.96] text-balance">
          {heading}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg text-(--color-steel) leading-relaxed">{description}</p>
        )}
        {meta && <div className="mt-8">{meta}</div>}
      </Container>
    </section>
  );
}
