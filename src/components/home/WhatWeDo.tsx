import Link from "next/link";
import type { Route } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";

/**
 * Section 04 — What We Do. The seven client-confirmed disciplines from
 * src/content/services.ts, as a numbered sheet index (code, name, one-line
 * scope) rather than a grid of bordered cards — same list language as the
 * Expertise page it links into.
 */
export function WhatWeDo() {
  return (
    <section className="border-t border-(--color-line) py-12 sm:py-14 lg:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
            What we do
          </p>
          <h2 className="mt-5 font-display text-display-l font-normal leading-[1.08] tracking-[-0.012em] text-(--color-ink) text-balance">
            An integrated MEP practice with deep HVAC roots.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-body-l leading-relaxed text-(--color-steel)">
            Not an air-conditioning company that also handles the rest. Seven
            engineering disciplines — designed, procured, installed and commissioned
            under one team.
          </p>
        </div>

        <Reveal className="mx-auto mt-12 max-w-3xl border-t border-(--color-line)">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/expertise/${service.slug}` as Route}
              className="group flex items-baseline gap-4 border-b border-(--color-line) py-5 transition-colors hover:bg-(--color-paper-raised) sm:gap-6"
            >
              <span className="font-mono text-[0.6875rem] text-(--color-steel-soft)">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="font-display text-title font-normal text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
                  {service.name}
                </span>
                <span className="mt-1 block text-small leading-relaxed text-(--color-steel)">
                  {service.homeSummary}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-(--color-brand-blue) transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          ))}
        </Reveal>

        <div className="mt-9 text-center">
          <Link
            href="/expertise"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-(--color-brand-blue) transition-all hover:gap-2.5"
          >
            Explore all expertise
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
