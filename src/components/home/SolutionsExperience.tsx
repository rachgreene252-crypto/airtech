"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Section 07 — Our Solutions. The homepage's visual centerpiece: one
 * building, five system layers converging into one integrated solution.
 * Click/tap-driven (not scroll-jacked) so the visitor controls pace and it
 * degrades cleanly with keyboard-only input or reduced motion — the same
 * proven interaction model as the systems-reveal diagram elsewhere in the
 * codebase, rebuilt here at centerpiece scale with the brief's exact
 * CLIMATE / POWER / WATER / SAFETY / INTELLIGENCE layer vocabulary.
 */
const LAYERS = [
  { key: "climate", label: "Climate", detail: "HVAC / Chillers / VRF / Ventilation", slug: "hvac" },
  { key: "power", label: "Power", detail: "Electrical / Distribution / Lighting", slug: "electrical" },
  { key: "water", label: "Water", detail: "Plumbing / STP / WTP / Hot Water", slug: "plumbing-public-health" },
  { key: "safety", label: "Safety", detail: "Fire Protection / Fire Alarm", slug: "fire-protection" },
  { key: "intelligence", label: "Intelligence", detail: "ELV / CCTV / Access Control / Networking", slug: "elv-security" },
] as const;

const BUILDING_TOP = 44;
const BUILDING_BOTTOM = 440;
const BUILDING_LEFT = 150;
const BUILDING_RIGHT = 490;
const FLOORS = 6;
const FLOOR_YS = Array.from({ length: FLOORS - 1 }, (_, i) => BUILDING_TOP + ((i + 1) * (BUILDING_BOTTOM - BUILDING_TOP)) / FLOORS);
const FLOOR_MIDS = Array.from({ length: FLOORS }, (_, i) => BUILDING_TOP + (i + 0.5) * ((BUILDING_BOTTOM - BUILDING_TOP) / FLOORS));

