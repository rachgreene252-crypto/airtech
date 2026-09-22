"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/content/projects";
import { NEPAL_PATH_SMOOTH } from "@/lib/geo";

/**
 * "Where we've built" — a real map of delivered work, not a decorative
 * device. Every pin here is derived directly from content/projects.ts's own
 * `location` field (no separate dataset to drift out of sync), plotted on
 * the same accurate Nepal trace shared with BuiltForNepal (src/lib/geo.ts).
 *
 * Rebuilt 2026-09-16 — the previous version only ever showed one dot per
 * region, sized by project count; a click just swapped a side list. Client
 * feedback wanted an actual map that "zooms into Kathmandu and other
 * provinces and shows all the projects flagged... in a tidy way," a more
 * intricate outline, and a white map surface. This version: (1) a smoothed
 * outline (see lib/geo.ts) instead of a jagged low-poly trace, (2) a real
 * zoom — selecting a region pans/scales the whole scene onto it via a
 * single transformed <g>, (3) every project in the focused region gets its
 * own numbered pin, fanned out in a compact grid above the region (a
 * "spiderfy," the standard cartography technique for co-located markers) so
 * even Kathmandu's ~24 projects render without overlapping, and (4) a
 * plain white map card, no gradient wash, so the outline and pins read
 * clearly against it.
 */
type Region = {
  key: string;
  label: string;
  x: number;
  y: number;
  match: (location: string) => boolean;
  /** Label anchor at country-view zoom — Bhairahawa and Parasi sit real-
   * world close together, so their labels collide unless one is flipped
   * below its pin. */
  labelSide?: "above" | "below";
};

const REGIONS: Region[] = [
  {
    key: "kathmandu-valley",
    label: "Kathmandu Valley",
    x: 258.7,
    y: 151.8,
    match: (loc) => /kathmandu|lalitpur|naxal|thamel|baneshwor|gairidhara|lainchaur|harisiddhi/i.test(loc),
  },
  {
    key: "bhairahawa",
    label: "Bhairahawa",
    x: 166.8,
    y: 161.3,
    match: (loc) => /bhairahawa/i.test(loc),
  },
  {
    key: "parasi",
    label: "Parasi",
    x: 176.9,
    y: 160.1,
    match: (loc) => /parasi/i.test(loc),
    labelSide: "below",
  },
  {
    key: "birgunj",
    label: "Birgunj",
    x: 236.7,
    y: 188.6,
    match: (loc) => /birgunj/i.test(loc),
  },
];

const VB_W = 400;
const VB_H = 225;
const CENTER: [number, number] = [VB_W / 2, VB_H / 2];
const ZOOM = 3.6;
const BLUE = "#008ed1";

function regionProjects(region: Region) {
  return projects.filter((p) => p.location && region.match(p.location));
}

/** Compact grid of positions (pre-scale, "screen" units) fanned above a
 * base point, so N co-located pins never overlap regardless of N. */
function fanPositions(n: number, gap = 15) {
  const cols = Math.max(1, Math.ceil(Math.sqrt(n)));
  const rows = Math.ceil(n / cols);
  const positions: { dx: number; dy: number }[] = [];
  for (let i = 0; i < n; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    positions.push({
      dx: (col - (cols - 1) / 2) * gap,
      dy: -18 - (rows - 1 - row) * gap,
    });
  }
  return positions;
}

