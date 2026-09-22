"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pathFrom, pointOnPath, projectPt, boxFaces, type Vec3 } from "./iso";
import {
  COLUMNS,
  SLAB_OUTLINE,
  FLOOR_OUTLINE,
  LANES,
  LANE_ORDER,
  BMS_TIE_X,
  BAY,
  type DisciplineSlug,
  type Branch,
  type TerminalKind,
} from "./layout";

const BLUE = "#008ed1";
// Recoloured 2026-09-16 — the default/dimmed palette was neutral graphite
// and silver, which read as "just a grey technical drawing" (client:
// "work on the airtech blue, take it from the logo"). Both are now
// desaturated tints of the same brand-blue hue, so the whole diagram reads
// as blue-branded even before a discipline is selected, not just at the
// one active moment.
const GRAPHITE = "#5b7d94";
const SILVER_LIGHT = "#bcd4e3";

export type Highlight = "all" | DisciplineSlug | "bms-systems-integration";

function strokeFor(isActive: boolean, isDimmed: boolean, base: string) {
  if (isActive) return BLUE;
  if (isDimmed) return SILVER_LIGHT;
  return base;
}

function opacityFor(isActive: boolean, isDimmed: boolean, base: number) {
  if (isActive) return 1;
  if (isDimmed) return 0.22;
  return base;
}

/* ------------------------------------------------------------------ */
/* Terminal equipment glyphs                                           */
/* ------------------------------------------------------------------ */

const BOX_SIZE: Partial<Record<TerminalKind, Vec3>> = {
  ahu: [1.6, 1.3, 1.3],
  panel: [0.9, 1.5, 0.32],
  rack: [0.7, 1.3, 0.5],
};

