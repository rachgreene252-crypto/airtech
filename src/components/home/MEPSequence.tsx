"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Section 04 — MEP system sequence. HVAC → Electrical → Plumbing → Fire
 * Protection → ELV, converging into one integrated system. A compact
 * horizontal strip in the brief's "muted champagne / brushed brass"
 * gold (--color-signal-soft, already the site's dark-surface accent
 * token — see globals.css), not a generic process-timeline card grid.
 * Items activate sequentially as the strip scrolls into view.
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
  const stepDelay = 0.14;

  return (
    <section className="border-t border-(--color-ink-soft) bg-(--color-ink) py-20 sm:py-24 lg:py-28 overflow-hidden">
      <Container>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-(--color-signal-soft)"
        >
          Five disciplines — one delivery
        </motion.p>

        <div className="mt-12 flex flex-col gap-0 lg:flex-row lg:items-center">
          {SYSTEMS.map((system, i) => (
            <div key={system.code} className="flex items-center lg:flex-1">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * stepDelay, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-baseline gap-3 py-4 lg:flex-col lg:items-start lg:gap-2 lg:py-0"
              >
                <span className="font-mono text-xs text-(--color-signal-soft)/70">
                  {system.code}
                </span>
                <span className="font-display text-2xl sm:text-3xl lg:text-2xl xl:text-3xl font-semibold tracking-tight text-(--color-paper)">
                  {system.label}
                </span>
              </motion.div>

              {i < SYSTEMS.length - 1 && (
                <motion.div
                  aria-hidden="true"
                  className="mx-4 hidden h-px flex-1 origin-left bg-(--color-signal-soft)/50 lg:block"
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: i * stepDelay + 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: SYSTEMS.length * stepDelay + 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 border-t border-(--color-ink-soft) pt-8"
        >
          <p className="font-mono text-sm sm:text-base tracking-[0.1em] uppercase text-(--color-signal-soft)">
            One integrated engineering solution
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
