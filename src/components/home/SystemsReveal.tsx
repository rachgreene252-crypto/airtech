"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { getServiceBySlug } from "@/content/services";

/**
 * The signature interaction: six disciplines, one team.
 *
 * Rebuilt 2026-09-16, replacing the front-elevation riser diagram entirely
 * per direct feedback: "the model still doesn't make sense to users ... it
 * looks very technical, and most users will not be able to interpret it."
 * A building cutaway (isometric, then a flat elevation) is how an engineer
 * reads a coordination drawing, not how a first-time visitor reads a
 * homepage. The idea that actually needed communicating was always
 * simpler than either diagram: six disciplines, all held by one team. So
 * this is now a plain hub-and-spoke: six coloured discipline nodes
 * connect to a single Airtech hub in the centre. No building, no risers,
 * no floors to interpret, just "six things, one team," which is legible
 * in about a second.
 *
 * Pushed further 2026-09-16, per "think of something better, like crazy
 * impressive and related to the company": the hub now has a slow ambient
 * glow (never fully inert), and small coloured pulses continuously travel
 * each hub-to-discipline line, faster and brighter on the active one. Not
 * decoration for its own sake, it's the literal idea the section makes:
 * six systems actually running, held by one team, not six static dots
 * connected by static lines. The discipline nodes themselves are now
 * clickable too, not just the stepper buttons beside them.
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

// Per-system colour coding, a deliberate departure from the sitewide
// monochrome-blue accent, because the client asked for exactly this: fire
// reads red, HVAC reads Airtech blue, electrical reads amber, water reads
// teal, ELV reads violet, BMS (the integration layer, not a physical
// system) stays a neutral slate.
const SYSTEM_COLOR: Record<string, string> = {
  hvac: "#3fa6e7",
  electrical: "#C98A2C",
  "plumbing-public-health": "#168F6E",
  "fire-protection": "#B23B34",
  "elv-security": "#6B54C4",
  "bms-systems-integration": "#5B6B7D",
};

// The raw disciplineCode ("M", "E") read as indistinguishable at a glance
// ("cannot differentiate between anything M, E, or P"). Short, actual
// words instead of single-letter engineering shorthand.
const STEPPER_LABEL: Record<string, string> = {
  hvac: "HVAC",
  electrical: "Electrical",
  "plumbing-public-health": "Plumbing",
  "fire-protection": "Fire",
  "elv-security": "ELV",
  "bms-systems-integration": "BMS",
};

// Six positions on a clock face (12, 2, 4, 6, 8, 10 o'clock), computed
// against a 420x420 viewBox centred at (210, 210) with a 150px radius.
const NODE_POS: Record<string, { x: number; y: number }> = {
  hvac: { x: 210, y: 60 },
  electrical: { x: 339.9, y: 135 },
  "fire-protection": { x: 339.9, y: 285 },
  "plumbing-public-health": { x: 210, y: 360 },
  "elv-security": { x: 80.1, y: 285 },
  "bms-systems-integration": { x: 80.1, y: 135 },
};
const HUB = { x: 210, y: 210 };

export function SystemsReveal() {
  const [step, setStep] = useState(0); // 0 = idle hub, 1..6 = disciplines active
  const [engaged, setEngaged] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const total = ZONES.length;
  const activeZone = step > 0 ? ZONES[step - 1] : null;

  // Any manual interaction takes over from the autoplay for good.
  function userSelect(next: number) {
    setEngaged(true);
    setStep(Math.min(total, Math.max(0, next)));
  }

  // GSAP ScrollTrigger — plays the six-step build-out once, the first time
  // the section is about two-thirds into view, so the section reads as
  // alive rather than waiting to be clicked.
  useEffect(() => {
    if (reduceMotion || engaged) return;
    const el = sectionRef.current;
    if (!el) return;
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 65%", once: true },
        });
        for (let i = 1; i <= total; i++) {
          tl.call(() => setStep((s) => (s < i ? i : s)), undefined, i === 1 ? 0.2 : "+=0.65");
        }
      }, el);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduceMotion, engaged, total]);

  const headline = step === 0 ? "Six disciplines." : step === total ? "One engineering partner." : "One team.";

  return (
    <Section tone="raised" border={false} className="overflow-hidden bg-soft-glow">
      <div ref={sectionRef} className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center">
        <div>
          <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
            What Airtech does
          </p>
          <h2 className="mt-5 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.015em] text-(--color-ink) text-balance">
            <AnimatePresence mode="wait" initial={false}>
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
          <p className="mt-5 max-w-md text-body-l leading-relaxed text-(--color-steel)">
            Not six contractors&apos; scopes stitched together after the fact. Airtech
            engineers and executes every system as one coordinated delivery, held
            by a single team. Press a discipline to see what it covers.
          </p>

          {/* Stepper — the accessible, non-animated fallback and the primary control. */}
          <ol className="mt-10 flex flex-wrap gap-2" role="list">
            <li>
              <button
                type="button"
                onClick={() => userSelect(0)}
                aria-current={step === 0}
                className={`min-h-11 px-3 py-2 font-mono text-[12px] tracking-[0.1em] uppercase border transition-colors ${
                  step === 0
                    ? "border-(--color-brand-blue) text-(--color-brand-blue)"
                    : "border-(--color-line-strong) text-(--color-steel-soft) hover:border-(--color-steel)"
                }`}
              >
                Overview
              </button>
            </li>
            {ZONES.map((zone, i) => {
              const isActive = step === i + 1;
              const color = SYSTEM_COLOR[zone.slug];
              return (
                <li key={zone.slug}>
                  <button
                    type="button"
                    onClick={() => userSelect(i + 1)}
                    aria-current={isActive}
                    style={isActive ? { borderColor: color, color, backgroundColor: `${color}14` } : undefined}
                    className={`flex min-h-11 items-center gap-2 px-3 py-2 font-mono text-[12px] tracking-[0.1em] uppercase border transition-colors ${
                      isActive
                        ? ""
                        : "border-(--color-line-strong) text-(--color-steel-soft) hover:border-(--color-steel)"
                    }`}
                  >
                    <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                    {STEPPER_LABEL[zone.slug]}
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => userSelect(step - 1)}
              disabled={step === 0}
              className="font-mono text-xs tracking-[0.1em] uppercase text-(--color-steel-soft) hover:text-(--color-ink) disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => userSelect(step + 1)}
              disabled={step === total}
              className="font-mono text-xs tracking-[0.1em] uppercase text-(--color-steel-soft) hover:text-(--color-ink) disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Next →
            </button>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {activeZone && (
              <motion.div
                key={activeZone.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 border-t border-(--color-line) pt-6"
              >
                <h3
                  className="font-display text-title font-semibold"
                  style={{ color: SYSTEM_COLOR[activeZone.slug] }}
                >
                  {activeZone.name}
                </h3>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-small text-(--color-steel)">
                  {activeZone.systems.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <Link
                  href={`/expertise/${activeZone.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-brand-blue) transition-colors hover:text-(--color-ink)"
                >
                  Explore {activeZone.name}
                  <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <HubDiagram step={step} total={total} reduceMotion={!!reduceMotion} onSelect={userSelect} />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Hub-and-spoke diagram                                                */
/* ------------------------------------------------------------------ */

function HubDiagram({
  step,
  total,
  reduceMotion,
  onSelect,
}: {
  step: number;
  total: number;
  reduceMotion: boolean;
  onSelect: (next: number) => void;
}) {
  const activeZone = step > 0 ? ZONES[step - 1] : null;
  const activeColor = activeZone ? SYSTEM_COLOR[activeZone.slug] : undefined;

  return (
    <div className="relative border border-(--color-line-strong) bg-(--color-paper) p-4 sm:p-6">
      {/* Header row — the same mono-label + rule language used across the
          rest of the site (PageHero, crop-frame captions), so this panel
          reads as part of the same system as the stepper buttons beside it
          instead of a separate floating widget. */}
      <div className="mb-4 flex items-center justify-between border-b border-(--color-line) pb-3">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-(--color-steel-soft)">
          One team, six disciplines
        </p>
        <p
          className="font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors"
          style={{ color: activeColor ?? "var(--color-steel-soft)" }}
        >
          {String(step).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </p>
      </div>

      <div className="flex justify-center">
        <svg viewBox="0 0 420 420" className="h-auto w-full max-w-[420px]" role="img" aria-label="Six engineering disciplines connected to one Airtech team">
          <defs>
            <filter id="hub-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>

          {/* Ambient glow — the hub never sits inert; it breathes, the way a
              live control panel would, whether or not a discipline is
              selected. */}
          <motion.circle
            cx={HUB.x}
            cy={HUB.y}
            r={54}
            fill="var(--color-brand-blue-vivid)"
            filter="url(#hub-glow)"
            initial={false}
            animate={reduceMotion ? { opacity: 0.25 } : { opacity: [0.18, 0.4, 0.18], scale: [1, 1.12, 1] }}
            transition={reduceMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {ZONES.map((zone, i) => {
            const pos = NODE_POS[zone.slug];
            const color = SYSTEM_COLOR[zone.slug];
            const active = step === i + 1;
            const dimmed = step > 0 && !active;
            return (
              <line
                key={zone.slug}
                x1={HUB.x}
                y1={HUB.y}
                x2={pos.x}
                y2={pos.y}
                stroke={color}
                strokeWidth={active ? 3 : 1.5}
                opacity={dimmed ? 0.18 : active ? 0.9 : 0.45}
                style={{ transition: "opacity 0.3s ease, stroke-width 0.3s ease" }}
              />
            );
          })}

          {/* Flow — small pulses of colour travelling the hub->discipline
              line on a loop, the way current, air or water actually moves
              through a coordinated system. Directly the idea the whole
              section is making: not six static connections, six things
              actively running through one team. */}
          {!reduceMotion &&
            ZONES.map((zone, i) => {
              const pos = NODE_POS[zone.slug];
              const color = SYSTEM_COLOR[zone.slug];
              const active = step === i + 1;
              const dimmed = step > 0 && !active;
              if (dimmed) return null;
              return [0, 1].map((particle) => (
                <motion.circle
                  key={`${zone.slug}-flow-${particle}`}
                  r={active ? 4 : 2.5}
                  fill={color}
                  initial={false}
                  animate={{ cx: [HUB.x, pos.x], cy: [HUB.y, pos.y], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: active ? 1.1 : 2.2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: particle * (active ? 0.55 : 1.1),
                  }}
                />
              ));
            })}

          {/* Hub — the single Airtech centre every spoke belongs to. */}
          <circle cx={HUB.x} cy={HUB.y} r={54} fill="var(--color-blue-deep)" />
          <text
            x={HUB.x}
            y={HUB.y + 5}
            textAnchor="middle"
            className="font-display"
            style={{ fill: "white", fontSize: 18, fontWeight: 600, letterSpacing: "0.01em" }}
          >
            Airtech
          </text>

          {ZONES.map((zone, i) => {
            const pos = NODE_POS[zone.slug];
            const color = SYSTEM_COLOR[zone.slug];
            const active = step === i + 1;
            const dimmed = step > 0 && !active;
            return (
              <g
                key={zone.slug}
                role="button"
                tabIndex={0}
                aria-label={`Show ${zone.name}`}
                onClick={() => onSelect(i + 1)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onSelect(i + 1);
                }}
                style={{ cursor: "pointer", transition: "opacity 0.3s ease" }}
                opacity={dimmed ? 0.4 : 1}
              >
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={active ? 40 : 34}
                  fill={color}
                  stroke="white"
                  strokeWidth={active ? 3 : 2}
                  animate={reduceMotion ? undefined : { r: active ? 40 : 34 }}
                  transition={{ duration: 0.3 }}
                />
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  style={{ fill: "white", fontSize: 11, fontWeight: 600, fontFamily: "var(--font-mono)", letterSpacing: "0.02em", pointerEvents: "none" }}
                >
                  {zone.disciplineCode}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Caption footer — a fixed-height row inside the same bordered panel
          as the drawing, so nothing jumps or floats loose as the active
          discipline changes. */}
      <div className="mt-4 flex min-h-[2.75rem] items-center border-t border-(--color-line) pt-3">
        <AnimatePresence mode="wait" initial={false}>
          {activeZone ? (
            <motion.div
              key={activeZone.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3"
            >
              <span aria-hidden="true" className="h-8 w-1 shrink-0" style={{ backgroundColor: activeColor }} />
              <p className="font-display text-small font-semibold text-(--color-ink)">
                {activeZone.name}
                <span className="ml-2 font-mono text-[0.7rem] font-normal uppercase tracking-[0.1em] text-(--color-steel-soft)">
                  {activeZone.disciplineCode}
                </span>
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="idle"
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-(--color-steel-soft)"
            >
              Six systems, one Airtech team.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
