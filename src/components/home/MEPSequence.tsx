"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Section 04 — Engineering flow. HVAC → Electrical → Plumbing → Fire
 * Protection → ELV, converging into one integrated system. No rounded
 * boxes, no borders — a single typographic sequence with a thin spine that
 * fills in Airtech blue as the visitor scrolls past. Per the
 * premium-reconception brief's explicit "motion and visual transformation,
 * not just changing text colour" instruction, each discipline also gets its
 * own small motif — airflow drift for HVAC, a power pulse for Electrical, a
 * falling drop for Plumbing, a detection ping for Fire Protection, a
 * travelling signal for ELV — reusing the discipline keyframes already
 * defined in globals.css for SystemShowcase rather than inventing new ones.
 * Heading/support line and the whole sequence column are centered per the
 * brief's editorial-alignment rule; the spine list itself keeps its
 * internal left-to-right code+label rhythm within that centered column.
 */
const SYSTEMS = [
  { code: "M", label: "HVAC", motif: "airflow" },
  { code: "E", label: "Electrical", motif: "power" },
  { code: "PHE", label: "Plumbing", motif: "water" },
  { code: "FP", label: "Fire Protection", motif: "fire" },
  { code: "ELV", label: "ELV", motif: "signal" },
] as const;

function DisciplineMotif({ motif, active }: { motif: (typeof SYSTEMS)[number]["motif"]; active: boolean }) {
  if (!active) return <span className="inline-block h-6 w-6" aria-hidden="true" />;

  if (motif === "airflow") {
    return (
      <span className="relative inline-block h-6 w-6 overflow-hidden" aria-hidden="true">
        <span className="absolute left-0 top-1.5 h-[1.5px] w-3 bg-(--color-brand-blue) animate-airflow" />
        <span className="absolute left-0 top-3 h-[1.5px] w-3 bg-(--color-brand-blue) animate-airflow [animation-delay:0.4s]" />
      </span>
    );
  }
  if (motif === "power") {
    return (
      <span className="relative inline-flex h-6 w-6 items-center justify-center" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-(--color-brand-blue) animate-energy-pulse" />
      </span>
    );
  }
  if (motif === "water") {
    return (
      <span className="relative inline-block h-6 w-6 overflow-hidden" aria-hidden="true">
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-(--color-brand-blue) animate-flow-drop" />
      </span>
    );
  }
  if (motif === "fire") {
    return (
      <span className="relative inline-flex h-6 w-6 items-center justify-center" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-(--color-signal-soft) animate-detect-ping" />
      </span>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <circle r={3} fill="var(--color-brand-blue)" className="animate-signal-travel" />
    </svg>
  );
}

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
    <section ref={sectionRef} className="py-12 sm:py-14 lg:py-16">
      <Container className="max-w-3xl text-center">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
          Five disciplines. One delivery.
        </p>
        <p className="mx-auto mt-4 max-w-md text-body-l text-(--color-steel)">
          Integrated systems, engineered as one — not an air-conditioning
          company that also handles the rest.
        </p>

        <div className="relative mx-auto mt-10 inline-block pl-8 text-left sm:pl-10">
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
                      isActive ? "text-(--color-brand-blue)" : "text-(--color-steel)"
                    }`}
                  >
                    {system.label}
                  </span>
                  <DisciplineMotif motif={system.motif} active={isActive} />
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

        <div className="relative mt-10">
          <span aria-hidden="true" className="mx-auto mb-5 block h-px w-14 bg-(--color-signal-soft)" />
          <p className="font-display text-display-m font-normal text-(--color-ink) text-balance">
            One integrated engineering solution.
          </p>
        </div>
      </Container>
    </section>
  );
}
