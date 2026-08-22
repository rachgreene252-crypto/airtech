"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 05 — Proof bar. Only claims confirmed in source material
 * (site-settings.ts / docs/AIRTECH_OPEN_DECISIONS.md B3): 25+ years,
 * established 2000, MEP operations commenced 2013. Team/headcount figures
 * ("300+") remain `needs_verification`, so the fourth slot is a qualitative
 * proof point rather than an invented number. Per the 2026-08-22
 * visual-correction brief this sits directly on the page's plain paper
 * canvas (no separate panel/border) so it doesn't read as a disconnected
 * dashboard, and numeric stats count up once when scrolled into view.
 */
const STATS = [
  { value: "25+", label: "Years of engineering experience" },
  { value: "2000", label: "Established in Nepal" },
  { value: "2013", label: "MEP operations commenced" },
  { value: "In-house", label: "Multidisciplinary engineering & technical team" },
] as const;

export function ProofBar() {
  return (
    <section className="bg-(--color-paper) py-20 sm:py-24">
      <Container>
        <div className="flex flex-wrap gap-x-16 gap-y-12 sm:gap-x-20">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06} className="min-w-[9rem]">
              <p className="font-display text-5xl sm:text-6xl font-semibold leading-none text-(--color-ink)">
                <AnimatedStat value={stat.value} />
              </p>
              <p className="mt-4 max-w-[11rem] font-mono text-[11px] sm:text-xs leading-relaxed tracking-[0.06em] uppercase text-(--color-brand-blue)">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(() => {
    const match = value.match(/^(\d+)(\D*)$/);
    return match ? `0${match[2]}` : value;
  });

  useEffect(() => {
    const match = value.match(/^(\d+)(\D*)$/);
    const el = ref.current;
    if (!match || !el) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];

    // Plain IntersectionObserver rather than framer-motion's useInView —
    // useInView's pooled/shared observer was silently never firing for
    // whichever AnimatedStat happened to be the first useInView consumer
    // mounted on the page (reproduced in both dev and a production build,
    // so not a strict-mode artifact); this sidesteps that entirely.
    let stopAnimation: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const controls = animate(0, target, {
          // duration 0 for reduced motion still routes the final value
          // through onUpdate rather than skipping the animation outright.
          duration: reduceMotion ? 0 : 1.1,
          ease: [0.22, 1, 0.36, 1],
          onUpdate(v) {
            setDisplay(`${Math.round(v)}${suffix}`);
          },
        });
        stopAnimation = () => controls.stop();
      },
      { rootMargin: "0px 0px -100px 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      stopAnimation?.();
    };
  }, [value, reduceMotion]);

  return <span ref={ref}>{display}</span>;
}
