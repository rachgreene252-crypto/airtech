"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";

/**
 * Engineer -> Procure -> Install -> Test -> Commission -> Support as one
 * continuous visual transformation, not six identical boxes. A single
 * drawing-to-building composite redraws itself as the stage changes; the
 * stepper is the accessible, keyboard-operable primary control (same
 * pattern as SystemsReveal) rather than a scroll-jacked sequence.
 */
const STAGES = [
  {
    key: "engineer",
    label: "Engineer",
    description: "System design and equipment selection against the project's technical requirement.",
  },
  {
    key: "procure",
    label: "Procure",
    description: "Supply of equipment and materials from established manufacturer relationships.",
  },
  {
    key: "install",
    label: "Install",
    description: "Coordinated installation across HVAC, electrical, plumbing, fire protection and ELV.",
  },
  {
    key: "test",
    label: "Test",
    description: "System-level testing against design specification before handover.",
  },
  {
    key: "commission",
    label: "Commission",
    description: "Commissioning of installed systems for live operation.",
  },
  {
    key: "support",
    label: "Support",
    description: "Ongoing technical support and Annual Maintenance Contracts after handover.",
  },
] as const;

export function EngineeringLifecycle() {
  const [stage, setStage] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <Section tone="ink" border={false}>
      <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal-soft)">
        Delivery — 06
      </p>
      <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.98] text-(--color-paper) text-balance max-w-2xl">
        One team, start to finish.
      </h2>
      <p className="mt-5 max-w-md text-base sm:text-lg leading-relaxed text-(--color-steel-soft)">
        A single Airtech team carries the project from design through to long-term support — not a
        handoff between separate contractors at every stage.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          {/* A persistent connecting line across all six stages, so the flow
              reads at a glance rather than only after interacting — each
              button's actual touch target stays 44px even though the visual
              dot is smaller, matching the line's stroke weight. */}
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-x-[22px] top-[22px] h-px bg-(--color-ink-soft)" />
            <motion.div
              aria-hidden="true"
              className="absolute left-[22px] top-[22px] h-px bg-(--color-signal-soft)"
              initial={false}
              animate={{ width: `calc((100% - 44px) * ${stage / (STAGES.length - 1)})` }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <ol className="relative flex justify-between" role="list">
              {STAGES.map((s, i) => (
                <li key={s.key} className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setStage(i)}
                    aria-current={stage === i}
                    aria-label={`${s.label} (step ${i + 1} of ${STAGES.length})`}
                    className="flex h-11 w-11 items-center justify-center"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-2.5 w-2.5 shrink-0 rounded-full border transition-colors ${
                        stage >= i
                          ? "border-(--color-signal-soft) bg-(--color-signal-soft)"
                          : "border-(--color-ink-soft) bg-(--color-ink)"
                      }`}
                    />
                  </button>
                  <span
                    aria-hidden="true"
                    className={`-mt-1 font-mono text-[9px] tracking-[0.06em] uppercase ${
                      stage === i ? "text-(--color-paper)" : "text-(--color-steel-soft)"
                    }`}
                  >
                    {s.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={STAGES[stage].key}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 border-t border-(--color-ink-soft) pt-6"
            >
              <h3 className="font-display text-2xl font-semibold text-(--color-paper)">
                {STAGES[stage].label}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-(--color-paper)/75 leading-relaxed">
                {STAGES[stage].description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStage((s) => Math.max(0, s - 1))}
              disabled={stage === 0}
              className="font-mono text-xs tracking-[0.1em] uppercase text-(--color-steel-soft) hover:text-(--color-paper) disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => setStage((s) => Math.min(STAGES.length - 1, s + 1))}
              disabled={stage === STAGES.length - 1}
              className="font-mono text-xs tracking-[0.1em] uppercase text-(--color-steel-soft) hover:text-(--color-paper) disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Next →
            </button>
          </div>
        </div>

        <LifecycleDrawing stage={stage} reduceMotion={!!reduceMotion} />
      </div>
    </Section>
  );
}

/**
 * A single composite that redraws itself per stage: a technical drawing
 * progressively resolving into a completed, occupied building. No six
 * separate icons — one continuous drawing.
 */
function LifecycleDrawing({ stage, reduceMotion }: { stage: number; reduceMotion: boolean }) {
  const progress = stage / (STAGES.length - 1); // 0 -> 1
  const transition = { duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <svg viewBox="0 0 640 420" className="w-full h-auto" role="img" aria-label={`Lifecycle stage: ${STAGES[stage].label}`}>
      {/* Base drawing lines — always visible, the "engineering" layer */}
      <g stroke="var(--color-steel)" strokeWidth={1} opacity={0.5}>
        <rect x={160} y={60} width={320} height={300} fill="none" />
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={i} x1={160} y1={60 + i * 60} x2={480} y2={60 + i * 60} />
        ))}
      </g>

      {/* Procure — equipment blocks appear */}
      <motion.g
        initial={false}
        animate={{ opacity: stage >= 1 ? 1 : 0 }}
        transition={transition}
        fill="var(--color-steel-soft)"
      >
        <rect x={190} y={90} width={40} height={24} />
        <rect x={250} y={90} width={40} height={24} />
        <rect x={310} y={150} width={60} height={24} />
      </motion.g>

      {/* Install — cobalt/gold system lines trace through the frame */}
      <motion.g
        stroke="var(--color-signal-soft)"
        strokeWidth={2}
        fill="none"
        initial={false}
        animate={{ pathLength: stage >= 2 ? 1 : 0, opacity: stage >= 2 ? 1 : 0 }}
        transition={transition}
      >
        <path d="M 180 340 V 100 H 300" />
        <path d="M 460 340 V 160 H 380" />
      </motion.g>

      {/* Test — amber measurement marks */}
      <motion.g
        initial={false}
        animate={{ opacity: stage >= 3 ? 1 : 0 }}
        transition={transition}
      >
        {[140, 200, 260, 320].map((y) => (
          <line key={y} x1={490} y1={y} x2={505} y2={y} stroke="var(--color-amber)" strokeWidth={1.5} />
        ))}
      </motion.g>

      {/* Commission — the building fills solid, reads as complete */}
      <motion.rect
        x={160}
        y={60}
        width={320}
        height={300}
        fill="var(--color-paper)"
        initial={false}
        animate={{ opacity: stage >= 4 ? 0.06 : 0 }}
        transition={transition}
      />

      {/* Support — a steady amber "live" marker */}
      <motion.circle
        cx={470}
        cy={80}
        r={6}
        fill="var(--color-amber)"
        initial={false}
        animate={{ opacity: stage >= 5 ? 1 : 0, scale: stage >= 5 ? 1 : 0.5 }}
        transition={transition}
      />

      {/* Ground line */}
      <line x1={120} y1={360} x2={520} y2={360} stroke="var(--color-steel)" strokeWidth={1.5} />

      {/* Progress rail */}
      <rect x={120} y={395} width={400} height={2} fill="var(--color-ink-soft)" />
      <motion.rect
        x={120}
        y={395}
        height={2}
        fill="var(--color-signal-soft)"
        initial={false}
        animate={{ width: 400 * progress }}
        transition={transition}
      />
    </svg>
  );
}
