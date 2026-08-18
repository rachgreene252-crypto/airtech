"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { services, getServiceBySlug } from "@/content/services";

/**
 * The signature interaction: one building, six systems added one at a time.
 * Deliberately click/tap-driven rather than scroll-jacked — the visitor
 * controls the pace, it works with keyboard-only navigation, and it degrades
 * to a single fully-layered diagram with no JS or with reduced motion.
 */
const ZONE_SLUGS = [
  "hvac",
  "electrical",
  "plumbing-public-health",
  "fire-protection",
  "elv-security",
  "bms-systems-integration",
] as const;

const ZONES = ZONE_SLUGS.map((slug) => getServiceBySlug(slug)).filter(
  (s): s is NonNullable<ReturnType<typeof getServiceBySlug>> => Boolean(s)
);

// viewBox 0 0 640 480 — a simplified six-storey building elevation.
const BUILDING_TOP = 44;
const BUILDING_BOTTOM = 440;
const BUILDING_LEFT = 150;
const BUILDING_RIGHT = 490;
const FLOORS = 6;
const FLOOR_YS = Array.from({ length: FLOORS - 1 }, (_, i) => BUILDING_TOP + ((i + 1) * (BUILDING_BOTTOM - BUILDING_TOP)) / FLOORS);
const FLOOR_MIDS = Array.from({ length: FLOORS }, (_, i) => BUILDING_TOP + (i + 0.5) * ((BUILDING_BOTTOM - BUILDING_TOP) / FLOORS));

