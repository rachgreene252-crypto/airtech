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
 * button highlights its own routing). Replaces the earlier flat 2D
 * elevation with a real isometric projection — one riser per discipline on
 * a visible building face, colour-coded (not monochrome blue, per the
 * client's explicit ask that "fire and HVAC systems come out nicely"), with
 * roof/ground plant boxes lighting up for the disciplines that live there.
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
const SYSTEM_COLOR: Record<string, string> = {
  hvac: "#0099DA",
  electrical: "#F2A93C",
  "plumbing-public-health": "#1FAE83",
  "fire-protection": "#E14B3F",
  "elv-security": "#8B6DF0",
  "bms-systems-integration": "#64748B",
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
    <Section tone="raised" border={false} className="overflow-hidden">
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
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: step > i ? color : "var(--color-line-strong)" }}
                    />
                    {zone.disciplineCode}
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

        <IsometricBuilding step={step} reduceMotion={!!reduceMotion} />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Isometric cutaway building                                          */
/* ------------------------------------------------------------------ */

// 2:1 dimetric projection — x runs back-right, y runs back-left, z is
// vertical height. Every element (shell, floors, risers, plant) is placed
// on this one grid so nothing has to be hand-fudged into alignment.
const XU = 46; // px per grid unit, x axis
const YU = 46; // px per grid unit, y axis
const ZU = 27; // px per grid unit, z (height) axis
const ORIGIN_X = 330;
const ORIGIN_Y = 400;
const BW = 5; // building width (x)
const BD = 3; // building depth (y)
const FLOORS = 6;

function iso(x: number, y: number, z: number): [number, number] {
  const sx = (x - y) * XU * 0.87;
  const sy = (x + y) * YU * 0.5 - z * ZU;
  return [ORIGIN_X + sx, ORIGIN_Y + sy];
}

function pts(points: [number, number, number][]) {
  return points.map(([x, y, z]) => iso(x, y, z).join(",")).join(" ");
}

