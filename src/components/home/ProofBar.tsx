"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 05 — Proof bar. Only claims confirmed in source material
 * (site-settings.ts / docs/AIRTECH_OPEN_DECISIONS.md B3): 25+ years,
 * established 2000, MEP operations commenced 2013. Team/headcount figures
 * ("300+") remain `needs_verification`, so the fourth slot is a qualitative
 * proof point rather than an invented number. Presented as a bordered
 * "specification sheet" strip (hairline divider rules + crop-frame corner
 * ticks, the site's existing drawing-sheet motif) rather than numbers
 * floating loose on the canvas — each column carries a rotating accent
 * colour and a small discipline motif borrowed from MEPSequence/
 * SystemShowcase's keyframes, and the accent rule under each figure draws
 * in on scroll so the row reads as alive rather than static type. Numeric
 * stats count up once when scrolled into view.
 */
const STATS = [
  { value: "25+", label: "Years of engineering experience", accent: "var(--color-brand-blue)", motif: "pulse" },
  { value: "2000", label: "Established in Nepal", accent: "var(--color-signal)", motif: "ping" },
  { value: "2013", label: "MEP operations commenced", accent: "var(--color-heritage)", motif: "signal" },
  {
    value: "In-house",
    label: "Multidisciplinary engineering and technical team",
    accent: "var(--color-blueprint)",
    motif: "airflow",
  },
] as const;

function StatMotif({ motif, accent }: { motif: (typeof STATS)[number]["motif"]; accent: string }) {
  if (motif === "pulse") {
    return <span className="h-2 w-2 rounded-full animate-energy-pulse" style={{ backgroundColor: accent }} />;
  }
  if (motif === "ping") {
    return <span className="h-2 w-2 rounded-full animate-detect-ping" style={{ backgroundColor: accent }} />;
  }
  if (motif === "signal") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <circle r={3} fill={accent} className="animate-signal-travel" />
      </svg>
    );
  }
  return (
    <span className="relative inline-block h-2 w-5 overflow-hidden">
      <span className="absolute left-0 top-0 h-[1.5px] w-3 animate-airflow" style={{ backgroundColor: accent }} />
    </span>
  );
}

export function ProofBar() {
  return (
    <section className="bg-site-texture py-20 sm:py-24">
      <Container>
        <div className="crop-frame relative border border-(--color-line-strong) text-(--color-signal)">
          <span className="crop-tick-tl" />
          <span className="crop-tick-br" />
          <Reveal className="grid grid-cols-2 divide-x divide-y divide-(--color-line) sm:grid-cols-4 sm:divide-y-0">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-6 py-10 text-center sm:px-8">
                <div className="flex items-center justify-center gap-2.5">
                  <StatMotif motif={stat.motif} accent={stat.accent} />
                  <p className="font-display text-4xl sm:text-5xl font-semibold leading-none text-(--color-ink)">
                    <AnimatedStat value={stat.value} />
                  </p>
                </div>
                <motion.span
                  aria-hidden="true"
                  className="mx-auto mt-5 block h-[2px] w-10 origin-center"
                  style={{ backgroundColor: stat.accent }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
                <p className="mx-auto mt-4 max-w-[11rem] font-sans text-label leading-relaxed text-(--color-steel)">
                  {stat.label}
                </p>
              </div>
            ))}
          </Reveal>
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
