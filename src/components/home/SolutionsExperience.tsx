"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Section 07 — Our Solutions. The homepage's visual centerpiece: one real
 * Airtech-scale building, five system layers converging into one
 * integrated solution. Per the premium-reconception brief's explicit "use
 * the actual supplied architectural building visual, make it large, no
 * fake wireframe" correction, this is a real building photograph (not an
 * abstract SVG cross-section) with system markers appearing within/around
 * it — "visible building + invisible systems = engineered environment."
 * The supplied ASSETS/BG atmosphere asset washes in behind the photo at low
 * opacity for continuity with the hero, which uses the same asset. Airtech
 * blue is the primary marker colour; gold is reserved for the final
 * convergence accent only. Click/tap-driven (not scroll-jacked) so the
 * visitor controls pace and it degrades cleanly with keyboard-only input
 * or reduced motion.
 */
const LAYERS = [
  { key: "climate", label: "Climate", detail: "HVAC / Chillers / VRF / Ventilation", slug: "hvac", top: "10%", side: "left" },
  { key: "power", label: "Power", detail: "Electrical / Distribution / Lighting", slug: "electrical", top: "30%", side: "right" },
  { key: "water", label: "Water", detail: "Plumbing / STP / WTP / Hot Water", slug: "plumbing-public-health", top: "50%", side: "left" },
  { key: "safety", label: "Safety", detail: "Fire Protection / Fire Alarm", slug: "fire-protection", top: "68%", side: "right" },
  { key: "intelligence", label: "Intelligence", detail: "ELV / CCTV / Access Control / Networking", slug: "elv-security", top: "86%", side: "left" },
] as const;

export function SolutionsExperience() {
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const total = LAYERS.length;
  const active = step > 0 ? LAYERS[step - 1] : null;
  const converged = step === total;

  return (
    <section className="relative bg-(--color-paper) py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <Image src="/images/backgrounds/architectural-light.webp" alt="" fill className="object-cover" />
      </div>

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
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[28px] sm:aspect-[4/5]">
            <Image
              src="/images/landmarks/ncell-iconic-building.jpg"
              alt="Ncell Iconic Building — an Airtech-engineered building"
              fill
              sizes="(min-width: 640px) 420px, 90vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink)/25 via-transparent to-transparent" />

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
                  <span className="rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] uppercase text-(--color-ink) shadow-sm backdrop-blur-sm">
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
