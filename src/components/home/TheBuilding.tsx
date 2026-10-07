"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BuildingModel, SYSTEM_SHORT } from "@/components/engineering/BuildingModel";
import { SYSTEM_COLOR, SYSTEM_ORDER, type SystemSlug } from "@/components/engineering/model";
import { getServiceBySlug } from "@/content/services";
import { cn } from "@/lib/cn";

const CYCLE_MS = 4200;

/**
 * 01 — WHAT WE ENGINEER.
 *
 * Reworked 2026-10-07 ("I don't love the expertise section"): every system
 * is now drawn in its own colour (fire red, HVAC blue, electrical amber,
 * PHE teal, ELV violet, BMS green), and while the visitor isn't steering it
 * the section walks through the six systems on its own, one every few
 * seconds, so the building explains itself without a click. Hover or focus
 * takes over; clicking pins a system. Copy comes from src/content/services.ts.
 */
export function TheBuilding() {
  const [auto, setAuto] = useState<SystemSlug>(SYSTEM_ORDER[0]);
  const [selected, setSelected] = useState<SystemSlug | null>(null);
  const [preview, setPreview] = useState<SystemSlug | null>(null);
  const [exploded, setExploded] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });

  const cycling = !reduce && inView && !selected && !preview && !exploded;
  const focus = preview ?? selected ?? (reduce || exploded ? null : auto);
  const service = focus ? getServiceBySlug(focus) : null;

  useEffect(() => {
    if (!cycling) return;
    const id = window.setTimeout(() => {
      setAuto((cur) => SYSTEM_ORDER[(SYSTEM_ORDER.indexOf(cur) + 1) % SYSTEM_ORDER.length]);
    }, CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [cycling, auto]);

  const select = (slug: SystemSlug) => {
    setSelected((cur) => (cur === slug ? null : slug));
    setAuto(slug);
  };

  return (
    <section id="what-we-engineer" className="relative bg-site-texture py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
                01 · What we engineer
              </p>
              <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.06] text-balance text-(--color-ink)">
                Six systems. One building. <span className="text-(--color-brand-blue)">One team.</span>
              </h2>
            </div>
            <p className="max-w-xl text-body-l leading-relaxed text-(--color-steel) lg:justify-self-end">
              Airtech designs, supplies, installs and commissions the systems a building runs on,
              coordinated as one scope. Watch each system light up, or pick one to isolate it.
            </p>
          </div>
        </Reveal>

        <div
          ref={ref}
          className="mt-10 overflow-hidden rounded-[6px] border border-(--color-line-strong) bg-(--color-paper) shadow-[0_30px_60px_-40px_rgba(0,60,100,0.35)]"
        >
          <div className="grid lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)]">
            {/* System index */}
            <ol
              className="order-2 border-t border-(--color-line) lg:order-1 lg:border-t-0 lg:border-r"
              onPointerLeave={() => setPreview(null)}
            >
              {SYSTEM_ORDER.map((slug, i) => {
                const s = getServiceBySlug(slug);
                if (!s) return null;
                const active = focus === slug;
                const pinned = selected === slug;
                const color = SYSTEM_COLOR[slug];
                return (
                  <li key={slug} className="relative border-b border-(--color-line) last:border-b-0">
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-1 transition-opacity duration-300"
                      style={{ background: color, opacity: active ? 1 : 0.35 }}
                    />
                    <button
                      type="button"
                      aria-pressed={pinned}
                      aria-expanded={active}
                      onClick={() => select(slug)}
                      onPointerEnter={() => setPreview(slug)}
                      onFocus={() => setPreview(slug)}
                      onBlur={() => setPreview(null)}
                      className="group flex w-full items-center gap-4 py-4 pr-5 pl-6 text-left"
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[0.6875rem] tabular-nums transition-colors duration-300"
                        style={
                          active
                            ? { background: color, color: "white" }
                            : { background: `color-mix(in srgb, ${color} 12%, white)`, color }
                        }
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "flex-1 text-[0.9875rem] font-semibold transition-colors",
                          active ? "text-(--color-ink)" : "text-(--color-ink-soft) group-hover:text-(--color-ink)"
                        )}
                      >
                        {s.name}
                      </span>
                      {pinned && (
                        <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em]" style={{ color }}>
                          Pinned
                        </span>
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {active && (
                        <motion.div
                          key="detail"
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pr-5 pb-5 pl-[4.5rem]" aria-live={cycling ? "off" : "polite"}>
                            <p className="text-small leading-relaxed text-(--color-steel)">{s.homeSummary}</p>
                            <ul className="mt-3 space-y-1.5">
                              {s.subServices.slice(0, 4).map((c) => (
                                <li key={c} className="flex items-baseline gap-2 text-small text-(--color-ink-soft)">
                                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 translate-y-[-1px] rounded-full" style={{ background: color }} />
                                  {c}
                                </li>
                              ))}
                            </ul>
                            <Link
                              href={`/expertise/${s.slug}` as Route}
                              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
                              style={{ color: `color-mix(in srgb, ${color} 75%, black)` }}
                            >
                              Explore {SYSTEM_SHORT[slug]} <span aria-hidden="true">&rarr;</span>
                            </Link>
                          </div>
                          {cycling && auto === slug && (
                            <span
                              key={auto}
                              aria-hidden="true"
                              className="building-progress absolute bottom-0 left-0 h-0.5"
                              style={{ background: color, animationDuration: `${CYCLE_MS}ms` }}
                            />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ol>

            {/* Drawing */}
            <div
              className="order-1 flex flex-col lg:order-2"
              style={{
                background: service
                  ? `radial-gradient(70% 60% at 55% 45%, color-mix(in srgb, ${SYSTEM_COLOR[service.slug as SystemSlug]} 9%, transparent), transparent 70%)`
                  : undefined,
                transition: "background 600ms ease",
              }}
            >
              <div className="relative h-[21rem] px-3 pt-4 sm:h-[30rem] lg:h-[36rem] lg:px-6 lg:pt-6">
                <BuildingModel
                  className="h-full w-full"
                  title="Axonometric drawing of a typical building showing where Airtech's six systems run, each in its own colour: HVAC, electrical, public health engineering (PHE), fire protection, ELV and BMS"
                  highlight={focus}
                  exploded={exploded}
                  colorCoded
                  onHover={exploded ? setPreview : undefined}
                  onSelect={exploded ? select : undefined}
                />
                <AnimatePresence mode="wait" initial={false}>
                  {service && !exploded && (
                    <motion.p
                      key={service.slug}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      aria-hidden="true"
                      className="pointer-events-none absolute top-4 left-5 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl lg:top-6 lg:left-8"
                      style={{ color: SYSTEM_COLOR[service.slug as SystemSlug] }}
                    >
                      {SYSTEM_SHORT[service.slug as SystemSlug]}
                    </motion.p>
                  )}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={() => {
                    setExploded((v) => !v);
                    setPreview(null);
                    setSelected(null);
                  }}
                  aria-pressed={exploded}
                  className="absolute top-4 right-4 hidden items-center gap-2 rounded-full border border-(--color-line-strong) bg-(--color-paper) px-4 py-2 text-sm font-medium text-(--color-ink) transition-colors hover:border-(--color-brand-blue) hover:text-(--color-brand-blue) md:inline-flex lg:top-6 lg:right-6"
                >
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    {exploded ? (
                      <path d="M3 5.5h10M3 10.5h10M8 2v12" />
                    ) : (
                      <path d="M2 4h5v3H2zM9 9h5v3H9zM7 5.5h2M9 10.5H7" />
                    )}
                  </svg>
                  {exploded ? "Return to building" : "Explode the layers"}
                </button>
              </div>

              {/* Legend doubles as a second way to pick a system. */}
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-(--color-line) px-5 py-3">
                {SYSTEM_ORDER.map((slug) => (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => select(slug)}
                    className={cn(
                      "inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-colors",
                      focus === slug ? "text-(--color-ink)" : "text-(--color-steel-soft) hover:text-(--color-ink)"
                    )}
                  >
                    <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: SYSTEM_COLOR[slug] }} />
                    {SYSTEM_SHORT[slug]}
                  </button>
                ))}
                <span className="ml-auto hidden font-mono text-[0.625rem] uppercase tracking-[0.16em] text-(--color-steel-soft) sm:inline">
                  Typical building · not to scale
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