function Terminal({
  branch,
  color,
  opacity,
  active,
}: {
  branch: Branch;
  color: string;
  opacity: number;
  active: boolean;
}) {
  const { to, kind } = branch;

  if (kind === "ahu" || kind === "panel" || kind === "rack") {
    const size = BOX_SIZE[kind]!;
    const origin: Vec3 = [to[0] - size[0] / 2, to[1] - size[1], to[2] - size[2] / 2];
    const { top, front, side } = boxFaces(origin, size);
    // A literal glyph on the front face — a fan for the AHU, a bolt for the
    // panel, rack ticks for the ELV cabinet — so the box reads as that
    // specific piece of equipment, not just "a box," the moment it's
    // highlighted. Centred roughly on the projected front face.
    const [fx, fy] = projectPt([to[0], to[1] - size[1] / 2, origin[2]]);
    return (
      <g style={{ opacity, transition: "opacity 0.4s ease" }}>
        <polygon points={side} fill={color} fillOpacity={0.16} stroke={color} strokeWidth={1} />
        <polygon points={front} fill={color} fillOpacity={0.1} stroke={color} strokeWidth={1} />
        <polygon points={top} fill={color} fillOpacity={0.22} stroke={color} strokeWidth={1} />
        {kind === "ahu" && (
          <g stroke={color} strokeWidth={1} fill="none" opacity={active ? 1 : 0.7}>
            <circle cx={fx} cy={fy} r={5.5} />
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return <line key={deg} x1={fx} y1={fy} x2={fx + Math.cos(rad) * 5} y2={fy + Math.sin(rad) * 5} />;
            })}
          </g>
        )}
        {kind === "panel" && (
          <path
            d={`M ${fx + 2} ${fy - 6} L ${fx - 3} ${fy + 1} L ${fx} ${fy + 1} L ${fx - 2} ${fy + 6} L ${fx + 3} ${fy - 1} L ${fx} ${fy - 1} Z`}
            fill={color}
            opacity={active ? 1 : 0.75}
          />
        )}
        {kind === "rack" && (
          <g stroke={color} strokeWidth={0.9} opacity={active ? 1 : 0.7}>
            {[-3, 0, 3].map((dy2) => (
              <line key={dy2} x1={fx - 4} y1={fy + dy2} x2={fx + 4} y2={fy + dy2} />
            ))}
          </g>
        )}
      </g>
    );
  }

  const [px, py] = projectPt(to);

  if (kind === "sprinkler" || kind === "valve" || kind === "node") {
    const r = kind === "node" ? 3.4 : 3.2;
    return (
      <g style={{ opacity, transition: "opacity 0.4s ease" }}>
        {kind === "sprinkler" &&
          [0, 90, 180, 270].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x2 = px + Math.cos(rad) * 7.5;
            const y2 = py + Math.sin(rad) * 7.5;
            return (
              <line
                key={deg}
                x1={px}
                y1={py}
                x2={active ? x2 : px + Math.cos(rad) * 4.5}
                y2={active ? y2 : py + Math.sin(rad) * 4.5}
                stroke={color}
                strokeWidth={1}
                style={{ transition: "all 0.4s ease" }}
              />
            );
          })}
        {kind === "node" && (
          <rect x={px - 4} y={py - 4} width={8} height={8} fill="none" stroke={color} strokeWidth={1} transform={`rotate(45 ${px} ${py})`} />
        )}
        <circle cx={px} cy={py} r={r} fill={kind === "valve" ? color : "var(--color-paper)"} fillOpacity={kind === "valve" ? 0.85 : 1} stroke={color} strokeWidth={1.2} />
        {kind === "valve" && (
          <g stroke="var(--color-paper)" strokeWidth={1}>
            <line x1={px - 2.1} y1={py} x2={px + 2.1} y2={py} />
            <line x1={px} y1={py - 2.1} x2={px} y2={py + 2.1} />
          </g>
        )}
      </g>
    );
  }

  // diffuser / cap — small flat terminal plate
  return (
    <g style={{ opacity, transition: "opacity 0.4s ease" }}>
      <rect x={px - 6} y={py - 3} width={12} height={6} fill="var(--color-paper)" stroke={color} strokeWidth={1.1} />
      {kind === "diffuser" &&
        [-3.5, 0, 3.5].map((dx) => (
          <line key={dx} x1={px + dx} y1={py - 3} x2={px + dx} y2={py + 3} stroke={color} strokeWidth={0.8} />
        ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* On-diagram equipment labels                                         */
/* ------------------------------------------------------------------ */

/**
 * Names the equipment next to the equipment, only for the one lane a
 * visitor has selected. This is the direct fix for "a layman can't tell
 * what this is" — the diagram previously explained itself only through an
 * abstract shape plus a caption below the whole drawing; now the drawing
 * labels itself. A paper-coloured text stroke (paint-order: stroke) knocks
 * a legible cutout around each label without hand-authoring background
 * rectangles per label.
 */
function Callout({ x, y, dx, dy, text, color }: { x: number; y: number; dy: number; dx: number; text: string; color: string }) {
  const tx = x + dx;
  const ty = y + dy;
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <line x1={x} y1={y} x2={tx - (dx > 0 ? 5 : -5)} y2={ty} stroke={color} strokeWidth={0.85} />
      <circle cx={x} cy={y} r={1.6} fill={color} />
      <text
        x={tx}
        y={ty}
        textAnchor={dx > 0 ? "start" : "end"}
        dominantBaseline="middle"
        fontSize={10.5}
        fontFamily="var(--font-sans)"
        fontWeight={600}
        stroke="var(--color-paper)"
        strokeWidth={4}
        paintOrder="stroke"
        fill={color}
      >
        {text}
      </text>
    </motion.g>
  );
}

/* ------------------------------------------------------------------ */
/* One discipline lane: trunk + branches                               */
/* ------------------------------------------------------------------ */

function LaneGroup({
  slug,
  isNew,
  active,
  dimmed,
  allMode,
  reduceMotion,
}: {
  slug: DisciplineSlug;
  isNew: boolean;
  active: boolean;
  dimmed: boolean;
  allMode: boolean;
  reduceMotion: boolean;
}) {
  const lane = LANES.find((l) => l.slug === slug)!;
  const color = strokeFor(active, dimmed, GRAPHITE);
  const trunkOpacity = allMode ? 1 : opacityFor(active, dimmed, 0.85);
  const emphasized = active || allMode;
  const d = pathFrom(lane.trunk);

  const riserPoint = lane.riser ? pointOnPath(lane.trunk, lane.riser.t) : null;
  const riserBase: Vec3 | null = riserPoint ? [riserPoint[0], 0, riserPoint[2]] : null;
  const riserPath = riserPoint && riserBase ? pathFrom([riserPoint, riserBase]) : null;

  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={emphasized ? 2.6 : 2}
        strokeLinecap="round"
        initial={isNew && !reduceMotion ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: trunkOpacity }}
        transition={{ pathLength: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.5 } }}
        style={!isNew || reduceMotion ? { transition: "stroke 0.4s ease, opacity 0.4s ease, stroke-width 0.3s ease" } : undefined}
      />

      {riserPath && (
        <motion.path
          d={riserPath}
          fill="none"
          stroke={color}
          strokeWidth={emphasized ? 2.2 : 1.6}
          strokeDasharray={slug === "elv-security" ? "1 3" : undefined}
          initial={isNew && !reduceMotion ? { pathLength: 0, opacity: 0 } : false}
          animate={{ pathLength: 1, opacity: trunkOpacity * 0.9 }}
          transition={{ pathLength: { duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.5, delay: 0.3 } }}
        />
      )}

      {lane.branches.map((b, i) => {
        const from = pointOnPath(lane.trunk, b.t);
        const branchD = pathFrom([from, b.to]);
        return (
          <g key={i}>
            <motion.path
              d={branchD}
              fill="none"
              stroke={color}
              strokeWidth={emphasized ? 1.8 : 1.3}
              strokeDasharray={slug === "elv-security" ? "1 3" : undefined}
              initial={isNew && !reduceMotion ? { pathLength: 0, opacity: 0 } : false}
              animate={{ pathLength: 1, opacity: trunkOpacity * 0.9 }}
              transition={{
                pathLength: { duration: 0.5, delay: 0.35 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.4, delay: 0.35 + i * 0.08 },
              }}
            />
            <Terminal branch={b} color={color} opacity={trunkOpacity} active={emphasized} />
            {active && b.label && (
              <Callout
                x={projectPt(b.to)[0]}
                y={projectPt(b.to)[1]}
                dx={i % 2 === 0 ? 15 : -15}
                dy={-14 - (i % 3) * 3}
                text={b.label}
                color={BLUE}
              />
            )}
          </g>
        );
      })}

      {lane.riser && riserBase && (
        <Terminal branch={{ t: lane.riser.t, to: riserBase, kind: lane.riser.kind }} color={color} opacity={trunkOpacity * 0.9} active={emphasized} />
      )}

      {/* Flow — a small pulse travelling the trunk on a loop, only while this
          lane is the active selection: the literal idea that these are
          live, running systems, not static lines. */}
      {active && !reduceMotion && (
        <>
          {[0, 1].map((p) => (
            <motion.circle
              key={p}
              r={2.6}
              fill={BLUE}
              initial={false}
              animate={{
                cx: [projectPt(lane.trunk[0])[0], projectPt(lane.trunk[lane.trunk.length - 1])[0]],
                cy: [projectPt(lane.trunk[0])[1], projectPt(lane.trunk[lane.trunk.length - 1])[1]],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: p * 1.2 }}
            />
          ))}
        </>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Structural framework                                                */
/* ------------------------------------------------------------------ */

function Structure() {
  return (
    <g opacity={0.95}>
      <path d={pathFrom(SLAB_OUTLINE)} fill="var(--color-brand-blue-tint)" fillOpacity={0.8} stroke={GRAPHITE} strokeWidth={1.4} />
      <path d={pathFrom(FLOOR_OUTLINE)} fill="none" stroke={SILVER_LIGHT} strokeWidth={1} strokeDasharray="2 3" />
      {COLUMNS.map((c, i) => {
        const top: Vec3 = [c[0], BAY.height, c[2]];
        const [bx, by] = projectPt(c);
        return (
          <g key={i}>
            <path d={pathFrom([c, top])} stroke={GRAPHITE} strokeWidth={2} fill="none" />
            <rect x={bx - 3} y={by - 3} width={6} height={6} fill="var(--color-paper)" stroke={GRAPHITE} strokeWidth={1.2} />
          </g>
        );
      })}
      {/* A couple of soffit joist lines for texture, restrained. */}
      {[1.6, 3.4].map((z) => (
        <path
          key={z}
          d={pathFrom([
            [0, BAY.height, z],
            [10, BAY.height, z],
          ])}
          stroke={SILVER_LIGHT}
          strokeWidth={0.6}
          fill="none"
        />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* BMS coordination ties                                               */
/* ------------------------------------------------------------------ */

function BmsTies({ visible, active, reduceMotion }: { visible: boolean; active: boolean; reduceMotion: boolean }) {
  if (!visible) return null;
  const color = active ? BLUE : "#5b6b7d";
  return (
    <g>
      {BMS_TIE_X.map((x, tieIdx) => {
        const pts: Vec3[] = LANE_ORDER.map((slug) => {
          const lane = LANES.find((l) => l.slug === slug)!;
          const t = (x - lane.trunk[0][0]) / (lane.trunk[1][0] - lane.trunk[0][0]);
          return pointOnPath(lane.trunk, Math.max(0, Math.min(1, t)));
        });
        const d = pathFrom(pts);
        return (
          <g key={x}>
            <motion.path
              d={d}
              fill="none"
              stroke={color}
              strokeWidth={active ? 1.6 : 1.1}
              strokeDasharray="1 3.5"
              initial={!reduceMotion ? { pathLength: 0, opacity: 0 } : false}
              animate={{ pathLength: 1, opacity: active ? 0.95 : 0.55 }}
              transition={{ pathLength: { duration: 1.1, delay: tieIdx * 0.25, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.5 } }}
            />
            {pts.map((p, i) => {
              const [px, py] = projectPt(p);
              return (
                <motion.rect
                  key={i}
                  x={px - 2.6}
                  y={py - 2.6}
                  width={5.2}
                  height={5.2}
                  fill="var(--color-paper)"
                  stroke={color}
                  strokeWidth={1}
                  transform={`rotate(45 ${px} ${py})`}
                  initial={!reduceMotion ? { opacity: 0, scale: 0 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.3 + tieIdx * 0.25 + i * 0.06 }}
                  style={{ transformOrigin: `${px}px ${py}px` }}
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Scene                                                                */
/* ------------------------------------------------------------------ */

export function EngineeringScene({ stage, highlight }: { stage: number; highlight: Highlight }) {
  const reduceMotion = !!useReducedMotion();
  const laneVisible = (i: number) => stage >= i + 1;
  const bmsVisible = stage >= 6;

  return (
    <svg
      viewBox="-212 -299 606 644"
      className="h-auto w-full"
      role="img"
      aria-label="Isometric diagram of Airtech's coordinated MEP systems: HVAC ductwork, electrical cable tray, plumbing, fire protection and ELV, tied together by BMS"
    >
      <Structure />
      {LANE_ORDER.map((slug, i) => {
        if (!laneVisible(i)) return null;
        const active = highlight === slug;
        const dimmed = highlight !== "all" && highlight !== slug;
        return (
          <LaneGroup
            key={slug}
            slug={slug}
            isNew={stage === i + 1}
            active={active}
            dimmed={dimmed}
            allMode={highlight === "all"}
            reduceMotion={reduceMotion}
          />
        );
      })}
      <BmsTies visible={bmsVisible} active={highlight === "bms-systems-integration"} reduceMotion={reduceMotion} />
    </svg>
  );
}
