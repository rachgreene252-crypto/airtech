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
    <section className="border-t border-(--color-line) py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
            What we do
          </p>
          <h2 className="mt-5 font-display text-display-l font-normal leading-[1.08] tracking-[-0.012em] text-(--color-ink) text-balance">
            Seven disciplines, one coordinated practice.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-body-l leading-relaxed text-(--color-steel)">
            Climate control, power, water, fire protection and intelligent building
            systems — designed and delivered under one roof.
          </p>
        </div>

        <Reveal className="mx-auto mt-14 max-w-4xl border-t border-(--color-line)">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/expertise/${service.slug}` as Route}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-5 gap-y-1 border-b border-(--color-line) py-6 transition-colors hover:bg-(--color-paper-raised) sm:grid-cols-[2.5rem_14rem_1fr_auto] sm:gap-x-8"
            >
              <span className="font-mono text-xs text-(--color-steel-soft)">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-title font-normal text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
                {service.name}
              </span>
              <span className="col-span-2 text-small leading-relaxed text-(--color-steel) sm:col-span-1">
                {service.homeSummary}
              </span>
              <span
                aria-hidden="true"
                className="hidden text-(--color-brand-blue) transition-transform duration-300 group-hover:translate-x-1 sm:block"
              >
                →
              </span>
            </Link>
          ))}
        </Reveal>

        <div className="mt-10 text-center">
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
