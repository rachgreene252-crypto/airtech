"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BuildingModel, type Phase } from "@/components/engineering/BuildingModel";
import { journeySteps } from "@/content/journey";
import { cn } from "@/lib/cn";

/**
 * 03 — THE AIRTECH METHOD: "How we deliver it."
 *
 * Replaces the homepage's compact ClientJourney. The same building from
 * section 01 is carried through the six stages, so the process is shown
 * happening TO a building rather than listed beside one:
 *   Brief — dashed massing on the site grid
 *   Engineering — the systems drawn as a blue design layer
 *   Procurement — plant equipment staged on site
 *   Installation — plant moves into place, systems become physical
 *   Commissioning — systems live (flow), facade lit
 *   AMC — kept live, with service checks on the plant
 * Stage text is src/content/journey.ts (shared with /how-we-work).
 */
const PHASES: Phase[] = ["brief", "engineering", "procurement", "installation", "commissioning", "amc"];

const CAPTION: Record<Phase, string> = {
  brief: "Site, massing and requirements",
  engineering: "Systems designed and coordinated",
  procurement: "Plant sourced and delivered to site",
  installation: "Plant set and systems installed",
  commissioning: "Tested, commissioned, operational",
  amc: "Maintained after handover",
};

export function AirtechMethod() {
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px -25% 0px" });
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = journeySteps.length;
  const step = journeySteps[active];
  const phase = PHASES[active];

  // One unattended walk through the stages while the section is on
  // screen; stops for good on the first interaction.
  useEffect(() => {
    if (reduce || engaged || !inView) return;
    const id = window.setTimeout(() => {
      if (active < total - 1) setActive((a) => a + 1);
      else setEngaged(true);
    }, active === 0 ? 1800 : 2600);
    return () => window.clearTimeout(id);
  }, [reduce, engaged, inView, active, total]);

  function go(i: number, focus = false) {
    const n = Math.max(0, Math.min(total - 1, i));
    setEngaged(true);
    setActive(n);
    if (focus) tabs.current[n]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const map: Record<string, number> = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: total - 1 };
    if (e.key in map) {
      e.preventDefault();
      go(map[e.key], true);
    }
  }

  return (
    <section id="airtech-method" className="relative border-t border-(--color-line) bg-site-texture py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
                02 · How we deliver
              </p>
              <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.06] text-balance text-(--color-ink)">
                How we deliver it.
              </h2>
            </div>
            <p className="max-w-xl text-body-l leading-relaxed text-(--color-steel) lg:justify-self-end">
              One partner from the first brief to long after handover: engineering, procurement,
              installation, testing and commissioning, then after-sales support and AMC.
            </p>
          </div>
        </Reveal>

        <div ref={ref} className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          {/* Stages */}
          <div role="tablist" aria-label="Airtech delivery stages" aria-orientation="vertical" onKeyDown={onKeyDown} className="order-2 lg:order-1">
            {journeySteps.map((s, i) => {
              const on = i === active;
              const done = i < active;
              return (
                <div key={s.index} className="border-t border-(--color-line) last:border-b">
                  <button
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`method-tab-${i}`}
                    aria-selected={on}
                    aria-controls="method-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => go(i)}
                    className="flex w-full items-center gap-4 py-4 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[0.6875rem] tabular-nums transition-colors",
                        on
                          ? "border-(--color-brand-blue-vivid) bg-(--color-brand-blue-vivid) text-white"
                          : done
                            ? "border-(--color-brand-blue-vivid) text-(--color-brand-blue)"
                            : "border-(--color-line-strong) text-(--color-steel-soft)"
                      )}
                    >
                      {String(s.index).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className={cn("block text-[1.0625rem] font-semibold", on ? "text-(--color-ink)" : "text-(--color-ink-soft)")}>
                        {s.label}
                      </span>
                      <span className="block text-xs text-(--color-steel)">{s.subLabel}</span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 pl-11">
                          <p className="text-small leading-relaxed text-(--color-steel)">{s.description}</p>
                          <ul className="mt-3 flex flex-wrap gap-1.5">
                            {s.points.map((p) => (
                              <li
                                key={p}
                                className="border border-(--color-line-strong) px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-(--color-ink-soft)"
                              >
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <Link
              href="/how-we-work"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-brand-blue) hover:underline"
            >
              The full delivery process <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Building at this stage */}
          <div
            id="method-panel"
            role="tabpanel"
            aria-labelledby={`method-tab-${active}`}
            className="order-1 overflow-hidden rounded-[4px] border border-(--color-line-strong) bg-(--color-paper) lg:order-2 lg:sticky lg:top-24 lg:self-start"
          >
            <div className="flex items-center gap-1 border-b border-(--color-line) px-4 py-3" aria-hidden="true">
              {PHASES.map((p, i) => (
                <span
                  key={p}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-500",
                    i <= active ? "bg-(--color-brand-blue-vivid)" : "bg-(--color-line)"
                  )}
                />
              ))}
            </div>
            <div className="relative h-[19rem] px-3 sm:h-[26rem] lg:h-[31rem]">
              <BuildingModel
                className="h-full w-full"
                phase={phase}
                title={`The building at the ${step.label.toLowerCase()} stage: ${CAPTION[phase].toLowerCase()}`}
              />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-(--color-line) px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em]">
              <span className="text-(--color-brand-blue)">
                {String(active + 1).padStart(2, "0")} · {step.label}
              </span>
              <span className="text-right text-(--color-steel-soft)">{CAPTION[phase]}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
