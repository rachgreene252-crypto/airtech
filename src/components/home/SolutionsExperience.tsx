"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Section 07 — Our Solutions. The homepage's visual centerpiece: an
 * animated blueprint-line building, five system layers converging into one
 * integrated solution — "visible building + invisible systems = engineered
 * environment." The building is an original line-drawing illustration
 * (stepped/tiered massing nodding to Kathmandu Valley roof silhouettes,
 * a Himalayan skyline behind it) rather than a stock or client project
 * photograph, drawn in on scroll with the site's existing blueprint stroke
 * language — deliberately not a literal pagoda/temple cliché. Airtech blue
 * is the primary marker colour; gold is reserved for the final convergence
 * accent only. Click/tap-driven (not scroll-jacked) so the visitor controls
 * pace and it degrades cleanly with keyboard-only input or reduced motion.
 */
const LAYERS = [
  { key: "climate", label: "Climate", detail: "HVAC / Chillers / VRF / Ventilation", slug: "hvac", top: "10%", side: "left" },
  { key: "power", label: "Power", detail: "Electrical / Distribution / Lighting", slug: "electrical", top: "30%", side: "right" },
  { key: "water", label: "Water", detail: "Plumbing / STP / WTP / Hot Water", slug: "plumbing-public-health", top: "50%", side: "left" },
  { key: "safety", label: "Safety", detail: "Fire Protection / Fire Alarm", slug: "fire-protection", top: "68%", side: "right" },
  { key: "intelligence", label: "Intelligence", detail: "ELV / CCTV / Access Control / Networking", slug: "elv-security", top: "86%", side: "left" },
] as const;

/**
 * Original blueprint-line illustration: a stepped/terraced tower against a
 * Himalayan skyline, low-rise streetscape at its base. The terraced massing
 * is a deliberate, abstracted nod to Kathmandu Valley roof silhouettes
 * without drawing a literal pagoda/temple — "Nepalese engineering identity
 * without clichés" per the site's creative brief. Strokes draw themselves
 * in on scroll (SVG pathLength 0 → 1); everything renders instantly under
 * prefers-reduced-motion.
 */
function BuildingIllustration({ reduceMotion }: { reduceMotion: boolean | null }) {
  const draw = (delay: number) => ({
    initial: reduceMotion ? false : { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-60px" },
    transition: { pathLength: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] as const }, opacity: { duration: 0.3, delay } },
  });

  return (
    <svg
      viewBox="0 0 300 400"
      className="h-full w-full"
      role="img"
      aria-label="Illustrated section of a building integrating climate, power, water, safety and intelligence systems, with the Kathmandu Valley skyline behind it"
    >
      {/* Himalayan skyline */}
      <motion.path
        {...draw(0)}
        d="M0 138 L28 110 L52 132 L78 84 L104 128 L134 96 L162 132 L190 100 L220 136 L246 112 L272 134 L300 118"
        fill="none"
        stroke="var(--color-blueprint-soft)"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Low-rise streetscape flanking the tower */}
      <motion.path
        {...draw(0.15)}
        d="M18 380 V320 H54 V380 M18 340 H54 M18 358 H54"
        fill="none"
        stroke="var(--color-line-strong)"
        strokeWidth={1}
      />
      <motion.path
        {...draw(0.2)}
        d="M246 380 V300 H282 V380 M246 324 H282 M246 348 H282 M246 300 H282"
        fill="none"
        stroke="var(--color-line-strong)"
        strokeWidth={1}
      />

      {/* Ground line */}
      <motion.path {...draw(0.05)} d="M0 380 H300" fill="none" stroke="var(--color-line-strong)" strokeWidth={1.25} />

      {/* Tower body, terraced top (three set-backs) */}
      <motion.path
        {...draw(0.3)}
        d="M96 380 V168 H132 V132 H168 V96 H204 V380 Z"
        fill="none"
        stroke="var(--color-brand-blue)"
        strokeWidth={1.75}
        strokeLinejoin="round"
      />

      {/* Terrace roof-edge accents (gold = precision, per palette) */}
      <motion.path {...draw(0.55)} d="M96 168 H132" stroke="var(--color-signal-soft)" strokeWidth={2.5} />
      <motion.path {...draw(0.62)} d="M132 132 H168" stroke="var(--color-signal-soft)" strokeWidth={2.5} />
      <motion.path {...draw(0.69)} d="M168 96 H204" stroke="var(--color-signal-soft)" strokeWidth={2.5} />

      {/* Window / floor strips — kept inset within each tier's own walls */}
      {[350, 322, 294, 266, 238, 210, 182].map((y, i) => (
        <motion.path
          key={`base-${y}`}
          {...draw(0.35 + i * 0.03)}
          d={`M104 ${y} H196`}
          stroke="var(--color-line-strong)"
          strokeWidth={0.75}
        />
      ))}
      {[150].map((y, i) => (
        <motion.path
          key={`mid-${y}`}
          {...draw(0.6 + i * 0.03)}
          d={`M140 ${y} H196`}
          stroke="var(--color-line-strong)"
          strokeWidth={0.75}
        />
      ))}
      {[114].map((y, i) => (
        <motion.path
          key={`top-${y}`}
          {...draw(0.7 + i * 0.03)}
          d={`M176 ${y} H196`}
          stroke="var(--color-line-strong)"
          strokeWidth={0.75}
        />
      ))}

      {/* Spire + a pulsing light, the one non-technical "alive" flourish */}
      <motion.path {...draw(0.8)} d="M186 96 V72" stroke="var(--color-brand-blue)" strokeWidth={1.5} />
      <motion.circle
        cx={186}
        cy={68}
        r={3}
        fill="var(--color-signal-soft)"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.95, duration: 0.3 }}
        className={reduceMotion ? undefined : "animate-energy-pulse"}
      />
    </svg>
  );
}

