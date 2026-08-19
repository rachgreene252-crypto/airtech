"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { industries, getProjectsByIndustry } from "@/content";

/**
 * Selecting an industry changes the whole visual scene, rather than
 * presenting ten identical cards. Where real project photography exists for
 * a sector (healthcare, industrial, telecom, corporate/commercial — the four
 * sourced project photos), it becomes the backdrop; where it doesn't, a
 * technical line backdrop is used instead of stock photography, per the
 * realism hierarchy (real photo > real equipment photo > technical
 * visualization > abstract) rather than silently dropping the sector.
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
    <Section tone="ink" border={false} className="overflow-hidden">
      <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal-soft)">
        Industries — 05
      </p>
      <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.98] text-(--color-paper) text-balance max-w-2xl">
        Built around what each sector actually needs.
      </h2>

      <nav className="mt-10 flex flex-wrap gap-2" aria-label="Select an industry">
        {industries.map((ind, i) => (
          <button
            key={ind.slug}
            type="button"
            onClick={() => setActive(i)}
            aria-current={active === i}
            className={`px-3 py-2 font-mono text-[11px] tracking-[0.08em] uppercase border transition-colors ${
              active === i
                ? "border-(--color-signal-soft) text-(--color-paper)"
                : "border-(--color-ink-soft) text-(--color-steel-soft) hover:border-(--color-steel-soft)"
            }`}
          >
            {ind.name}
          </button>
        ))}
      </nav>

      <div className="relative mt-10 min-h-[520px] overflow-hidden border border-(--color-ink-soft)">
        <AnimatePresence mode="wait">
          <motion.div
            key={industry.slug}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {photo ? (
              <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-cover" />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: "var(--color-ink)",
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(246,243,236,0.05) 0px, rgba(246,243,236,0.05) 1px, transparent 1px, transparent 16px)",
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/55 to-(--color-ink)/20" />

            <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-10 lg:p-14">
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-(--color-paper) text-balance max-w-2xl">
                {industry.name}
              </h3>
              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-(--color-paper)/85">
                {industry.overview}
              </p>

              <div className="mt-8 grid gap-8 border-t border-(--color-paper)/20 pt-6 sm:grid-cols-3">
                {industry.operationalChallenges.length > 0 && (
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel-soft)">
                      Engineering Challenge
                    </p>
                    <p className="mt-2 text-sm text-(--color-paper)/80 leading-relaxed">
                      {industry.operationalChallenges[0]}
                    </p>
                  </div>
                )}
                {industry.airtechCapabilities.length > 0 && (
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel-soft)">
                      Airtech Capability
                    </p>
                    <p className="mt-2 text-sm text-(--color-paper)/80 leading-relaxed">
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
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8">
        <Link href="/industries" className="text-sm font-medium text-(--color-signal-soft) hover:underline">
          View all industries →
        </Link>
      </div>
    </Section>
  );
}
