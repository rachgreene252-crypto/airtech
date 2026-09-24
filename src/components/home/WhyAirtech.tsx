"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Why Airtech" — replaced "Built for Nepal" 2026-09-24 ("it narrows down
 * the company ... something eye catching that shows the company to be the
 * best"). Same interaction model as before (select a reason, its panel
 * updates) but the map is gone: the visual is now a large blue proof panel
 * whose headline figure swaps per reason.
 *
 * Every figure and name here is source-backed: 6 = the live disciplines in
 * content/services.ts; est. 2000 = siteSettings.establishedYear; project
 * and healthcare counts are passed in from content/projects.ts; named
 * buildings all have published project entries. The Nepal seismic /
 * monsoon / altitude context survives as proof of engineering depth rather
 * than as the section's frame.
 */
type Reason = {
  label: string;
  figure: string;
  caption: string;
  body: string;
};

export function WhyAirtech({
  projectCount,
  healthcareCount,
}: {
  projectCount: number;
  healthcareCount: number;
}) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const reasons: Reason[] = [
    {
      label: "One team, every system",
      figure: "6",
      caption: "engineering disciplines under one roof",
      body: "HVAC, electrical, plumbing, fire protection, ELV and BMS, designed, installed and commissioned by one team. No gaps between contractors, one point of accountability.",
    },
    {
      label: "Chosen by global brands",
      figure: `${Math.floor(projectCount / 5) * 5}+`,
      caption: "landmark projects in our portfolio",
      body: "Hyatt Regency, Fairfield by Marriott, Hilton, The Soaltee, Dusit Princess: the brands with the strictest engineering standards in hospitality trust Airtech with their buildings.",
    },
    {
      label: "Where failure isn't an option",
      figure: `${healthcareCount}`,
      caption: "hospitals & medical institutions served",
      body: "Hospitals, the Parliament Building, the British Embassy: critical environments where systems have to run every hour of every day, and do.",
    },
    {
      label: "25 years of hard-won expertise",
      figure: "25+",
      caption: "years of engineering since 2000",
      body: "Seismic zones, monsoon humidity, high altitude: we engineer for some of the most demanding conditions anywhere, and it shows in every system we hand over.",
    },
  ];

  const current = reasons[active];

  return (
    <section className="relative overflow-hidden bg-site-texture py-14 sm:py-16 lg:py-20">
      <Container className="relative">
        <Reveal>
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
              <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue)" />
              Why Airtech
            </p>
            <h2 className="mt-6 font-display text-display-l font-semibold leading-[1.04] tracking-[-0.015em] text-balance text-(--color-ink)">
              The engineering behind{" "}
              <span className="text-(--color-brand-blue-vivid)">landmark buildings.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-body-l leading-relaxed text-(--color-steel)">
              When a building can&apos;t afford a system to fail, its owners call Airtech.
              Twenty-five years, six disciplines, one accountable team.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:items-stretch">
          {/* Proof panel — the figure swaps with the selected reason. */}
          <div className="relative isolate flex min-h-[20rem] flex-col justify-between overflow-hidden rounded-[6px] bg-gradient-to-br from-(--color-brand-blue-vivid) via-(--color-brand-blue) to-(--color-brand-blue-hover) p-8 text-white sm:min-h-[26rem] sm:p-10">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:40px_40px]"
            />
            <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white/75">
              {String(active + 1).padStart(2, "0")} / {String(reasons.length).padStart(2, "0")}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.label}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                aria-live="polite"
              >
                <p className="font-display text-[clamp(6rem,16vw,11rem)] font-semibold leading-[0.85] tracking-[-0.04em]">
                  {current.figure}
                </p>
                <p className="mt-4 max-w-xs text-body-l font-medium text-white/90">{current.caption}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="border-t border-(--color-line)">
            {reasons.map((reason, i) => {
              const isActive = active === i;
              return (
                <button
                  key={reason.label}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  className="block w-full border-b border-(--color-line) py-6 text-left transition-colors hover:bg-(--color-paper-raised)"
                >
                  <span className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="font-mono text-sm transition-colors"
                      style={{ color: isActive ? "var(--color-brand-blue-vivid)" : "var(--color-line-strong)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-display text-2xl font-semibold leading-tight transition-colors"
                      style={{ color: isActive ? "var(--color-brand-blue)" : "var(--color-ink)" }}
                    >
                      {reason.label}
                    </span>
                  </span>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 max-w-xl pl-9 text-body leading-relaxed text-(--color-steel)">
                          {reason.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