function IsometricBuilding({ step, reduceMotion }: { step: number; reduceMotion: boolean }) {
  const scanRef = useRef<SVGPolygonElement>(null);
  const total = ZONES.length;
  const activeZone = step > 0 ? ZONES[step - 1] : null;
  const activeSlug = activeZone?.slug;
  const activeColor = activeSlug ? SYSTEM_COLOR[activeSlug] : undefined;

  // GSAP — a soft coloured wash sweeps up the active face each time `step`
  // advances, in the active system's own colour. The one thing GSAP does
  // here that the per-riser draw-in below doesn't: an imperative "this is
  // the one that just lit up" pass across the whole shell.
  useEffect(() => {
    if (step === 0 || reduceMotion || !activeColor) return;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled || !scanRef.current) return;
      gsap.killTweensOf(scanRef.current);
      gsap.set(scanRef.current, { attr: { fill: activeColor } });
      gsap.fromTo(scanRef.current, { opacity: 0.55 }, { opacity: 0, duration: 1, ease: "power2.out" });
    })();
    return () => {
      cancelled = true;
    };
  }, [step, reduceMotion, activeColor]);

  const floorZs = Array.from({ length: FLOORS + 1 }, (_, i) => i);
  const floorMidZs = Array.from({ length: FLOORS }, (_, i) => i + 0.5);

  const leftFace = pts([
    [0, 0, 0],
    [BW, 0, 0],
    [BW, 0, FLOORS],
    [0, 0, FLOORS],
  ]);
  const rightFace = pts([
    [BW, 0, 0],
    [BW, BD, 0],
    [BW, BD, FLOORS],
    [BW, 0, FLOORS],
  ]);
  const roofFace = pts([
    [0, 0, FLOORS],
    [BW, 0, FLOORS],
    [BW, BD, FLOORS],
    [0, BD, FLOORS],
  ]);

  return (
    <div className="relative">
      <svg
        viewBox="0 0 660 560"
        className="h-auto w-full"
        role="img"
        aria-label={`Isometric building cutaway, showing ${step} of ${total} coordinated engineering systems routed through it`}
      >
        <defs>
          <linearGradient id="iso-roof" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EAF2F8" />
            <stop offset="100%" stopColor="#D3E3EE" />
          </linearGradient>
          <linearGradient id="iso-left" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7FAFC" />
            <stop offset="100%" stopColor="#E7EEF3" />
          </linearGradient>
          <linearGradient id="iso-right" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DCE7EE" />
            <stop offset="100%" stopColor="#C7D6E0" />
          </linearGradient>
          <radialGradient id="iso-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0F1720" stopOpacity={0.18} />
            <stop offset="100%" stopColor="#0F1720" stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx={ORIGIN_X} cy={ORIGIN_Y + 14} rx={210} ry={22} fill="url(#iso-shadow)" />

        {/* Building shell — three isometric faces. */}
        <polygon points={roofFace} fill="url(#iso-roof)" stroke="#B9CBD8" strokeWidth={1.25} />
        <polygon points={leftFace} fill="url(#iso-left)" stroke="#B9CBD8" strokeWidth={1.25} />
        <polygon points={rightFace} fill="url(#iso-right)" stroke="#B9CBD8" strokeWidth={1.25} />

        {/* Floor dividers, drawn on both visible side faces. */}
        {floorZs.slice(1, -1).map((z) => (
          <g key={z} stroke="#B9CBD8" strokeWidth={1} opacity={0.8}>
            <line {...lineProps(0, 0, z, BW, 0, z)} />
            <line {...lineProps(BW, 0, z, BW, BD, z)} />
          </g>
        ))}
        {/* Corner edges, for a crisper "built object" read. */}
        <g stroke="#9FB6C6" strokeWidth={1.5}>
          <line {...lineProps(0, 0, 0, 0, 0, FLOORS)} />
          <line {...lineProps(BW, 0, 0, BW, 0, FLOORS)} />
          <line {...lineProps(BW, BD, 0, BW, BD, FLOORS)} />
        </g>

        {/* GSAP colour-wash scan, keyed to the active system's colour. */}
        <polygon ref={scanRef} points={leftFace} opacity={0} />

        {/* Rooftop chiller — lights up for HVAC. */}
        <IsoBox x={0.6} y={0.5} z={FLOORS} w={1.3} d={1} h={0.5} active={step > 0} color={SYSTEM_COLOR.hvac} />
        {/* Ground-floor plant room boxes — pump (plumbing) + fire pump (fire). */}
        <IsoBox x={0.4} y={0.3} z={-0.55} w={0.9} d={0.7} h={0.55} active={step > 2} color={SYSTEM_COLOR["plumbing-public-health"]} />
        <IsoBox x={2.9} y={0.3} z={-0.55} w={0.9} d={0.7} h={0.55} active={step > 3} color={SYSTEM_COLOR["fire-protection"]} />

        {/* Per-system risers + floor branches. */}
        <Riser slug="hvac" face="left" pos={1} active={step > 0} floorMidZs={floorMidZs} branchTo={0.9} />
        <Riser slug="fire-protection" face="left" pos={2.5} active={step > 3} floorMidZs={floorMidZs} branchTo={0.9} />
        <Riser slug="electrical" face="left" pos={4} active={step > 1} floorMidZs={floorMidZs} branchTo={0.9} />
        <Riser slug="plumbing-public-health" face="right" pos={0.7} active={step > 2} floorMidZs={floorMidZs} branchTo={0.9} />
        <Riser slug="elv-security" face="right" pos={1.5} active={step > 4} floorMidZs={floorMidZs} branchTo={0.9} dashed />
        <Riser slug="bms-systems-integration" face="right" pos={2.4} active={step > 5} floorMidZs={floorMidZs} branchTo={0.9} />

        {/* BMS convergence — thin lines tying every riser's mid-height point
            back to a central rooftop control node, drawn last so it reads as
            "sitting above" the other systems once it activates. */}
        {step > 5 && <BmsConvergence reduceMotion={reduceMotion} />}
      </svg>

      {/* HUD readout — a live coordination-drawing-style callout naming
          whatever system is currently active, coloured to match its riser. */}
      <div className="pointer-events-none absolute right-0 top-0 hidden sm:block">
        <AnimatePresence mode="wait" initial={false}>
          {activeZone && (
            <motion.div
              key={activeZone.slug}
              initial={reduceMotion ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="border bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm"
              style={{ borderColor: activeColor }}
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em]" style={{ color: activeColor }}>
                Sys {String(step).padStart(2, "0")}/{String(total).padStart(2, "0")} · {activeZone.disciplineCode}
              </p>
              <p className="mt-0.5 font-display text-small font-semibold text-(--color-ink)">
                {activeZone.name}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function lineProps(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
  const [sx1, sy1] = iso(x1, y1, z1);
  const [sx2, sy2] = iso(x2, y2, z2);
  return { x1: sx1, y1: sy1, x2: sx2, y2: sy2 };
}

/** A small isometric box (rooftop/ground plant), fading in per-system. */
function IsoBox({
  x,
  y,
  z,
  w,
  d,
  h,
  active,
  color,
}: {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  active: boolean;
  color: string;
}) {
  const top = pts([
    [x, y, z + h],
    [x + w, y, z + h],
    [x + w, y + d, z + h],
    [x, y + d, z + h],
  ]);
  const left = pts([
    [x, y, z],
    [x + w, y, z],
    [x + w, y, z + h],
    [x, y, z + h],
  ]);
  const right = pts([
    [x + w, y, z],
    [x + w, y + d, z],
    [x + w, y + d, z + h],
    [x + w, y, z + h],
  ]);
  return (
    <motion.g
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{ color }}
    >
      <polygon points={top} fill="currentColor" opacity={0.85} stroke="white" strokeWidth={0.75} />
      <polygon points={left} fill="currentColor" opacity={0.65} stroke="white" strokeWidth={0.75} />
      <polygon points={right} fill="currentColor" opacity={0.5} stroke="white" strokeWidth={0.75} />
    </motion.g>
  );
}

/** One discipline's vertical riser on a visible face, with short branch
 *  ticks reaching into the building interior at every floor. */
function Riser({
  slug,
  face,
  pos,
  active,
  floorMidZs,
  branchTo,
  dashed,
}: {
  slug: string;
  face: "left" | "right";
  pos: number;
  active: boolean;
  floorMidZs: number[];
  branchTo: number;
  dashed?: boolean;
}) {
  const color = SYSTEM_COLOR[slug];
  // left face: fixed y=0, x=pos, z varies. right face: fixed x=BW, y=pos, z varies.
  const riserStart: [number, number, number] = face === "left" ? [pos, 0, 0] : [BW, pos, 0];
  const riserEnd: [number, number, number] = face === "left" ? [pos, 0, FLOORS] : [BW, pos, FLOORS];
  const [x1, y1] = iso(...riserStart);
  const [x2, y2] = iso(...riserEnd);

  const branchPoints = floorMidZs.map((z) => {
    const from: [number, number, number] = face === "left" ? [pos, 0, z] : [BW, pos, z];
    const to: [number, number, number] = face === "left" ? [pos, branchTo, z] : [BW - branchTo, pos, z];
    return { from: iso(...from), to: iso(...to), z };
  });

  // One motion instance per riser (not one per branch tick) — with six
  // risers each animating ~8 sub-elements independently, the diagram was
  // running 50+ concurrent Framer springs during the autoplay sequence,
  // which starved the main thread badly enough that unrelated animations
  // elsewhere on the page (the headline swap) visibly stalled. A single
  // opacity fade on the whole group, with the branches/cap rendered as
  // plain (non-animated) SVG that simply mounts with it, reads almost as
  // well and costs a fraction of the compositing work.
  return (
    <motion.g
      style={{ color }}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="currentColor"
        strokeWidth={2.5}
        strokeDasharray={dashed ? "4 4" : undefined}
      />
      {branchPoints.map(({ from, to, z }) => (
        <line
          key={z}
          x1={from[0]}
          y1={from[1]}
          x2={to[0]}
          y2={to[1]}
          stroke="currentColor"
          strokeWidth={1.75}
          opacity={0.9}
          strokeDasharray={dashed ? "3 3" : undefined}
        />
      ))}
      <circle cx={x2} cy={y2} r={4} fill="currentColor" />
    </motion.g>
  );
}

/** BMS — thin convergence lines from a rooftop control node to every other
 *  system's riser top, drawn once all six systems (including BMS) are live. */
function BmsConvergence({ reduceMotion }: { reduceMotion: boolean }) {
  const node = iso(BW / 2, BD / 2, FLOORS + 0.15);
  const targets: [number, number, number][] = [
    [1, 0, FLOORS],
    [2.5, 0, FLOORS],
    [4, 0, FLOORS],
    [BW, 0.7, FLOORS],
    [BW, 1.5, FLOORS],
    [BW, 2.4, FLOORS],
  ];
  // One fade for the whole convergence fan, not six staggered springs —
  // see the note on Riser above.
  return (
    <motion.g
      stroke="var(--color-steel)"
      strokeWidth={1}
      initial={false}
      animate={{ opacity: 0.7 }}
      transition={{ duration: reduceMotion ? 0 : 0.5 }}
    >
      {targets.map((t, i) => {
        const [tx, ty] = iso(...t);
        return <line key={i} x1={node[0]} y1={node[1]} x2={tx} y2={ty} />;
      })}
      <circle cx={node[0]} cy={node[1]} r={5} fill="var(--color-ink)" />
    </motion.g>
  );
}