export function SystemsReveal() {
  const [step, setStep] = useState(0); // 0 = building only, 1..6 = zones active
  const reduceMotion = useReducedMotion();
  const total = ZONES.length;
  const activeZone = step > 0 ? ZONES[step - 1] : null;

  const headline =
    step === 0 ? "One building." : step === total ? "One engineering partner." : "Many systems.";

  return (
    <Section tone="ink" border={false} className="overflow-hidden">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal-soft)">
            Systems — 02
          </p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.98] text-(--color-paper) text-balance">
            <AnimatePresence mode="wait">
              <motion.span
                key={headline}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {headline}
              </motion.span>
            </AnimatePresence>
          </h2>
          <p className="mt-5 max-w-md text-base sm:text-lg leading-relaxed text-(--color-steel-soft)">
            These aren&apos;t six contractors&apos; scopes stitched together after the fact.
            Airtech engineers and executes every system as one coordinated delivery, sharing
            the same risers and plant rooms.
          </p>

          {/* Stepper — the accessible, non-animated fallback and the primary control. */}
          <ol className="mt-10 flex flex-wrap gap-2" role="list">
            <li>
              <button
                type="button"
                onClick={() => setStep(0)}
                aria-current={step === 0}
                className={`px-3 py-2 font-mono text-[11px] tracking-[0.1em] uppercase border transition-colors ${
                  step === 0
                    ? "border-(--color-signal) text-(--color-paper)"
                    : "border-(--color-ink-soft) text-(--color-steel-soft) hover:border-(--color-steel-soft)"
                }`}
              >
                Building
              </button>
            </li>
            {ZONES.map((zone, i) => (
              <li key={zone.slug}>
                <button
                  type="button"
                  onClick={() => setStep(i + 1)}
                  aria-current={step === i + 1}
                  className={`px-3 py-2 font-mono text-[11px] tracking-[0.1em] uppercase border transition-colors ${
                    step >= i + 1
                      ? "border-(--color-signal) text-(--color-paper)"
                      : "border-(--color-ink-soft) text-(--color-steel-soft) hover:border-(--color-steel-soft)"
                  }`}
                >
                  {zone.disciplineCode}
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex items-center gap-3">
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

          <AnimatePresence mode="wait">
            {activeZone && (
              <motion.div
                key={activeZone.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 border-t border-(--color-ink-soft) pt-6"
              >
                <h3 className="font-display text-xl font-semibold text-(--color-paper)">{activeZone.name}</h3>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-(--color-paper)/75">
                  {activeZone.systems.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <Link
                  href={`/expertise/${activeZone.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-signal-soft) hover:text-(--color-signal) transition-colors"
                >
                  Explore {activeZone.name}
                  <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <BuildingDiagram step={step} reduceMotion={!!reduceMotion} />
      </div>
    </Section>
  );
}

function BuildingDiagram({ step, reduceMotion }: { step: number; reduceMotion: boolean }) {
  return (
    <svg
      viewBox="0 0 640 480"
      className="w-full h-auto"
      role="img"
      aria-label={`Building cross-section, showing ${step} of ${ZONES.length} coordinated engineering systems`}
    >
      {/* Ground */}
      <line x1={110} y1={BUILDING_BOTTOM} x2={530} y2={BUILDING_BOTTOM} stroke="var(--color-steel)" strokeWidth={1.5} />
      {/* Building outline */}
      <rect
        x={BUILDING_LEFT}
        y={BUILDING_TOP}
        width={BUILDING_RIGHT - BUILDING_LEFT}
        height={BUILDING_BOTTOM - BUILDING_TOP}
        fill="none"
        stroke="var(--color-steel-soft)"
        strokeWidth={1.25}
      />
      {FLOOR_YS.map((y) => (
        <line key={y} x1={BUILDING_LEFT} y1={y} x2={BUILDING_RIGHT} y2={y} stroke="var(--color-ink-soft)" strokeWidth={1} />
      ))}

      {services
        .filter((s) => ZONE_SLUGS.includes(s.slug as (typeof ZONE_SLUGS)[number]))
        .map((s) => s.slug)
        .map((slug, i) => (
          <SystemTrace key={slug} slug={slug} active={step > i} reduceMotion={reduceMotion} />
        ))}

      {step === ZONES.length && (
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
  );
}

function SystemTrace({
  slug,
  active,
  reduceMotion,
}: {
  slug: string;
  active: boolean;
  reduceMotion: boolean;
}) {
  const pathAnim = reduceMotion
    ? { pathLength: active ? 1 : 0 }
    : { pathLength: active ? 1 : 0, opacity: active ? 1 : 0 };
  const transition = { duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] as const };

  if (slug === "hvac") {
    const x1 = 230;
    const x2 = 410;
    return (
      <g stroke="var(--color-signal)" strokeWidth={2} fill="none">
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

  if (slug === "electrical") {
    const x = 180;
    const path = `M ${x} ${BUILDING_BOTTOM} V ${FLOOR_YS[4]} L ${x + 20} ${FLOOR_YS[4]} L ${x + 20} ${FLOOR_YS[3]} L ${x} ${FLOOR_YS[3]} V ${BUILDING_TOP}`;
    return (
      <g stroke="var(--color-signal)" strokeWidth={2} fill="none">
        <motion.path d={path} initial={false} animate={pathAnim} transition={transition} />
        {active &&
          FLOOR_MIDS.map((y) => <rect key={y} x={x - 5} y={y - 5} width={10} height={10} fill="var(--color-signal)" opacity={0.85} />)}
      </g>
    );
  }

  if (slug === "plumbing-public-health") {
    const x = 470;
    return (
      <g stroke="var(--color-signal)" strokeWidth={2} fill="none">
        <motion.path d={`M ${x} ${BUILDING_TOP} V ${BUILDING_BOTTOM + 14}`} initial={false} animate={pathAnim} transition={transition} />
        {active && <circle cx={x} cy={BUILDING_BOTTOM + 14} r={5} fill="var(--color-signal)" />}
        {active &&
          FLOOR_MIDS.map((y) => <line key={y} x1={x} y1={y} x2={x - 24} y2={y} strokeWidth={1.25} opacity={0.8} />)}
      </g>
    );
  }

  if (slug === "fire-protection") {
    const x = 290;
    return (
      <g stroke="var(--color-signal)" strokeWidth={2} fill="none">
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

  if (slug === "elv-security") {
    const xs = [240, 340];
    return (
      <g stroke="var(--color-signal)" strokeWidth={1.5} fill="none" strokeDasharray="3 4">
        <motion.path
          d={FLOOR_MIDS.map((y, i) => `${i === 0 ? "M" : "L"} ${xs[i % 2]} ${y}`).join(" ")}
          initial={false}
          animate={pathAnim}
          transition={transition}
        />
        {active &&
          FLOOR_MIDS.map((y, i) => <circle key={y} cx={xs[i % 2]} cy={y} r={4} fill="var(--color-signal)" strokeDasharray="0" />)}
      </g>
    );
  }

  // BMS / systems integration — the convergence node, drawn last.
  const center = { x: 320, y: 242 };
  const targets = [
    { x: 320, y: 30 },
    { x: 180, y: FLOOR_YS[3] },
    { x: 470, y: FLOOR_YS[2] },
    { x: 290, y: FLOOR_YS[2] },
    { x: 340, y: FLOOR_MIDS[3] },
  ];
  return (
    <g stroke="var(--color-amber)" strokeWidth={1.25} fill="none" opacity={active ? 0.9 : 0}>
      {targets.map((t, i) => (
        <motion.line
          key={i}
          x1={center.x}
          y1={center.y}
          x2={t.x}
          y2={t.y}
          initial={false}
          animate={{ pathLength: active ? 1 : 0 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : i * 0.06 }}
        />
      ))}
    </g>
  );
}
