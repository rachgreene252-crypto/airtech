"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BASEMENT_SLAB,
  BUILDING_CENTRE_X,
  COLUMNS,
  EXPLODED_LABEL_Y,
  EXPLODE_STEP,
  GLASS_FACES,
  MASSING,
  MULLIONS,
  PARAPET,
  SITE,
  SITE_GRID,
  SLABS,
  STAGING,
  SYSTEMS,
  SYSTEM_COLOR,
  SYSTEM_SHORT,
  VIEW_ASSEMBLED,
  VIEW_EXPLODED,
  box,
  project,
  type Equipment,
  type SystemGeometry,
  type SystemSlug,
} from "./model";

export { SYSTEM_SHORT };

export type Phase = "brief" | "engineering" | "procurement" | "installation" | "commissioning" | "amc";

const BLUE = "var(--color-brand-blue-vivid)";
const INK = "var(--color-ink-soft)";
const STEEL = "var(--color-steel-soft)";
const LINE = "var(--color-line-strong)";
const PAPER = "var(--color-paper)";
const EASE = [0.22, 1, 0.36, 1] as const;


/**
 * Renders the shared building model. State, not choreography, drives it:
 * the parent decides highlight / exploded / phase and every element
 * transitions to its resting look for that state (opacity + transform
 * only, so it stays cheap on mobile).
 */
export function BuildingModel({
  highlight = null,
  exploded = false,
  phase,
  onHover,
  onSelect,
  className,
  title,
  colorCoded = false,
}: {
  highlight?: SystemSlug | null;
  exploded?: boolean;
  /** Method stage; omit for the finished, operational building. */
  phase?: Phase;
  onHover?: (slug: SystemSlug | null) => void;
  onSelect?: (slug: SystemSlug) => void;
  className?: string;
  title: string;
  /** Draw each system in its own colour (The Building); the Method keeps one blue. */
  colorCoded?: boolean;
}) {
  const reduce = useReducedMotion();
  const t = (d = 0.55, delay = 0) => (reduce ? { duration: 0 } : { duration: d, delay, ease: EASE });

  const complete = !phase;
  const built = complete || phase === "installation" || phase === "commissioning" || phase === "amc";
  const live = complete || phase === "commissioning" || phase === "amc";
  const view = exploded ? VIEW_EXPLODED : VIEW_ASSEMBLED;

  // Architecture opacity: ghosted while a system is isolated.
  const shellOpacity = phase === "brief" ? 0 : highlight && !exploded ? 0.28 : 1;
  const blueprint = phase === "engineering";

  return (
    <motion.svg
      role="img"
      aria-label={title}
      className={className}
      initial={false}
      animate={{ viewBox: view.join(" ") }}
      transition={t(0.8)}
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
    >
      <title>{title}</title>

      {/* Site plane + setting-out grid — the brief stage leans on it. */}
      <motion.g initial={false} animate={{ opacity: exploded ? 0 : phase === "brief" ? 1 : 0.55 }} transition={t()}>
        <path d={SITE} fill="var(--color-paper-raised)" fillOpacity={0.55} stroke={LINE} strokeWidth={0.8} />
        {SITE_GRID.map((d, i) => (
          <path key={i} d={d} stroke={LINE} strokeWidth={0.5} strokeDasharray="2 4" fill="none" />
        ))}
      </motion.g>

      {/* Brief: dashed massing envelope only. */}
      <motion.g initial={false} animate={{ opacity: phase === "brief" ? 1 : 0 }} transition={t()}>
        {MASSING.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={BLUE} strokeWidth={1.2} strokeDasharray="5 5" />
        ))}
      </motion.g>

      {/* Architecture (back) */}
      <motion.g initial={false} animate={{ opacity: shellOpacity }} transition={t()}>
        <path d={BASEMENT_SLAB} fill="none" stroke={LINE} strokeWidth={0.8} strokeDasharray="4 4" />
        {COLUMNS.filter((c) => !c.front).map((c, i) => (
          <path key={i} d={c.d} stroke={blueprint ? BLUE : LINE} strokeWidth={1} strokeDasharray={blueprint ? "4 4" : undefined} />
        ))}
        {SLABS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill={blueprint ? "none" : PAPER}
            fillOpacity={0.72}
            stroke={blueprint ? BLUE : INK}
            strokeOpacity={blueprint ? 0.9 : 0.55}
            strokeWidth={i === 0 || i === SLABS.length - 1 ? 1.3 : 1}
            strokeDasharray={blueprint ? "4 4" : undefined}
          />
        ))}
        <path d={PARAPET} fill="none" stroke={blueprint ? BLUE : INK} strokeOpacity={0.5} strokeWidth={0.8} />
      </motion.g>

      {/* Systems */}
      {SYSTEMS.map((sys, i) => (
        <SystemLayer
          key={sys.slug}
          sys={sys}
          index={i}
          state={systemState(sys.slug, { highlight, exploded, phase })}
          exploded={exploded}
          built={built}
          live={live}
          phase={phase}
          showLabels={highlight === sys.slug && !exploded}
          color={colorCoded && !phase ? SYSTEM_COLOR[sys.slug] : undefined}
          reduce={!!reduce}
          t={t}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}

      {/* Architecture (front): facade columns + curtain wall over the services. */}
      <motion.g
        initial={false}
        animate={{ opacity: phase === "brief" || phase === "engineering" ? 0 : highlight && !exploded ? 0.2 : 1 }}
        transition={t()}
      >
        {COLUMNS.filter((c) => c.front).map((c, i) => (
          <path key={i} d={c.d} stroke={INK} strokeOpacity={0.55} strokeWidth={1.2} />
        ))}
        {GLASS_FACES.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            initial={false}
            animate={{ fillOpacity: live ? 0.13 : 0.05 }}
            transition={t(0.9)}
            fill={live ? BLUE : "var(--color-brand-blue-soft)"}
            stroke={INK}
            strokeOpacity={0.45}
            strokeWidth={1}
          />
        ))}
        {MULLIONS.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={INK} strokeOpacity={0.22} strokeWidth={0.7} />
        ))}
      </motion.g>

      {/* Exploded-view layer titles */}
      <motion.g initial={false} animate={{ opacity: exploded ? 1 : 0 }} transition={t(0.4, exploded ? 0.35 : 0)} aria-hidden="true">
        <LayerTitle x={BUILDING_CENTRE_X} index="00" label="Architecture" active={false} />
        {SYSTEMS.map((s, i) => (
          <LayerTitle
            key={s.slug}
            x={BUILDING_CENTRE_X + EXPLODE_STEP * (i + 1)}
            index={String(i + 1).padStart(2, "0")}
            label={SYSTEM_SHORT[s.slug]}
            active={highlight === s.slug}
            color={colorCoded ? SYSTEM_COLOR[s.slug] : undefined}
            onClick={onSelect ? () => onSelect(s.slug) : undefined}
          />
        ))}
      </motion.g>
    </motion.svg>
  );
}

