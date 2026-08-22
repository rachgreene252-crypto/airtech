"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Section 04 — MEP system sequence. HVAC → Electrical → Plumbing → Fire
 * Protection → ELV, converging into one integrated system. Per the
 * 2026-08-22 visual-correction brief: light background (the dark-ink
 * treatment this replaced read as a generic dark-tech panel), Airtech blue
 * as the primary active/connector color, gold reserved as a fine accent on
 * the final convergence line only. Each discipline sits in a soft framed
 * zone rather than a plain label, and gets a subtle glow when active.
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
    <section className="border-t border-(--color-line) bg-(--color-paper) py-20 sm:py-24 lg:py-28 overflow-hidden">
      <Container>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-(--color-brand-blue)"
        >
          Five disciplines — one delivery
        </motion.p>

        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-0">
          {SYSTEMS.map((system, i) => (
            <div key={system.code} className="flex items-center lg:flex-1">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * stepDelay, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-1 items-center gap-3 rounded-2xl border border-(--color-line-strong) bg-(--color-paper-raised) px-5 py-4 shadow-[0_1px_2px_rgba(37,38,41,0.04)] lg:flex-col lg:items-start lg:gap-1.5"
                style={{
                  boxShadow:
                    i === SYSTEMS.length - 1
                      ? "0 0 0 1px var(--color-brand-blue), 0 8px 24px -8px color-mix(in srgb, var(--color-brand-blue) 35%, transparent)"
                      : undefined,
                }}
              >
                <span className="font-mono text-[11px] text-(--color-brand-blue)/70">
                  {system.code}
                </span>
                <span className="font-display text-xl sm:text-2xl lg:text-xl xl:text-2xl font-semibold tracking-tight text-(--color-ink)">
                  {system.label}
                </span>
              </motion.div>

              {i < SYSTEMS.length - 1 && (
                <motion.div
                  aria-hidden="true"
                  className="mx-3 hidden h-px flex-1 origin-left bg-gradient-to-r from-(--color-brand-blue) to-(--color-signal-soft) lg:block"
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
          className="relative mt-14 overflow-hidden rounded-2xl border border-(--color-line-strong) bg-(--color-paper-raised) px-6 py-6 text-center sm:px-8"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 0%, color-mix(in srgb, var(--color-signal-soft) 18%, transparent), transparent)",
            }}
          />
          <p className="relative font-mono text-sm sm:text-base tracking-[0.1em] uppercase text-(--color-ink)">
            One integrated engineering solution
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
