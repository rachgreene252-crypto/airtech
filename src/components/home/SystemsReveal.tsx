"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { services, getServiceBySlug } from "@/content/services";

/**
 * The signature interaction: one building, six systems added one at a time.
 * Click/tap/keyboard stays the primary control (works with no JS, reduced
 * motion collapses to the fully-layered diagram) — but the first time the
 * section scrolls into view, a GSAP ScrollTrigger plays the build-out once,
 * automatically, so the section reads as alive rather than waiting to be
 * clicked. Any manual interaction cancels the autoplay outright.
 *
 * Rebuilt 2026-09-10 (client reference: an isometric MEP-coordination
 * cutaway with colour-coded pipes/ducts per system, pressing a system
 * button highlights its own routing) — one riser per discipline,
 * colour-coded (not monochrome blue, per the client's explicit ask that
 * "fire and HVAC systems come out nicely"), with roof/ground plant boxes
 * lighting up for the disciplines that live there.
 *
 * Rebuilt again 2026-09-15 — the isometric cutaway was replaced with a
 * flat front elevation per direct feedback ("make it more accurate and
 * front facing so the user can understand what is actually happening").
 * A straight-on elevation is closer to how a real riser diagram is
 * actually drawn, and centres cleanly by construction where the isometric
 * projection ran off-balance in its panel.
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

// Per-system colour coding — a deliberate departure from the sitewide
// monochrome-blue accent, because the client asked for exactly this:
// fire reads red, HVAC reads Airtech blue, electrical reads amber, water
// reads teal, ELV reads violet, BMS (the integration layer, not a physical
// system) stays a neutral slate.
// Deepened 2026-09-11 from the first-pass bright/cartoon set — richer,
// slightly desaturated "jewel tone" versions of the same hues read as
// engineered material rather than crayon fills, paired with the glow filter
// below for a premium lit-from-within quality on the active system.
const SYSTEM_COLOR: Record<string, string> = {
  hvac: "#0098B1",
  electrical: "#C98A2C",
  "plumbing-public-health": "#168F6E",
  "fire-protection": "#B23B34",
  "elv-security": "#6B54C4",
  "bms-systems-integration": "#5B6B7D",
};

// 2026-09-15 — the raw disciplineCode ("M", "E") read as indistinguishable
// at a glance ("cannot differentiate between anything M, E, or P"). Short,
// actual words instead of single-letter engineering shorthand.
const STEPPER_LABEL: Record<string, string> = {
  hvac: "HVAC",
  electrical: "Electrical",
  "plumbing-public-health": "Plumbing",
  "fire-protection": "Fire",
  "elv-security": "ELV",
  "bms-systems-integration": "BMS",
};

export function SystemsReveal() {
  const [step, setStep] = useState(0); // 0 = building only, 1..6 = zones active
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
  // the section is about two-thirds into view. Purely a timing/orchestration
  // use of GSAP (the draw-in itself stays on the Framer paths below, which
  // already react to `step`); this is the "explain the system on arrival"
  // moment the diagram was missing when it only reacted to clicks.
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

  const headline =
    step === 0 ? "One building." : step === total ? "One engineering partner." : "Many systems.";

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
            Not six contractors&apos; scopes stitched together after the fact. Airtech engineers
            and executes every system as one coordinated delivery — sharing the same risers,
            plant rooms and drawings. Press a system to see it routed through the building.
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
                Building
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
                        : step > i
                          ? "border-(--color-line-strong) text-(--color-ink-soft)"
                          : "border-(--color-line-strong) text-(--color-steel-soft) hover:border-(--color-steel)"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: step > i ? color : "var(--color-line-strong)" }}
                    />
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

        <FrontElevationBuilding step={step} total={total} reduceMotion={!!reduceMotion} />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Front-elevation building                                            */
/* ------------------------------------------------------------------ */

// Rebuilt 2026-09-15 — replaces the isometric cutaway per direct client
// feedback ("make it more accurate and front facing so the user can
// understand what is actually happening"). A straight-on elevation is both
// closer to how a real MEP riser/coordination drawing is actually drawn
// (a flat schematic, not an artistic 3D cutaway) and far easier to read at
// a glance: each system is one clearly vertical line running the height of
// the building, with roof/ground plant exactly where it visually connects.
const VB_W = 560;
const VB_H = 460;
const BX = 100; // building left edge
const BW = 360; // building width
const ROOF_Y = 60;
const GROUND_Y = 360;
const FLOORS = 6;
const FLOOR_H = (GROUND_Y - ROOF_Y) / FLOORS;

// Evenly spaced riser columns across the building width, one per system —
// order chosen so HVAC (the only roof-connected system) sits centred under
// its rooftop units, with the ground-served systems flanking it.
const RISER_X: Record<string, number> = {
  electrical: BX + BW * (0.5 / 6),
  "plumbing-public-health": BX + BW * (1.5 / 6),
  hvac: BX + BW * (2.5 / 6),
  "fire-protection": BX + BW * (3.5 / 6),
  "elv-security": BX + BW * (4.5 / 6),
  "bms-systems-integration": BX + BW * (5.5 / 6),
};

