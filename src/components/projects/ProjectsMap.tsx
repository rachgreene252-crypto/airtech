"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/content/projects";

/**
 * "Where we've built" — a real map of delivered work, not a decorative
 * device. Added 2026-09-16 per "enhance the UI even more, add more things
 * if you think they are needed" — a genuine differentiator competitor MEP
 * sites don't have: every pin here is derived directly from
 * content/projects.ts's own `location` field (no separate dataset to drift
 * out of sync), plotted on the same accurate Nepal trace built for
 * BuiltForNepal (extracted from the client's reference outline via OpenCV
 * contour detection, not hand-drawn).
 *
 * Regions are a real-world grouping (Kathmandu + Lalitpur share one valley,
 * so one pin), not an arbitrary bucket — coordinates are projected from
 * each town's actual latitude/longitude against Nepal's real bounding box,
 * the same method used for the BuiltForNepal markers.
 */
type Region = {
  key: string;
  label: string;
  x: number;
  y: number;
  match: (location: string) => boolean;
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
  },
  {
    key: "birgunj",
    label: "Birgunj",
    x: 236.7,
    y: 188.6,
    match: (loc) => /birgunj/i.test(loc),
  },
];

const NEPAL_PATH =
  "M15.4,38 L0,89 L22,105.6 L54.6,116.3 L60.5,128.8 L87.2,144.8 L127.6,155.5 L129.4,165.6 L152.5,168.5 L158.5,175.1 L165.6,168.5 L222,173.3 L223.7,189.9 L255.2,206.5 L276,204.2 L284.3,215.4 L312.2,213.6 L357.3,224.9 L395.8,217.8 L400,198.2 L391.1,181.6 L395.3,135.9 L378.6,132.3 L373.9,137.7 L346,139.5 L325.2,125.8 L313.4,132.3 L302.7,132.3 L299.7,123.4 L284.9,125.8 L276,111.6 L252.8,114.5 L251,98.5 L228.5,99.7 L205.3,84.3 L203,66.5 L191.1,60.5 L169.1,65.3 L157.3,47.5 L107.4,19.6 L99.7,3.6 L67.1,0 L64.1,14.2 L42.7,10.7 Z";

function regionProjects(region: Region) {
  return projects.filter((p) => p.location && region.match(p.location));
}

export function ProjectsMap() {
  const regionsWithWork = REGIONS.map((r) => ({ region: r, items: regionProjects(r) })).filter(
    (r) => r.items.length > 0
  );
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const maxCount = Math.max(...regionsWithWork.map((r) => r.items.length));
  const activeRegion = regionsWithWork[active];

  if (regionsWithWork.length === 0) return null;

  return (
    <section className="border-t border-(--color-line) bg-soft-glow py-14 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
              Where we&apos;ve built
            </p>
            <h2 className="mt-5 font-display text-display-l font-semibold leading-[1.08] tracking-[-0.015em] text-(--color-ink) text-balance">
              {projects.length} projects, {regionsWithWork.length} regions of Nepal.
            </h2>
            <p className="mt-4 text-body-l leading-relaxed text-(--color-steel)">
              Select a region to see the work delivered there.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-[16/9] w-full max-w-xl">
              <svg viewBox="0 0 400 225" className="h-full w-full" role="img" aria-label="Map of Nepal showing regions where Airtech has delivered projects">
                <path d={NEPAL_PATH} fill="var(--color-brand-blue-tint)" stroke="var(--color-brand-blue)" strokeWidth={2} strokeLinejoin="round" />
                {regionsWithWork.map(({ region, items }, i) => {
                  const isActive = active === i;
                  const r = 4 + (items.length / maxCount) * 7;
                  return (
                    <g
                      key={region.key}
                      role="button"
                      tabIndex={0}
                      aria-label={`Show ${items.length} project${items.length === 1 ? "" : "s"} in ${region.label}`}
                      onClick={() => setActive(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setActive(i);
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
                          strokeWidth={1.5}
                          initial={{ r, opacity: 0.8 }}
                          animate={{ r: r + 14, opacity: 0 }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                      <circle
                        cx={region.x}
                        cy={region.y}
                        r={r}
                        fill={isActive ? "var(--color-brand-blue-vivid)" : "var(--color-brand-blue)"}
                        stroke="white"
                        strokeWidth={1.5}
                        opacity={isActive ? 1 : 0.7}
                        style={{ transition: "opacity 0.2s ease" }}
                      />
                      {/* Only the active pin gets a label — Bhairahawa and
                          Parasi sit real-world close together, so labelling
                          every pin at once collided them into unreadable
                          overlap. The panel beside the map already names
                          whichever region is selected. */}
                      {isActive && (
                        <text
                          x={region.x}
                          y={region.y - r - 8}
                          textAnchor="middle"
                          style={{
                            fill: "var(--color-ink)",
                            fontSize: 12,
                            fontWeight: 700,
                            fontFamily: "var(--font-mono)",
                            pointerEvents: "none",
                          }}
                        >
                          {region.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="border border-(--color-line-strong) bg-(--color-paper) p-6">
              <div className="flex items-center justify-between border-b border-(--color-line) pb-3">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-(--color-steel-soft)">
                  Delivered work
                </p>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-(--color-brand-blue)">
                  {activeRegion.items.length} project{activeRegion.items.length === 1 ? "" : "s"}
                </p>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeRegion.region.key}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="mt-4 font-display text-title font-semibold text-(--color-ink)">
                    {activeRegion.region.label}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-1">
                    {activeRegion.items.slice(0, 6).map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/projects/${p.slug}` as Route}
                          className="group flex items-center justify-between gap-3 border-b border-(--color-line) py-2.5 text-body text-(--color-ink-soft) transition-colors hover:text-(--color-brand-blue)"
                        >
                          {p.name}
                          <span aria-hidden="true" className="text-(--color-brand-blue) opacity-0 transition-opacity group-hover:opacity-100">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {activeRegion.items.length > 6 && (
                    <p className="mt-3 text-small text-(--color-steel-soft)">
                      + {activeRegion.items.length - 6} more in {activeRegion.region.label}.
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
