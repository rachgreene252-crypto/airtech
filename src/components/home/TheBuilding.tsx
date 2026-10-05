"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BuildingModel } from "@/components/engineering/BuildingModel";
import { SYSTEM_ORDER, type SystemSlug } from "@/components/engineering/model";
import { getServiceBySlug } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * 01 — THE BUILDING: "What we engineer."
 *
 * Replaces SystemsReveal (the single-bay ceiling-void model) with a whole
 * building: the six documented Airtech systems drawn in place inside one
 * glazed frame. Hover / focus previews a system, click pins it, and
 * "Explore engineering" pulls every system out of the building as its own
 * layer. System names, summaries and component lists come straight from
 * src/content/services.ts (sourced from the Master Source of Truth §5).
 */
export function TheBuilding() {
  const [selected, setSelected] = useState<SystemSlug | null>(null);
  const [preview, setPreview] = useState<SystemSlug | null>(null);
  const [exploded, setExploded] = useState(false);
  const reduce = useReducedMotion();

  const focus = preview ?? selected;
  const service = focus ? getServiceBySlug(focus) : null;

  const select = (slug: SystemSlug) => setSelected((cur) => (cur === slug ? null : slug));

  return (
    <section id="what-we-engineer" className="relative bg-site-texture py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
                01 · The building
              </p>
              <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.06] text-balance text-(--color-ink)">
                What we engineer.
              </h2>
            </div>
            <p className="max-w-xl text-body-l leading-relaxed text-(--color-steel) lg:justify-self-end">
              Airtech designs, supplies, installs and commissions the systems a building runs on,
              coordinated as one scope by one engineering team. Select a system to see where it lives.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 overflow-hidden rounded-[4px] border border-(--color-line-strong) bg-(--color-paper)">
          <div className="grid lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)]">
            {/* System index */}
            <div className="order-2 border-t border-(--color-line) lg:order-1 lg:border-t-0 lg:border-r">
              <p className="px-5 pt-5 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-(--color-steel-soft)">
                Systems
              </p>
              <ol className="mt-2" onPointerLeave={() => setPreview(null)}>
                {SYSTEM_ORDER.map((slug, i) => {
                  const s = getServiceBySlug(slug);
                  if (!s) return null;
                  const active = focus === slug;
                  const pinned = selected === slug;
                  return (
                    <li key={slug} className="border-t border-(--color-line) first:border-t-0">
                      <button
                        type="button"
                        aria-pressed={pinned}
                        onClick={() => select(slug)}
                        onPointerEnter={() => setPreview(slug)}
                        onFocus={() => setPreview(slug)}
                        onBlur={() => setPreview(null)}
                        className={cn(
                          "group flex w-full items-baseline gap-4 px-5 py-3.5 text-left transition-colors",
                          active ? "bg-(--color-brand-blue-tint)" : "hover:bg-(--color-paper-raised)"
                        )}
                      >
                        <span
                          className={cn(
                            "font-mono text-[0.6875rem] tabular-nums",
                            active ? "text-(--color-brand-blue)" : "text-(--color-steel-soft)"
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "flex-1 text-[0.9375rem] font-medium",
                            active ? "text-(--color-brand-blue)" : "text-(--color-ink)"
                          )}
                        >
                          {s.name}
                        </span>
                        {pinned && (
                          <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-(--color-brand-blue)">
                            Selected
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="border-t border-(--color-line) px-5 py-5">
                <AnimatePresence mode="wait" initial={false}>
                  {service ? (
                    <motion.div
                      key={service.slug}
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      aria-live="polite"
                    >
                      <p className="text-small leading-relaxed text-(--color-steel)">{service.homeSummary}</p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {service.systems.map((c) => (
                          <li
                            key={c}
                            className="border border-(--color-line-strong) px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-(--color-ink-soft)"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/expertise/${service.slug}` as Route}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-brand-blue) hover:underline"
                      >
                        {service.name} capability <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="idle"
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      className="text-small leading-relaxed text-(--color-steel)"
                    >
                      Six systems, one coordinated installation. Point at any system to isolate it in the
                      building.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Drawing */}
            <div className="order-1 flex flex-col lg:order-2">
              <div className="relative h-[21rem] px-3 pt-4 sm:h-[30rem] lg:h-[36rem] lg:px-6 lg:pt-6">
                <BuildingModel
                  className="h-full w-full"
                  title="Axonometric drawing of a typical building showing where Airtech's six systems run: HVAC, electrical, public health engineering (PHE), fire protection, ELV and BMS"
                  highlight={focus}
                  exploded={exploded}
                  onHover={exploded ? setPreview : undefined}
                  onSelect={exploded ? select : undefined}
                />
                <button
                  type="button"
                  onClick={() => {
                    setExploded((v) => !v);
                    setPreview(null);
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
                  {exploded ? "Return to building" : "Explore engineering"}
                </button>
              </div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-(--color-line) px-5 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-(--color-steel-soft)">
                <span>Typical building · axonometric · not to scale</span>
                <span className="text-(--color-brand-blue)">
                  {exploded ? "Exploded · 7 layers" : focus ? `Isolated · ${getServiceBySlug(focus)?.name}` : "Assembled"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
