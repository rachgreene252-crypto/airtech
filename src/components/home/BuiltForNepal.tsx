"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { NEPAL_PATH_SMOOTH } from "@/lib/geo";

/**
 * "Built for Nepal" — the four facts below are general, well-established
 * engineering context for Nepal (seismic hazard zone, monsoon climate,
 * altitude's effect on air-handling equipment, dense historic urban
 * fabric), not invented Airtech-specific claims, used to ground "great at
 * their work" in the actual place they work, rather than a generic
 * MEP-anywhere pitch.
 *
 * Rebuilt 2026-09-16: the heading framed this as being about "the
 * Kathmandu Valley" specifically, per feedback ("it's Nepal not Kathmandu
 * Valley"), when Airtech's work spans the country. Reframed to Nepal as a
 * whole, and made genuinely interactive per "add something more
 * interesting ... a little interactive and eye catchy": a stylised map of
 * Nepal with a marker per fact, selecting a fact pulses its marker,
 * instead of a static rule-separated list.
 */
const FACTS = [
  {
    label: "Seismic zone",
    body: "The Kathmandu Valley sits in one of the world's most active seismic regions. Every system is designed and fixed accordingly, not as an afterthought.",
    marker: { x: 64.5, y: 66.7 },
  },
  {
    label: "Monsoon climate",
    body: "Four months of monsoon humidity a year shape how HVAC, electrical and drainage systems are specified across Nepal, not just how they're installed.",
    marker: { x: 41.3, y: 53.3 },
  },
  {
    label: "Altitude & air density",
    body: "Elevation across Nepal's hills and mountains changes how air-conditioning and ventilation equipment actually performs. Selection accounts for it from the outset.",
    marker: { x: 50, y: 28.9 },
  },
  {
    label: "Dense historic fabric",
    body: "Narrow lanes, older foundations, live neighbouring structures: retrofit and new-build work in Nepal's older cities both demand a different kind of coordination.",
    marker: { x: 67.5, y: 64.4 },
  },
] as const;

// 2026-09-16 — the earlier freehand blob ("it is wrong") is replaced with a
// real trace of Nepal's actual outline: the client supplied a reference
// outline image, which was run through an OpenCV contour extraction
// (threshold, fill, findContours, approxPolyDP) rather than hand-drawn
// again, so this is a geometrically accurate simplification of the real
// national boundary, not another approximation. viewBox is 400x225 (the
// traced shape's own bounding box, normalised); marker positions below are
// checked to fall inside this exact polygon.
export function BuiltForNepal() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-(--color-line) bg-site-texture py-20 sm:py-28">
      <Container className="relative">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:items-center">
          <Reveal>
            <div>
              <p className="flex items-center gap-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">
                <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue)" />
                Engineered for Nepal
              </p>
              <h2 className="mt-6 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.015em] text-balance text-(--color-ink)">
                Built for Nepal, from the valley to the high country.
              </h2>
              <p className="mt-6 max-w-md text-body-l leading-relaxed text-(--color-steel)">
                A design that works in Nepal has to work with Nepal: its geology, its
                climate and its cities, not a generic template dropped in from elsewhere.
              </p>

              {/* Interactive map, traced from the real outline — click a
                  fact, its marker pulses. */}
              <div className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-md">
                <svg viewBox="0 0 400 225" className="h-full w-full" role="img" aria-hidden="true">
                  <path d={NEPAL_PATH_SMOOTH} fill="var(--color-brand-blue-tint)" stroke="var(--color-brand-blue)" strokeWidth={2} strokeLinejoin="round" />
                  {FACTS.map((fact, i) => {
                    const x = (fact.marker.x / 100) * 400;
                    const y = (fact.marker.y / 100) * 225;
                    const isActive = active === i;
                    return (
                      <g key={fact.label} style={{ cursor: "pointer" }} onClick={() => setActive(i)}>
                        {isActive && !reduceMotion && (
                          <motion.circle
                            cx={x}
                            cy={y}
                            r={5}
                            fill="none"
                            stroke="var(--color-brand-blue)"
                            strokeWidth={1.5}
                            initial={{ r: 5, opacity: 0.8 }}
                            animate={{ r: 16, opacity: 0 }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                          />
                        )}
                        <circle
                          cx={x}
                          cy={y}
                          r={isActive ? 6 : 4}
                          fill={isActive ? "var(--color-brand-blue-vivid)" : "var(--color-brand-blue)"}
                          stroke="white"
                          strokeWidth={1.5}
                          style={{ transition: "r 0.2s ease" }}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </Reveal>

          <div className="border-t border-(--color-line)">
            {FACTS.map((fact, i) => {
              const isActive = active === i;
              return (
                <button
                  key={fact.label}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  className="block w-full border-b border-(--color-line) py-6 text-left transition-colors hover:bg-(--color-paper-raised)"
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full transition-colors"
                      style={{ backgroundColor: isActive ? "var(--color-brand-blue-vivid)" : "var(--color-line-strong)" }}
                    />
                    <span className="font-display text-2xl font-semibold leading-tight text-(--color-ink)">
                      {fact.label}
                    </span>
                  </span>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 max-w-xl pl-5 text-body leading-relaxed text-(--color-steel)">
                          {fact.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
