"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 02, Proof. Only claims confirmed in source material
 * (site-settings.ts / docs/AIRTECH_OPEN_DECISIONS.md #3): 25+ years,
 * established 2000, MEP operations from 2013. Headcount / project-count
 * figures stay `needs_verification` and are not shown.
 *
 * 2026-09-16: dropped the fourth "6 engineering disciplines" stat (that
 * fact belongs to the systems section right below it, not a number bar),
 * moved this section to sit directly under the hero, and switched the
 * numerals to mono, big and bold, a deliberately different register from
 * the display headings everywhere else, so a stat reads as data, not as
 * another headline.
 *
 * 2026-09-25 — reverted the numerals specifically (not the rest of the
 * mono-for-data-values convention) from font-mono back to font-display:
 * IBM Plex Mono's default zero has a centred dot (standard monospace
 * disambiguation from capital O), which reads fine in small code-style
 * contexts but looked like a pair of eyes at 56-64px ("2000", "2013").
 */
const STATS = [
  { value: 25, suffix: "+", label: "Years of engineering experience" },
  { value: 2000, suffix: "", label: "Established in Nepal" },
  { value: 2013, suffix: "", label: "MEP operations commenced" },
] as const;

export function ProofBar() {
  return (
    <section className="border-t border-(--color-line) bg-(--color-paper-raised) py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-y-0">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="px-3 text-center sm:px-6 sm:border-l sm:first:border-l-0 sm:border-(--color-line-strong)">
                <StatNumber value={stat.value} suffix={stat.suffix} delay={i * 0.12} />
                <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-8 rounded-full bg-(--color-brand-blue-vivid)" />
                <p className="mx-auto mt-4 max-w-[14rem] text-small leading-relaxed text-(--color-steel)">
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
      className="font-display text-[3rem] font-bold leading-none tracking-[-0.03em] text-(--color-ink) sm:text-[3.5rem]"
    >
      {display}
      {suffix}
    </p>
  );
}