export function ProjectsMap() {
  const regionsWithWork = useMemo(
    () => REGIONS.map((r) => ({ region: r, items: regionProjects(r) })).filter((r) => r.items.length > 0),
    []
  );
  const [selected, setSelected] = useState<number | null>(regionsWithWork.length > 0 ? 0 : null);
  const reduceMotion = useReducedMotion();
  const maxCount = Math.max(1, ...regionsWithWork.map((r) => r.items.length));

  if (regionsWithWork.length === 0) return null;

  const active = selected !== null ? regionsWithWork[selected] : null;
  const scale = active ? ZOOM : 1;
  const focus = active ? active.region : null;
  const tx = focus ? CENTER[0] - focus.x * scale : 0;
  const ty = focus ? CENTER[1] - focus.y * scale : 0;
  const fanned = active ? fanPositions(active.items.length) : [];

  return (
    <section className="border-t border-(--color-line) bg-site-texture py-14 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
              Notable projects
            </p>
            <h2 className="mt-5 font-display text-display-l font-semibold leading-[1.08] tracking-[-0.015em] text-(--color-ink) text-balance">
              Delivered across {regionsWithWork.length} regions of Nepal.
            </h2>
            <p className="mt-4 text-body-l leading-relaxed text-(--color-steel)">
              A selection of delivered work, not the complete portfolio. Select a region to zoom in and
              explore.
            </p>
          </div>
        </Reveal>

        {/* Region switcher — a direct, accessible way to jump regions
            without relying on hitting small map targets. */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className={`rounded-xs border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
                selected === null
                  ? "border-(--color-brand-blue-vivid) bg-(--color-brand-blue-vivid) text-white"
                  : "border-(--color-line-strong) text-(--color-steel) hover:border-(--color-brand-blue)"
              }`}
            >
              All regions
            </button>
            {regionsWithWork.map(({ region, items }, i) => (
              <button
                key={region.key}
                type="button"
                onClick={() => setSelected(i)}
                className={`rounded-xs border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  selected === i
                    ? "border-(--color-brand-blue-vivid) bg-(--color-brand-blue-vivid) text-white"
                    : "border-(--color-line-strong) text-(--color-steel) hover:border-(--color-brand-blue)"
                }`}
              >
                {region.label} · {items.length}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-[16/9] w-full max-w-2xl overflow-hidden border border-(--color-line-strong) bg-white">
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="h-full w-full"
                role="img"
                aria-label={
                  active
                    ? `Map of Nepal zoomed into ${active.region.label}, showing ${active.items.length} Airtech projects`
                    : "Map of Nepal showing regions where Airtech has delivered projects"
                }
              >
                {/* Framer's x/y/scale shortcuts apply via a CSS pixel
                    transform, which doesn't match SVG user-space units once
                    the viewBox scales the element to the container — the pan
                    math below assumes real user-space numbers, so this sets
                    the `transform` attribute directly and animates it with a
                    plain CSS transition (SVG's `transform` presentation
                    attribute has supported CSS transitions in every evergreen
                    browser for years). */}
                <g
                  transform={`translate(${tx} ${ty}) scale(${scale})`}
                  style={reduceMotion ? undefined : { transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
                >
                  <path
                    d={NEPAL_PATH_SMOOTH}
                    fill="var(--color-brand-blue-tint)"
                    stroke="var(--color-brand-blue)"
                    strokeWidth={1.6}
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />

                  {/* Region pins — always present so the zoomed-in scene
                      still shows where the focused region sits, and so a
                      click on a neighbouring pin can jump straight there. */}
                  {regionsWithWork.map(({ region, items }, i) => {
                    const isActive = selected === i;
                    const r = (3 + (items.length / maxCount) * 5) / scale;
                    return (
                      <g
                        key={region.key}
                        role="button"
                        tabIndex={0}
                        aria-label={`Show ${items.length} project${items.length === 1 ? "" : "s"} in ${region.label}`}
                        onClick={() => setSelected(i)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") setSelected(i);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {isActive && !reduceMotion && (
                          <motion.circle
                            cx={region.x}
                            cy={region.y}
                            r={r}
                            fill="none"
                            stroke="var(--color-brand-blue)"
                            strokeWidth={1.2 / scale}
                            initial={{ r, opacity: 0.8 }}
                            animate={{ r: r + 10 / scale, opacity: 0 }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                          />
                        )}
                        <circle
                          cx={region.x}
                          cy={region.y}
                          r={r}
                          fill={isActive ? "var(--color-brand-blue-vivid)" : "var(--color-brand-blue)"}
                          stroke="white"
                          strokeWidth={1.2 / scale}
                          opacity={isActive ? 1 : 0.55}
                          style={{ transition: "opacity 0.2s ease" }}
                        />
                        {!active && (
                          <text
                            x={region.x}
                            y={region.labelSide === "below" ? region.y + r + 13 : region.y - r - 6}
                            textAnchor="middle"
                            style={{
                              fill: "var(--color-ink)",
                              fontSize: 9,
                              fontWeight: 600,
                              fontFamily: "var(--font-sans)",
                              pointerEvents: "none",
                              opacity: isActive ? 1 : 0.7,
                            }}
                          >
                            {region.label}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* The focused region's projects, fanned into a tidy grid
                      above it — a "spiderfy," so a region with 20+ projects
                      never overlaps regardless of count. Sizes are
                      pre-divided by `scale` so pins read as a constant size
                      on screen no matter how far zoomed in. */}
                  {active &&
                    active.items.map((p, i) => {
                      const pos = fanned[i];
                      const px = focus!.x + pos.dx / scale;
                      const py = focus!.y + pos.dy / scale;
                      const r = 6.5 / scale;
                      return (
                        <a key={p.slug} href={`/projects/${p.slug}`}>
                          <g style={{ cursor: "pointer" }}>
                            <line
                              x1={focus!.x}
                              y1={focus!.y}
                              x2={px}
                              y2={py + r}
                              stroke={BLUE}
                              strokeOpacity={0.4}
                              strokeWidth={1}
                              vectorEffect="non-scaling-stroke"
                            />
                            <circle cx={px} cy={py} r={r} fill={BLUE} stroke="white" strokeWidth={1.4 / scale} />
                            <text
                              x={px}
                              y={py}
                              textAnchor="middle"
                              dominantBaseline="central"
                              style={{
                                fill: "white",
                                fontSize: 7.5 / scale,
                                fontWeight: 700,
                                fontFamily: "var(--font-sans)",
                                pointerEvents: "none",
                              }}
                            >
                              {i + 1}
                            </text>
                            <title>{p.name}</title>
                          </g>
                        </a>
                      );
                    })}
                </g>
              </svg>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="border border-(--color-line-strong) bg-(--color-paper) p-6">
              <div className="flex items-center justify-between border-b border-(--color-line) pb-3">
                <p className="text-label font-semibold uppercase tracking-[0.1em] text-(--color-steel-soft)">
                  Delivered work
                </p>
                {active && (
                  <p className="text-label font-semibold uppercase tracking-[0.1em] text-(--color-brand-blue)">
                    {active.items.length} project{active.items.length === 1 ? "" : "s"}
                  </p>
                )}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                {active ? (
                  <motion.div
                    key={active.region.key}
                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="mt-4 font-display text-title font-semibold text-(--color-ink)">
                      {active.region.label}
                    </h3>
                    <ul className="mt-4 flex max-h-[22rem] flex-col gap-1 overflow-y-auto pr-1">
                      {active.items.map((p, i) => (
                        <li key={p.slug}>
                          <a
                            href={`/projects/${p.slug}`}
                            className="group flex items-center gap-3 border-b border-(--color-line) py-2.5 text-body text-(--color-ink-soft) transition-colors hover:text-(--color-brand-blue)"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--color-brand-blue-tint) text-[11px] font-bold text-(--color-brand-blue)">
                              {i + 1}
                            </span>
                            <span className="flex-1">{p.name}</span>
                            <span aria-hidden="true" className="text-(--color-brand-blue) opacity-0 transition-opacity group-hover:opacity-100">
                              →
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.p
                    key="overview"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-body text-(--color-steel) leading-relaxed"
                  >
                    Select a region above, or a pin on the map, to zoom in and see every project delivered
                    there.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
