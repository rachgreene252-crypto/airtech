import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";

/**
 * Section 06 — What We Do. Editorial statement, followed by the seven
 * client-confirmed disciplines from src/content/services.ts (Master Source
 * of Truth §5 / brochure service pages — see that file's header comment).
 * Replaces the earlier single project-photograph treatment: a stock-feeling
 * aerial resort shot was carrying no information about what Airtech
 * actually does, and this is a "serious engineering company" site, not a
 * photo-led hospitality brochure. A drafting-sheet grid of the real
 * discipline taxonomy (code, name, capability summary) makes the breadth of
 * the practice legible in one scroll instead of one anecdotal image.
 */
const ACCENTS = [
  "var(--color-brand-blue)",
  "var(--color-signal)",
  "var(--color-heritage)",
  "var(--color-blueprint)",
] as const;

export function WhatWeDo() {
  return (
    <section className="bg-site-texture py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-label font-medium text-(--color-brand-blue)">
            What we do
          </p>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[0.98] text-(--color-ink) text-balance">
            We engineer the systems
            <br />
            that make buildings work.
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-base sm:text-lg leading-relaxed text-(--color-steel)">
            From climate control and electrical infrastructure to water, fire protection and
            intelligent building systems, Airtech brings multiple disciplines together under
            one coordinated engineering approach.
          </p>
          <p className="mx-auto mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-(--color-ink-soft) font-medium">
            The result is not simply a collection of installed systems. It is one coordinated
            building environment, engineered to perform.
          </p>
        </div>

        <div className="crop-frame relative mt-16 border border-(--color-line-strong) text-(--color-signal)">
          <span className="crop-tick-tl" />
          <span className="crop-tick-br" />
          <Reveal className="grid grid-cols-1 divide-y divide-(--color-line) sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
            {services.map((service, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <div key={service.slug} className="group relative flex flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="font-mono text-[11px] font-semibold tracking-[0.08em]"
                      style={{ color: accent }}
                    >
                      {service.disciplineCode}
                    </span>
                    <span className="h-px flex-1 bg-(--color-line)" />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-tight text-(--color-ink)">
                    {service.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-(--color-steel)">
                    {service.shortDescription}
                  </p>
                  <Link
                    href={`/expertise/${service.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-label font-medium text-(--color-brand-blue) opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:mt-auto sm:pt-4"
                  >
                    Learn more
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              );
            })}
          </Reveal>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/expertise"
            className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-(--color-brand-blue) hover:gap-2.5 transition-all"
          >
            Explore Our Expertise
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