export function SolutionsExperience() {
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const total = LAYERS.length;
  const active = step > 0 ? LAYERS[step - 1] : null;
  const converged = step === total;

  return (
    <section className="border-t border-(--color-ink-soft) bg-(--color-ink) py-20 sm:py-28 lg:py-32 overflow-hidden">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal-soft)">
            Our Solutions
          </p>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.98] text-(--color-paper) text-balance">
            One building. Many systems.
            <br />
            One engineering partner.
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-(--color-steel-soft)">
            Every building has a different set of demands. Airtech brings the disciplines
            together to create environments that are comfortable, connected, protected and
            operational.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <svg
            viewBox="0 0 640 480"
            className="w-full h-auto"
            role="img"
            aria-label={`Building cross-section showing ${step} of ${total} coordinated engineering systems`}
          >
            <defs>
              <linearGradient id="solutions-glass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-signal-tint)" stopOpacity={0.18} />
                <stop offset="100%" stopColor="var(--color-signal-tint)" stopOpacity={0.03} />
              </linearGradient>
              <radialGradient id="solutions-shadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="black" stopOpacity={0.45} />
                <stop offset="100%" stopColor="black" stopOpacity={0} />
              </radialGradient>
            </defs>

            <ellipse cx={320} cy={BUILDING_BOTTOM + 4} rx={210} ry={14} fill="url(#solutions-shadow)" />
            <line x1={110} y1={BUILDING_BOTTOM} x2={530} y2={BUILDING_BOTTOM} stroke="var(--color-steel)" strokeWidth={1.5} />

            <rect
              x={BUILDING_LEFT}
              y={BUILDING_TOP}
              width={BUILDING_RIGHT - BUILDING_LEFT}
              height={BUILDING_BOTTOM - BUILDING_TOP}
              fill="url(#solutions-glass)"
              stroke="var(--color-steel-soft)"
              strokeWidth={1.25}
            />
            <line x1={BUILDING_LEFT - 6} y1={BUILDING_TOP} x2={BUILDING_RIGHT + 6} y2={BUILDING_TOP} stroke="var(--color-steel-soft)" strokeWidth={2.5} />
            {FLOOR_YS.map((y) => (
              <line key={y} x1={BUILDING_LEFT} y1={y} x2={BUILDING_RIGHT} y2={y} stroke="var(--color-paper)" strokeWidth={1} opacity={0.12} />
            ))}

            {LAYERS.map((layer, i) => (
              <LayerTrace key={layer.key} layerKey={layer.key} active={step > i} reduceMotion={!!reduceMotion} />
            ))}

            {converged && (
              <motion.circle
                cx={320}
                cy={242}
                r={7}
                fill="var(--color-amber)"
                initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />
            )}
          </svg>

          <ol className="mt-10 flex flex-wrap justify-center gap-2" role="list">
            <li>
              <button
                type="button"
                onClick={() => setStep(0)}
                aria-current={step === 0}
                className={`min-h-11 px-4 py-2 font-mono text-[11px] tracking-[0.1em] uppercase border transition-colors ${
                  step === 0
                    ? "border-(--color-signal-soft) text-(--color-paper)"
                    : "border-(--color-ink-soft) text-(--color-steel-soft) hover:border-(--color-steel-soft)"
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
                  className={`min-h-11 px-4 py-2 font-mono text-[11px] tracking-[0.1em] uppercase border transition-colors ${
                    step >= i + 1
                      ? "border-(--color-signal-soft) text-(--color-paper)"
                      : "border-(--color-ink-soft) text-(--color-steel-soft) hover:border-(--color-steel-soft)"
                  }`}
                >
                  {layer.label}
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="font-mono text-xs tracking-[0.1em] uppercase text-(--color-steel-soft) hover:text-(--color-paper) disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(total, s + 1))}
              disabled={step === total}
              className="font-mono text-xs tracking-[0.1em] uppercase text-(--color-steel-soft) hover:text-(--color-paper) disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Next →
            </button>
          </div>

          <div className="mx-auto mt-8 max-w-lg text-center">
            <AnimatePresence mode="wait">
              {active && !converged && (
                <motion.div
                  key={active.key}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display text-xl font-semibold text-(--color-paper)">{active.label}</h3>
                  <p className="mt-1.5 text-sm text-(--color-steel-soft)">{active.detail}</p>
                  <Link
                    href={`/expertise/${active.slug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-signal-soft) hover:text-(--color-paper) transition-colors"
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
                  className="font-mono text-sm sm:text-base tracking-[0.1em] uppercase text-(--color-signal-soft)"
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

function LayerTrace({
  layerKey,
  active,
  reduceMotion,
}: {
  layerKey: (typeof LAYERS)[number]["key"];
  active: boolean;
  reduceMotion: boolean;
}) {
  const pathAnim = reduceMotion
    ? { pathLength: active ? 1 : 0 }
    : { pathLength: active ? 1 : 0, opacity: active ? 1 : 0 };
  const transition = { duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] as const };
  const stroke = "var(--color-signal-soft)";

  if (layerKey === "climate") {
    const x1 = 230;
    const x2 = 410;
    return (
      <g stroke={stroke} strokeWidth={2} fill="none">
        <motion.path d={`M ${x1} 30 H ${x2} M ${x1} 30 V ${FLOOR_YS[2]} M ${x2} 30 V ${FLOOR_YS[2]}`} initial={false} animate={pathAnim} transition={transition} />
        {active &&
          FLOOR_MIDS.slice(0, 3).map((y) => (
            <g key={y}>
              <line x1={x1 - 12} y1={y} x2={x1 + 12} y2={y} strokeWidth={1.5} />
              <line x1={x2 - 12} y1={y} x2={x2 + 12} y2={y} strokeWidth={1.5} />
            </g>
          ))}
      </g>
    );
  }

  if (layerKey === "power") {
    const x = 180;
    const path = `M ${x} ${BUILDING_BOTTOM} V ${FLOOR_YS[4]} L ${x + 20} ${FLOOR_YS[4]} L ${x + 20} ${FLOOR_YS[3]} L ${x} ${FLOOR_YS[3]} V ${BUILDING_TOP}`;
    return (
      <g stroke={stroke} strokeWidth={2} fill="none">
        <motion.path d={path} initial={false} animate={pathAnim} transition={transition} />
        {active &&
          FLOOR_MIDS.map((y) => <rect key={y} x={x - 5} y={y - 5} width={10} height={10} fill={stroke} opacity={0.85} />)}
      </g>
    );
  }

  if (layerKey === "water") {
    const x = 470;
    return (
      <g stroke={stroke} strokeWidth={2} fill="none">
        <motion.path d={`M ${x} ${BUILDING_TOP} V ${BUILDING_BOTTOM + 14}`} initial={false} animate={pathAnim} transition={transition} />
        {active && <circle cx={x} cy={BUILDING_BOTTOM + 14} r={5} fill={stroke} />}
        {active &&
          FLOOR_MIDS.map((y) => <line key={y} x1={x} y1={y} x2={x - 24} y2={y} strokeWidth={1.25} opacity={0.8} />)}
      </g>
    );
  }

  if (layerKey === "safety") {
    const x = 290;
    return (
      <g stroke={stroke} strokeWidth={2} fill="none">
        <motion.path d={`M ${x} ${BUILDING_TOP} V ${BUILDING_BOTTOM}`} initial={false} animate={pathAnim} transition={transition} />
        {active &&
          FLOOR_MIDS.map((y, i) => (
            <g key={y}>
              <line x1={x} y1={y} x2={x + 16} y2={y - 10} strokeWidth={1.25} opacity={0.8} />
              {i === 2 && <circle cx={x} cy={y} r={4.5} fill="var(--color-amber)" />}
            </g>
          ))}
      </g>
    );
  }

  // intelligence — ELV/CCTV/access/network, dashed distributed nodes
  const xs = [240, 340];
  return (
    <g stroke={stroke} strokeWidth={1.5} fill="none" strokeDasharray="3 4">
      <motion.path
        d={FLOOR_MIDS.map((y, i) => `${i === 0 ? "M" : "L"} ${xs[i % 2]} ${y}`).join(" ")}
        initial={false}
        animate={pathAnim}
        transition={transition}
      />
      {active &&
        FLOOR_MIDS.map((y, i) => <circle key={y} cx={xs[i % 2]} cy={y} r={4} fill={stroke} strokeDasharray="0" />)}
    </g>
  );
}