export function SolutionsExperience() {
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const total = LAYERS.length;
  const active = step > 0 ? LAYERS[step - 1] : null;
  const converged = step === total;

  return (
    <section className="relative bg-site-texture py-20 sm:py-28 lg:py-32 overflow-hidden">
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-brand-blue)">
            Our Solutions
          </p>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.98] text-(--color-ink) text-balance">
            One building. Many systems.
            <br />
            One engineering partner.
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-(--color-steel)">
            Every building has a different set of demands. Airtech brings the disciplines
            together to create environments that are comfortable, connected, protected and
            operational.
          </p>
          <p className="mt-5 font-mono text-[11px] tracking-[0.14em] uppercase text-(--color-brand-blue)/80">
            Visible building + invisible systems = engineered environment
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="crop-frame relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[28px] border border-(--color-line-strong) bg-(--color-paper-raised) text-(--color-signal) sm:aspect-[4/5]">
            <span className="crop-tick-tl" />
            <span className="crop-tick-br" />
            <div className="absolute inset-0 p-8">
              <BuildingIllustration reduceMotion={reduceMotion} />
            </div>

            {LAYERS.map((layer, i) => {
              const isActive = step > i;
              return (
                <motion.div
                  key={layer.key}
                  aria-hidden="true"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.7 }}
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute flex items-center gap-2"
                  style={{
                    top: layer.top,
                    [layer.side]: "6%",
                    flexDirection: layer.side === "right" ? "row-reverse" : "row",
                  }}
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-(--color-brand-blue-soft) animate-energy-pulse" />
                  <span
                    className={`h-px shrink-0 bg-(--color-brand-blue-soft) ${layer.side === "right" ? "w-8" : "w-8"}`}
                  />
                  <span className="rounded-full border border-(--color-line-strong) bg-(--color-paper) px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] uppercase text-(--color-ink)">
                    {layer.label}
                  </span>
                </motion.div>
              );
            })}

            {converged && (
              <motion.div
                aria-hidden="true"
                initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="h-4 w-4 rounded-full bg-(--color-amber) shadow-[0_0_0_10px_color-mix(in_srgb,var(--color-amber)_20%,transparent)]" />
              </motion.div>
            )}
          </div>

          <ol className="relative mt-10 flex flex-wrap justify-center gap-2" role="list">
            <li>
              <button
                type="button"
                onClick={() => setStep(0)}
                aria-current={step === 0}
                className={`min-h-11 px-4 py-2 font-mono text-[11px] tracking-[0.1em] uppercase rounded-full border transition-colors ${
                  step === 0
                    ? "border-(--color-brand-blue) text-(--color-brand-blue) bg-(--color-brand-blue-tint)"
                    : "border-(--color-line-strong) text-(--color-steel) hover:border-(--color-brand-blue)"
                }`}
              >
                Building
              </button>
            </li>
            {LAYERS.map((layer, i) => (
              <li key={layer.key}>
                <button
                  type="button"
                  onClick={() => setStep(i + 1)}
                  aria-current={step === i + 1}
                  className={`min-h-11 px-4 py-2 font-mono text-[11px] tracking-[0.1em] uppercase rounded-full border transition-colors ${
                    step >= i + 1
                      ? "border-(--color-brand-blue) text-(--color-brand-blue) bg-(--color-brand-blue-tint)"
                      : "border-(--color-line-strong) text-(--color-steel) hover:border-(--color-brand-blue)"
                  }`}
                >
                  {layer.label}
                </button>
              </li>
            ))}
          </ol>

          <div className="relative mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="font-mono text-xs tracking-[0.1em] uppercase text-(--color-steel) hover:text-(--color-brand-blue) disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(total, s + 1))}
              disabled={step === total}
              className="font-mono text-xs tracking-[0.1em] uppercase text-(--color-steel) hover:text-(--color-brand-blue) disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Next →
            </button>
          </div>

          <div className="relative mx-auto mt-8 max-w-lg text-center">
            <AnimatePresence mode="wait">
              {active && !converged && (
                <motion.div
                  key={active.key}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display text-xl font-semibold text-(--color-ink)">{active.label}</h3>
                  <p className="mt-1.5 text-sm text-(--color-steel)">{active.detail}</p>
                  <Link
                    href={`/expertise/${active.slug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-brand-blue) hover:text-(--color-ink) transition-colors"
                  >
                    Explore {active.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </motion.div>
              )}
              {converged && (
                <motion.p
                  key="converged"
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-mono text-sm sm:text-base tracking-[0.1em] uppercase text-(--color-ink)"
                >
                  One integrated engineering solution
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
