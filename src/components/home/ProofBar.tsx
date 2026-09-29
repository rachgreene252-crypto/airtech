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
    <section className="bg-band py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="mx-auto grid max-w-3xl grid-cols-3">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="border-l border-(--color-line-strong) px-2 text-center first:border-l-0 sm:px-6">
                <StatNumber value={stat.value} suffix={stat.suffix} delay={i * 0.12} />
                <span aria-hidden="true" className="mx-auto mt-3 block h-0.5 w-6 rounded-full bg-(--color-brand-blue-vivid) sm:mt-4 sm:h-1 sm:w-8" />
                <p className="mx-auto mt-3 max-w-[14rem] text-xs leading-snug sm:mt-4 sm:text-small sm:leading-relaxed text-(--color-steel)">
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
  // Render the real figure on the server and first client paint: seeding
  // from the motion preference made SSR (always 0) and a reduced-motion
  // client (the value) disagree — React hydration error #418 — and left a
  // "0" for crawlers and no-JS visitors. With motion allowed, the effect
  // below re-arms the count-up from 0.
  const [display, setDisplay] = useState(value);

  // Arm the count-up while the stat is still just off-screen, so the reset
  // to 0 is never seen.
  const near = useInView(ref, { once: true, margin: "300px" });
  useEffect(() => {
    if (!near || reduceMotion) return;
    const id = requestAnimationFrame(() => setDisplay(0));
    return () => cancelAnimationFrame(id);
  }, [near, reduceMotion]);

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
      className="font-display text-[2rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-(--color-ink) sm:text-[3.25rem]"
    >
      {display}
      {suffix}
    </p>
  );
}
