"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { getServiceBySlug } from "@/content/services";

/**
 * The five disciplines the brief calls out explicitly (HVAC → Electrical →
 * Plumbing → Fire Protection → ELV) — a subset of the seven in services.ts;
 * BMS/systems-integration and Engineering/Advisory are deliberately left out
 * of this specific sequence, matching the brief's named order exactly.
 */
const SEQUENCE_SLUGS = [
  "hvac",
  "electrical",
  "plumbing-public-health",
  "fire-protection",
  "elv-security",
] as const;

const DISCIPLINES = SEQUENCE_SLUGS.map((slug) => getServiceBySlug(slug)).filter(
  (s): s is NonNullable<ReturnType<typeof getServiceBySlug>> => Boolean(s)
);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const connector = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function MEPSequence() {
  const reduceMotion = useReducedMotion();

  return (
    <Section tone="paper" className="overflow-hidden">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-amber)">
          Disciplines — 04
        </p>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-normal leading-[0.98] text-(--color-ink) text-balance">
          Five disciplines. One delivery.
        </h2>
      </div>

      <motion.ol
        role="list"
        initial={reduceMotion ? undefined : "hidden"}
        whileInView={reduceMotion ? undefined : "show"}
        viewport={{ once: true, margin: "-100px" }}
        variants={reduceMotion ? undefined : container}
        className="mt-16 flex items-start justify-start gap-0 overflow-x-auto pb-2 sm:justify-center sm:overflow-visible"
      >
        {DISCIPLINES.map((discipline, i) => (
          <li key={discipline.slug} className="flex shrink-0 items-start last:shrink">
            <motion.div
              variants={reduceMotion ? undefined : item}
              className="flex w-[132px] shrink-0 flex-col items-center text-center sm:w-[160px]"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full border font-mono text-sm tracking-wide text-(--color-ink)"
                style={{ borderColor: "var(--color-amber)", color: "var(--color-amber)" }}
              >
                {discipline.disciplineCode}
              </span>
              <p className="mt-4 font-display text-lg font-normal leading-tight text-(--color-ink)">
                {discipline.name}
              </p>
            </motion.div>

            {i < DISCIPLINES.length - 1 && (
              <motion.div
                variants={reduceMotion ? undefined : connector}
                className="mt-7 h-px w-10 shrink-0 origin-left sm:w-16"
                style={{ backgroundColor: "var(--color-amber)" }}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </motion.ol>

      <motion.p
        initial={reduceMotion ? undefined : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: DISCIPLINES.length * 0.18 + 0.2 }}
        className="mx-auto mt-14 max-w-md text-center font-mono text-xs tracking-[0.2em] uppercase text-(--color-ink)"
      >
        <span aria-hidden="true" className="mr-2" style={{ color: "var(--color-amber)" }}>
          —
        </span>
        One integrated engineering system
        <span aria-hidden="true" className="ml-2" style={{ color: "var(--color-amber)" }}>
          —
        </span>
      </motion.p>
    </Section>
  );
}
