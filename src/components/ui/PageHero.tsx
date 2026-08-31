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
    <section className="border-b border-(--color-line) bg-site-texture pt-8 pb-16 sm:pt-12 sm:pb-24">
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        {eyebrow && (
          <p className="mt-10 font-sans text-label font-medium tracking-[0.01em] text-(--color-brand-blue)">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 max-w-[22ch] font-display text-display-l font-semibold leading-[1.03] tracking-[-0.018em] text-balance">
          {heading}
        </h1>
        {description && (
          <p className="mt-6 max-w-[44rem] text-lg text-(--color-steel) leading-relaxed">{description}</p>
        )}
        {meta && <div className="mt-8">{meta}</div>}
      </Container>
    </section>
  );
}