type LayerState = "normal" | "active" | "muted" | "hidden";

function systemState(
  slug: SystemSlug,
  { highlight, exploded, phase }: { highlight: SystemSlug | null; exploded: boolean; phase?: Phase }
): LayerState {
  if (phase === "brief") return "hidden";
  if (phase === "commissioning" || phase === "amc") return "active";
  if (phase) return "normal";
  if (!highlight) return exploded ? "normal" : "normal";
  return highlight === slug ? "active" : exploded ? "normal" : "muted";
}

function SystemLayer({
  sys,
  index,
  state,
  exploded,
  built,
  live,
  phase,
  showLabels,
  reduce,
  t,
  onHover,
  onSelect,
  color,
}: {
  color?: string;
  sys: SystemGeometry;
  index: number;
  state: LayerState;
  exploded: boolean;
  built: boolean;
  live: boolean;
  phase?: Phase;
  showLabels: boolean;
  reduce: boolean;
  t: (d?: number, delay?: number) => object;
  onHover?: (slug: SystemSlug | null) => void;
  onSelect?: (slug: SystemSlug) => void;
}) {
  const active = state === "active";
  const opacity = state === "hidden" ? 0 : state === "muted" ? 0.1 : active ? 1 : phase ? 0.7 : color ? 0.85 : 0.62;
  const design = phase === "engineering" || phase === "procurement";
  const stroke = color ?? (active || phase === "engineering" ? "var(--color-brand-blue-vivid)" : "var(--color-ink-soft)");
  const dash = design ? "5 4" : sys.dashed ? "2 3" : undefined;
  const offset = exploded ? EXPLODE_STEP * (index + 1) : 0;
  const width = active ? 2.1 : 1.4;

  return (
    <motion.g
      initial={false}
      animate={{ opacity, x: offset }}
      transition={t(0.75, exploded ? index * 0.06 : (5 - index) * 0.04)}
      onPointerEnter={onHover ? () => onHover(sys.slug) : undefined}
      onPointerLeave={onHover ? () => onHover(null) : undefined}
      onClick={onSelect && exploded ? () => onSelect(sys.slug) : undefined}
      style={{ cursor: onSelect && exploded ? "pointer" : undefined }}
    >
      {/* Ghost frame so a pulled-out layer still reads as "this building's" system. */}
      <motion.g initial={false} animate={{ opacity: exploded ? 0.5 : 0 }} transition={t(0.4)}>
        {SLABS.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="var(--color-line)" strokeWidth={0.8} />
        ))}
      </motion.g>

      {sys.runs.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dash}
        />
      ))}
      {sys.branches.map((d, i) => (
        <path key={`b${i}`} d={d} fill="none" stroke={stroke} strokeWidth={width * 0.75} strokeDasharray={dash} />
      ))}
      {sys.terminals.map(([x, y], i) => (
        <circle key={`t${i}`} cx={x} cy={y} r={active ? 2.1 : 1.6} fill={stroke} />
      ))}

      {/* Flow: only once the building is live and this system is in focus. */}
      {live && active && sys.flow && !reduce && (
        <path
          d={sys.flow}
          fill="none"
          stroke="white"
          strokeWidth={width}
          strokeLinecap="round"
          className="flow-dash"
          strokeDasharray="4 18"
          strokeOpacity={0.9}
        />
      )}

      {sys.equipment.map((eq) => (
        <EquipmentBox
          key={eq.id}
          eq={eq}
          stroke={stroke}
          accent={color}
          active={active}
          outline={phase === "engineering"}
          staged={phase === "procurement" || phase === "engineering" ? phase === "procurement" : false}
          built={built}
          service={phase === "amc"}
          showLabel={showLabels && !!eq.label}
          reduce={reduce}
          t={t}
        />
      ))}
    </motion.g>
  );
}

