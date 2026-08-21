"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { TechnicalFrame } from "@/components/ui/TechnicalFrame";
import { industries, getProjectsByIndustry } from "@/content";

/**
 * Selecting an industry changes the whole visual scene, rather than
 * presenting ten identical cards. Where real project photography exists for
 * a sector (healthcare, industrial, telecom, corporate/commercial — the four
 * sourced project photos), it becomes the frame's image; where it doesn't,
 * `TechnicalFrame` renders its honest technical-line placeholder instead of
 * stock photography, per the realism hierarchy (real photo > real equipment
 * photo > technical visualization > abstract) rather than silently dropping
 * the sector.
 */
const INDUSTRY_PHOTOS: Partial<Record<string, { src: string; alt: string }>> = {
  healthcare: { src: "/images/projects/nepal-mediciti-hospital.jpg", alt: "Nepal Mediciti hospital, Lalitpur" },
  industrial: { src: "/images/projects/laxmi-motors-kd-plant.jpg", alt: "Laxmi Motors KD Plant, Parasi" },
  "telecom-data-centres": { src: "/images/projects/ncell-iconic-building.jpg", alt: "Ncell Iconic Building, Kathmandu" },
  "corporate-commercial": { src: "/images/projects/caan-office-building.jpg", alt: "CAAN Office Building, Kathmandu" },
};

export function IndustryJourney() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const industry = industries[active];
  const photo = INDUSTRY_PHOTOS[industry.slug];
  const project = getProjectsByIndustry(industry.slug)[0];

  return (
    <Section tone="tint" border={false} className="overflow-hidden">
      <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal-soft)">
        Industries — 05
      </p>
      <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[0.98] text-(--color-ink) text-balance max-w-2xl">
        Built around what each sector actually needs.
      </h2>

      <nav className="mt-10 flex flex-wrap gap-2" aria-label="Select an industry">
        {industries.map((ind, i) => (
          <button
            key={ind.slug}
            type="button"
            onClick={() => setActive(i)}
            aria-current={active === i}
            className={`min-h-11 px-3 py-2 font-mono text-[11px] tracking-[0.08em] uppercase border transition-colors ${
              active === i
                ? "border-(--color-signal) text-(--color-ink)"
                : "border-(--color-line-strong) text-(--color-ink-soft) hover:border-(--color-signal-soft)"
            }`}
          >
            {ind.name}
          </button>
        ))}
      </nav>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={industry.slug}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TechnicalFrame image={photo} label={industry.name} aspect="aspect-[4/3]" />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={industry.slug}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-(--color-ink) text-balance">
              {industry.name}
            </h3>
            <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-(--color-ink-soft)">
              {industry.overview}
            </p>

            <div className="mt-8 grid gap-6 border-t border-(--color-line-strong) pt-6 sm:grid-cols-3">
              {industry.operationalChallenges.length > 0 && (
                <div>
                  <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel-soft)">
                    Engineering Challenge
                  </p>
                  <p className="mt-2 text-sm text-(--color-ink-soft) leading-relaxed">
                    {industry.operationalChallenges[0]}
                  </p>
                </div>
              )}
              {industry.airtechCapabilities.length > 0 && (
                <div>
                  <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel-soft)">
                    Airtech Capability
                  </p>
                  <p className="mt-2 text-sm text-(--color-ink-soft) leading-relaxed">
                    {industry.airtechCapabilities[0]}
                  </p>
                </div>
              )}
              {project && (
                <div>
                  <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel-soft)">
                    Relevant Project
                  </p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-signal-soft) hover:gap-2.5 transition-all"
                  >
                    {project.name}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10">
        <Link href="/industries" className="text-sm font-medium text-(--color-signal-soft) hover:underline">
          View all industries →
        </Link>
      </div>
    </Section>
  );
}