function FrontElevationBuilding({
  step,
  total,
  reduceMotion,
}: {
  step: number;
  total: number;
  reduceMotion: boolean;
}) {
  const scanRef = useRef<SVGRectElement>(null);
  const activeZone = step > 0 ? ZONES[step - 1] : null;
  const activeSlug = activeZone?.slug;
  const activeColor = activeSlug ? SYSTEM_COLOR[activeSlug] : undefined;

  // GSAP — a soft coloured wash sweeps down the building face each time
  // `step` advances, in the active system's own colour. The one thing GSAP
  // does here that the per-riser draw-in below doesn't: an imperative
  // "this is the one that just lit up" pass across the whole shell.
  useEffect(() => {
    if (step === 0 || reduceMotion || !activeColor) return;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled || !scanRef.current) return;
      gsap.killTweensOf(scanRef.current);
      gsap.set(scanRef.current, { attr: { fill: activeColor } });
      gsap.fromTo(scanRef.current, { opacity: 0.35 }, { opacity: 0, duration: 1, ease: "power2.out" });
    })();
    return () => {
      cancelled = true;
    };
  }, [step, reduceMotion, activeColor]);

  const floorLines = Array.from({ length: FLOORS - 1 }, (_, i) => ROOF_Y + FLOOR_H * (i + 1));
  const floorMidYs = Array.from({ length: FLOORS }, (_, i) => ROOF_Y + FLOOR_H * (i + 0.5));

  return (
    <div className="relative border border-(--color-line-strong) bg-(--color-paper) p-4 sm:p-6">
      {/* Header row — the same mono-label + rule language used across the
          rest of the site (PageHero, crop-frame captions), so this panel
          reads as part of the same system as the stepper buttons beside it
          instead of a separate floating widget. */}
      <div className="mb-4 flex items-center justify-between border-b border-(--color-line) pb-3">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-(--color-steel-soft)">
          Coordination drawing
        </p>
        <p
          className="font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors"
          style={{ color: activeColor ?? "var(--color-steel-soft)" }}
        >
          Sys {String(step).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </p>
      </div>

      {/* Centred both ways — the isometric build ran off-balance in its
          panel; a flat elevation is symmetric by construction, and mx-auto
          plus a capped max-width keeps it centred at every viewport. */}
      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="h-auto w-full max-w-[480px]"
          role="img"
          aria-label={`Front elevation of a building, showing ${step} of ${total} coordinated engineering systems routed through it`}
        >
          <defs>
            <linearGradient id="elev-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBFDFE" />
              <stop offset="100%" stopColor="#E9F0F5" />
            </linearGradient>
          </defs>

          {/* Ground line */}
          <line x1={BX - 30} y1={GROUND_Y} x2={BX + BW + 30} y2={GROUND_Y} stroke="#B9CBD8" strokeWidth={1.5} />

          {/* Building shell — one flat front face. */}
          <rect x={BX} y={ROOF_Y} width={BW} height={GROUND_Y - ROOF_Y} fill="url(#elev-face)" stroke="#B9CBD8" strokeWidth={1.5} />
          {/* Roofline cap */}
          <line x1={BX - 10} y1={ROOF_Y} x2={BX + BW + 10} y2={ROOF_Y} stroke="#9FB6C6" strokeWidth={2} />

          {/* Floor dividers */}
          {floorLines.map((y) => (
            <line key={y} x1={BX} y1={y} x2={BX + BW} y2={y} stroke="#B9CBD8" strokeWidth={1} opacity={0.7} />
          ))}

          {/* GSAP colour-wash scan, keyed to the active system's colour. */}
          <rect ref={scanRef} x={BX} y={ROOF_Y} width={BW} height={GROUND_Y - ROOF_Y} opacity={0} />

          {/* Rooftop plant — two AHU/chiller units, lighting up for HVAC. */}
          <PlantBox cx={RISER_X.hvac - 26} y={ROOF_Y - 26} w={34} h={26} active={step > 0} color={SYSTEM_COLOR.hvac} />
          <PlantBox cx={RISER_X.hvac + 26} y={ROOF_Y - 20} w={30} h={20} active={step > 0} color={SYSTEM_COLOR.hvac} />

          {/* Per-system risers + floor branches — drawn before the ground
              plant row so the plant boxes sit visually "in front". */}
          <Riser x={RISER_X.electrical} color={SYSTEM_COLOR.electrical} active={step > 1} floorMidYs={floorMidYs} />
          <Riser x={RISER_X["plumbing-public-health"]} color={SYSTEM_COLOR["plumbing-public-health"]} active={step > 2} floorMidYs={floorMidYs} />
          <Riser x={RISER_X.hvac} color={SYSTEM_COLOR.hvac} active={step > 0} floorMidYs={floorMidYs} topY={ROOF_Y - 6} />
          <Riser x={RISER_X["fire-protection"]} color={SYSTEM_COLOR["fire-protection"]} active={step > 3} floorMidYs={floorMidYs} />
          <Riser x={RISER_X["elv-security"]} color={SYSTEM_COLOR["elv-security"]} active={step > 4} floorMidYs={floorMidYs} dashed />
          <Riser x={RISER_X["bms-systems-integration"]} color={SYSTEM_COLOR["bms-systems-integration"]} active={step > 5} floorMidYs={floorMidYs} />

          {/* Ground-floor plant room boxes — pump (plumbing), an electrical
              switchgear box, fire pump, an ELV/IT rack, and a BMS control
              panel, each sitting directly under its own riser. */}
          <PlantBox cx={RISER_X.electrical} y={GROUND_Y} w={34} h={26} active={step > 1} color={SYSTEM_COLOR.electrical} />
          <PlantBox cx={RISER_X["plumbing-public-health"]} y={GROUND_Y} w={34} h={26} active={step > 2} color={SYSTEM_COLOR["plumbing-public-health"]} />
          <PlantBox cx={RISER_X["fire-protection"]} y={GROUND_Y} w={34} h={26} active={step > 3} color={SYSTEM_COLOR["fire-protection"]} />
          <PlantBox cx={RISER_X["elv-security"]} y={GROUND_Y} w={34} h={26} active={step > 4} color={SYSTEM_COLOR["elv-security"]} />
          <PlantBox cx={RISER_X["bms-systems-integration"]} y={GROUND_Y} w={34} h={26} active={step > 5} color={SYSTEM_COLOR["bms-systems-integration"]} />

          {/* BMS convergence — thin lines tying every riser's top back to a
              central control node, drawn last once all six systems are live. */}
          {step > 5 && <BmsConvergence reduceMotion={reduceMotion} />}
        </svg>
      </div>

      {/* Caption footer — a fixed-height row inside the same bordered panel
          as the drawing, so nothing jumps or floats loose as the active
          system changes. */}
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
              Full building shell — six systems, one team.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** A small rooftop or ground plant box, fading in per-system. `y` is the
 *  roofline (box drawn above it) for rooftop plant, or the ground line
 *  (box drawn below it) for ground plant — decided by comparing against
 *  ROOF_Y so callers just pass the real anchor line. */
function PlantBox({
  cx,
  y,
  w,
  h,
  active,
  color,
}: {
  cx: number;
  y: number;
  w: number;
  h: number;
  active: boolean;
  color: string;
}) {
  const onRoof = y <= ROOF_Y;
  const top = onRoof ? y - h : y + 4;
  return (
    <motion.rect
      x={cx - w / 2}
      y={top}
      width={w}
      height={h}
      rx={2}
      fill={color}
      stroke="white"
      strokeWidth={1}
      initial={false}
      animate={{ opacity: active ? 0.92 : 0 }}
      transition={{ duration: 0.4 }}
    />
  );
}

/** One discipline's vertical riser, with short branch ticks reaching into
 *  the building at every floor. A twin-line riser (supply + return), the
 *  way a real coordination drawing shows a pipe/duct pair rather than a
 *  single schematic line. */
function Riser({
  x,
  color,
  active,
  floorMidYs,
  dashed,
  topY = ROOF_Y,
}: {
  x: number;
  color: string;
  active: boolean;
  floorMidYs: number[];
  dashed?: boolean;
  topY?: number;
}) {
  const offset = 3;
  return (
    <motion.g
      style={{ color }}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <line x1={x - offset} y1={topY} x2={x - offset} y2={GROUND_Y} stroke="currentColor" strokeWidth={2.75} strokeDasharray={dashed ? "4 4" : undefined} />
      <line x1={x + offset} y1={topY} x2={x + offset} y2={GROUND_Y} stroke="currentColor" strokeWidth={2.75} opacity={0.5} strokeDasharray={dashed ? "4 4" : undefined} />
      {floorMidYs.map((y) => (
        <g key={y}>
          <line x1={x - offset - 16} y1={y} x2={x + offset + 16} y2={y} stroke="currentColor" strokeWidth={2} opacity={0.85} strokeDasharray={dashed ? "3 3" : undefined} />
          <circle cx={x} cy={y} r={2.5} fill="currentColor" />
        </g>
      ))}
    </motion.g>
  );
}

/** BMS — thin convergence lines from a control node above the roofline to
 *  every other system's riser top, drawn once all six systems are live. */
function BmsConvergence({ reduceMotion }: { reduceMotion: boolean }) {
  const nodeX = (BX + BX + BW) / 2;
  const nodeY = ROOF_Y - 42;
  const targets = Object.entries(RISER_X).map(([slug, x]) => ({
    x,
    y: slug === "hvac" ? ROOF_Y - 6 : ROOF_Y,
  }));
  return (
    <motion.g
      stroke="var(--color-steel)"
      strokeWidth={1}
      initial={false}
      animate={{ opacity: 0.6 }}
      transition={{ duration: reduceMotion ? 0 : 0.5 }}
    >
      {targets.map((t, i) => (
        <line key={i} x1={nodeX} y1={nodeY} x2={t.x} y2={t.y} />
      ))}
      <circle cx={nodeX} cy={nodeY} r={5} fill="var(--color-ink)" stroke="white" strokeWidth={1} />
    </motion.g>
  );
}