function EquipmentBox({
  eq,
  stroke,
  active,
  outline,
  staged,
  service,
  showLabel,
  reduce,
  t,
  accent,
}: {
  accent?: string;
  eq: Equipment;
  stroke: string;
  active: boolean;
  outline: boolean;
  staged: boolean;
  built: boolean;
  service: boolean;
  showLabel: boolean;
  reduce: boolean;
  t: (d?: number, delay?: number) => object;
}) {
  const b = box(eq.origin, eq.size);
  // Procurement: plant sits in a staging row on site, then moves into place.
  const stage = STAGING[eq.id];
  let dx = 0;
  let dy = 0;
  if (staged && stage) {
    const [ax, ay] = project(eq.origin);
    const [bx, by] = project(stage);
    dx = bx - ax;
    dy = by - ay;
  }
  const tint = accent ? `color-mix(in srgb, ${accent} 16%, white)` : "var(--color-brand-blue-tint)";
  const shade = accent ? `color-mix(in srgb, ${accent} 38%, white)` : "var(--color-brand-blue-soft)";
  const fill = outline ? "none" : active ? tint : "var(--color-paper)";
  const dash = outline ? "3 3" : undefined;
  return (
    <motion.g initial={false} animate={{ x: dx, y: dy }} transition={t(0.9)}>
      <path d={b.top} fill={fill} stroke={stroke} strokeWidth={1} strokeDasharray={dash} />
      <path d={b.left} fill={fill} stroke={stroke} strokeWidth={1} strokeDasharray={dash} />
      <path
        d={b.right}
        fill={outline ? "none" : active ? shade : accent ? tint : "var(--color-paper-raised)"}
        fillOpacity={active ? 0.45 : 1}
        stroke={stroke}
        strokeWidth={1}
        strokeDasharray={dash}
      />
      {service && !reduce && (
        <circle cx={b.centre[0]} cy={b.centre[1]} r={9} fill="none" stroke={BLUE} strokeWidth={1} className="service-ring" />
      )}
      {showLabel && (
        <g aria-hidden="true">
          <path
            d={`M${b.topCentre[0]},${b.topCentre[1]} l14,-14 h6`}
            fill="none"
            stroke={accent ?? BLUE}
            strokeWidth={0.8}
          />
          <text
            x={b.topCentre[0] + 23}
            y={b.topCentre[1] - 11}
            fontSize={9}
            fontFamily="var(--font-mono)"
            letterSpacing="0.06em"
            fill="var(--color-ink)"
            style={{ paintOrder: "stroke" }}
            stroke="var(--color-paper)"
            strokeWidth={3}
          >
            {eq.label.toUpperCase()}
          </text>
        </g>
      )}
    </motion.g>
  );
}

function LayerTitle({
  x,
  index,
  label,
  active,
  onClick,
  color,
}: {
  color?: string;
  x: number;
  index: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <g onClick={onClick} style={{ cursor: onClick ? "pointer" : undefined }}>
      <line x1={x - 44} x2={x + 44} y1={EXPLODED_LABEL_Y - 18} y2={EXPLODED_LABEL_Y - 18} stroke={color ?? (active ? BLUE : STEEL)} strokeWidth={active ? 2.4 : color ? 1.6 : 1} />
      <text x={x} y={EXPLODED_LABEL_Y + 2} textAnchor="middle" fontSize={15} fontFamily="var(--font-mono)" letterSpacing="0.12em" fill={active ? BLUE : STEEL}>
        {index}
      </text>
      <text x={x} y={EXPLODED_LABEL_Y + 24} textAnchor="middle" fontSize={18} fontWeight={600} fill={active ? BLUE : "var(--color-ink)"}>
        {label}
      </text>
    </g>
  );
}
