"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Section 04 — Engineering flow. HVAC → Electrical → Plumbing → Fire
 * Protection → ELV, converging into one integrated system. Rebuilt per the
 * "no UI cards" correction: no rounded boxes, no borders — a single
 * typographic sequence with a thin spine that fills in Airtech blue as the
 * visitor scrolls past, each discipline switching from charcoal to blue the
 * moment the spine reaches it. Gold appears only as the closing statement's
 * hairline accent.
 */
const SYSTEMS = [
  { code: "M", label: "HVAC" },
  { code: "E", label: "Electrical" },
  { code: "PHE", label: "Plumbing" },
  { code: "FP", label: "Fire Protection" },
  { code: "ELV", label: "ELV" },
] as const;

export function MEPSequence() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.4"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.max(0, Math.min(SYSTEMS.length, Math.ceil(v * SYSTEMS.length))));
  });

  const displayActive = reduceMotion ? SYSTEMS.length : active;

  return (
    <section ref={sectionRef} className="bg-(--color-paper) py-24 sm:py-32 lg:py-40">
      <Container className="max-w-3xl">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-(--color-brand-blue)">
          Five disciplines. One delivery.
        </p>
        <p className="mt-4 max-w-md text-base text-(--color-steel)">
          Integrated systems, engineered as one.
        </p>

        <div className="relative mt-16 pl-8 sm:pl-10">
          <div
            aria-hidden="true"
            className="absolute left-0 top-2 bottom-2 w-px bg-(--color-line-strong)"
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-2 w-px origin-top bg-(--color-brand-blue)"
            style={{ height: reduceMotion ? "100%" : `${(displayActive / SYSTEMS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />

          {SYSTEMS.map((system, i) => {
            const isActive = displayActive > i;
            return (
              <div key={system.code} className={i > 0 ? "mt-3" : undefined}>
                <div className="flex items-baseline gap-4">
                  <span
                    className={`font-mono text-[11px] transition-colors duration-300 ${
                      isActive ? "text-(--color-brand-blue)" : "text-(--color-steel-soft)"
                    }`}
                  >
                    {system.code}
                  </span>
                  <span
                    className={`font-display text-4xl sm:text-5xl font-semibold tracking-tight transition-colors duration-300 ${
                      isActive ? "text-(--color-brand-blue)" : "text-(--color-ink)/25"
                    }`}
                  >
                    {system.label}
                  </span>
                </div>
                {i < SYSTEMS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className={`ml-[3.1rem] mt-3 h-px w-10 transition-colors duration-300 ${
                      isActive ? "bg-(--color-signal-soft)" : "bg-(--color-line-strong)"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="relative mt-20 pl-8 sm:pl-10">
          <span aria-hidden="true" className="mb-5 block h-px w-14 bg-(--color-signal-soft)" />
          <p className="font-display text-2xl sm:text-3xl font-semibold text-(--color-ink) text-balance">
            One integrated engineering solution.
          </p>
        </div>
      </Container>
    </section>
  );
}
