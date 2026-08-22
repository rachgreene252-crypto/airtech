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
    <section className="bg-(--color-paper) pt-4 pb-16 sm:pt-6 sm:pb-20">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-8">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06} className="relative border-t border-(--color-line-strong) pt-4">
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-8 bg-(--color-signal-soft)"
              />
              <p className="font-display text-4xl sm:text-5xl font-bold leading-none text-(--color-ink)">
                <AnimatedStat value={stat.value} />
              </p>
              <p className="mt-3 font-mono text-[11px] sm:text-xs tracking-[0.06em] uppercase text-(--color-brand-blue)">
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
