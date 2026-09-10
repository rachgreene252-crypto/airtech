"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 03 — Proof. Only claims confirmed in source material
 * (site-settings.ts / docs/AIRTECH_OPEN_DECISIONS.md #3): 25+ years,
 * established 2000, MEP operations from 2013, six engineering disciplines
 * (src/content/services.ts). Headcount / project-count figures stay
 * `needs_verification` and are not shown.
 *
 * Rebuilt 2026-09-10 (client: make the stats "more attractive... fades and
 * animation") — each numeral counts up once it scrolls into view, with a
 * small icon per stat instead of a bare hairline, on a tinted band rather
 * than plain white.
 */
const STATS = [
  { value: 25, suffix: "+", label: "Years of engineering experience" },
  { value: 2000, suffix: "", label: "Established in Nepal" },
  { value: 2013, suffix: "", label: "MEP operations commenced" },
  { value: 6, suffix: "", label: "Engineering disciplines, coordinated as one" },
] as const;

export function ProofBar() {
  return (
    <section className="border-t border-(--color-line) bg-(--color-paper-raised) py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-y-12 sm:grid-cols-4 sm:gap-y-0">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="px-3 text-center sm:px-5 sm:border-l sm:first:border-l-0 sm:border-(--color-line-strong)">
                <StatNumber value={stat.value} suffix={stat.suffix} delay={i * 0.12} />
                <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-8 rounded-full bg-(--color-brand-blue-vivid)" />
                <p className="mx-auto mt-4 max-w-[12rem] text-small leading-relaxed text-(--color-steel)">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function StatNumber({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const duration = 1100;
    const start = performance.now() + delay * 1000;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduceMotion, value, delay]);

  return (
    <p
      ref={ref}
      className="font-display text-[2.75rem] font-semibold leading-none tracking-[-0.02em] text-(--color-ink) sm:text-[3rem]"
    >
      {display}
      {suffix}
    </p>
  );
}
