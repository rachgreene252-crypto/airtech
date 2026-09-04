"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { journeySteps, journeyIntro, type JourneyStep } from "@/content/journey";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * The canonical Airtech project lifecycle, rendered two ways from the same
 * src/content/journey.ts data (spec §7) — compact on the homepage, full on
 * /how-we-work. No second lifecycle definition anywhere.
 */
export function ClientJourney({ variant }: { variant: "compact" | "full" }) {
  return variant === "full" ? <FullJourney /> : <CompactJourney />;
}

/* ------------------------------------------------------------------ */
/* Compact — homepage                                                  */
/* ------------------------------------------------------------------ */

function CompactJourney() {
  const reduceMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.9", "end 0.25"],
  });
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(clamp01(v)));

  // Which step the user is pointing at overrides the scroll-derived one.
  const [pinned, setPinned] = useState<number | null>(null);

  const total = journeySteps.length;
  // Derived purely from scroll/pointer state (both start at 0 / null), so
  // SSR and first client render agree regardless of reduced-motion — which
  // useReducedMotion can't know on the server. Scroll still advances the
  // rail under reduced motion; globals.css just removes the tween.
  const scrollIndex = Math.min(total, Math.max(1, Math.ceil(progress * total + 0.0001)));
  const activeIndex = pinned ?? scrollIndex;
  const active = journeySteps[activeIndex - 1];

  // Rail fill: follows the pointer when pinned, otherwise the scroll signal.
  const fill = pinned != null ? (pinned - 0.5) / total : progress;

  return (
    <section className="border-t border-(--color-line) py-12 sm:py-14 lg:py-16">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
              Client journey
            </p>
            <h2 className="mt-5 font-display text-display-l font-normal leading-[1.08] tracking-[-0.012em] text-(--color-ink) text-balance">
              One partner, the whole lifecycle.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-body-l leading-relaxed text-(--color-steel)">
              {journeyIntro}
            </p>
          </div>

          <div ref={railRef} className="mx-auto mt-10 max-w-3xl">
            {/* Console: the active step, swapped as the visitor scrolls or
                points at a station on the rail below. Fixed min-height so
                changing steps never shifts the layout. */}
            <div className="crop-frame relative border border-(--color-line-strong) text-(--color-brand-blue)">
              <span className="crop-tick-tl" />
              <span className="crop-tick-br" />
              <div className="relative min-h-[16rem] p-7 text-left sm:min-h-[14rem] sm:p-10">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-6 top-4 select-none font-display text-[5rem] font-semibold leading-none text-(--color-brand-blue)/[0.07] sm:text-[7rem]"
                >
                  {String(active.index).padStart(2, "0")}
                </span>
                <div className="relative">
                  {/* initial={false} on AnimatePresence: the first render
                      (SSR + hydration) paints the panel at its resting state
                      — no `initial` style — so there's no hydration
                      mismatch. Only later step swaps animate. */}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active.index}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="flex items-baseline gap-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
                        <span className="font-mono">
                          {String(active.index).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </span>
                        <span>{active.subLabel}</span>
                      </p>
                      <h3 className="mt-3 font-display text-display-m font-normal leading-[1.12] text-(--color-ink)">
                        {active.sentence}
                      </h3>
                      <p className="mt-3 text-body leading-relaxed text-(--color-steel)">
                        {active.description}
                      </p>
                      <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                        {active.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-2.5 text-small text-(--color-ink-soft)"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.7em] h-px w-3 shrink-0 bg-(--color-brand-blue)"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Node rail — the six stations as a connected process line.
                Scroll advances the active station; hovering / focusing one
                pins it. Horizontal on desktop, a vertical rail on mobile. */}
            <div className="mt-9" onMouseLeave={() => setPinned(null)}>
              {/* Desktop */}
              <div className="relative hidden sm:block">
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-[6px] h-px bg-(--color-line-strong)"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-[6px] h-px origin-left bg-(--color-brand-blue) transition-transform duration-500 ease-out"
                  style={{ transform: `scaleX(${fill})` }}
                />
                <ol className="grid grid-cols-6">
                  {journeySteps.map((step) => {
                    const isActive = step.index === activeIndex;
                    const reached = step.index <= activeIndex;
                    return (
                      <li key={step.index} className="relative pr-4">
                        <button
                          type="button"
                          onMouseEnter={() => setPinned(step.index)}
                          onFocus={() => setPinned(step.index)}
                          onBlur={() => setPinned(null)}
                          aria-pressed={isActive}
                          className="group flex w-full flex-col items-start pt-5 text-left outline-none"
                        >
                          <span
                            aria-hidden="true"
                            className={`absolute left-0 top-0 h-[13px] w-[13px] rounded-full border-2 bg-(--color-paper) transition-all duration-300 ${
                              isActive
                                ? "scale-110 border-(--color-brand-blue) bg-(--color-brand-blue)"
                                : reached
                                  ? "border-(--color-brand-blue)"
                                  : "border-(--color-line-strong) group-hover:border-(--color-brand-blue)"
                            }`}
                          />
                          <span
                            className={`font-mono text-[11px] transition-colors duration-300 ${
                              reached ? "text-(--color-brand-blue)" : "text-(--color-steel-soft)"
                            }`}
                          >
                            {String(step.index).padStart(2, "0")}
                          </span>
                          <span
                            className={`mt-1 font-display text-[0.95rem] font-semibold leading-tight transition-colors duration-300 ${
                              isActive
                                ? "text-(--color-ink)"
                                : "text-(--color-steel) group-hover:text-(--color-ink)"
                            }`}
                          >
                            {step.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Mobile */}
              <ol className="relative pl-7 sm:hidden">
                <span
                  aria-hidden="true"
                  className="absolute left-[6px] top-2 bottom-2 w-px bg-(--color-line-strong)"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-[6px] top-2 bottom-2 w-px origin-top bg-(--color-brand-blue) transition-transform duration-500 ease-out"
                  style={{ transform: `scaleY(${fill})` }}
                />
                {journeySteps.map((step) => {
                  const isActive = step.index === activeIndex;
                  const reached = step.index <= activeIndex;
                  return (
                    <li key={step.index} className="relative mb-4 last:mb-0">
                      <button
                        type="button"
                        onClick={() => setPinned(step.index)}
                        aria-pressed={isActive}
                        className="flex items-baseline gap-3 text-left outline-none"
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute -left-7 top-[0.3rem] h-[13px] w-[13px] rounded-full border-2 bg-(--color-paper) transition-all duration-300 ${
                            isActive
                              ? "border-(--color-brand-blue) bg-(--color-brand-blue)"
                              : reached
                                ? "border-(--color-brand-blue)"
                                : "border-(--color-line-strong)"
                          }`}
                        />
                        <span
                          className={`font-mono text-[11px] ${
                            reached ? "text-(--color-brand-blue)" : "text-(--color-steel-soft)"
                          }`}
                        >
                          {String(step.index).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-lg font-semibold leading-tight ${
                            isActive ? "text-(--color-ink)" : "text-(--color-steel)"
                          }`}
                        >
                          {step.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          <div className="mt-9 text-center">
            <Link
              href="/how-we-work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-(--color-brand-blue)"
            >
              Explore how we work
              <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Full — /how-we-work                                                 */
/* ------------------------------------------------------------------ */

function FullJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const total = journeySteps.length;

  // One scroll signal drives everything: the rail fill AND which step reads
  // as active, so they never drift apart. Progress runs 0 as the track's top
  // reaches the viewport centre to 1 as its bottom does.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(Math.max(0, Math.min(1, v))));

  // Scroll-derived only (starts at 0) so SSR and hydration agree; scroll
  // advances the rail under reduced motion too, just without the tween.
  const p = progress;
  // active step: 1..total, advancing a touch before the exact boundary so the
  // rail marker lights as the step arrives rather than after it.
  const activeIndex = Math.min(total, Math.max(1, Math.ceil(p * total + 0.0001)));

  return (
    <div className="relative border-t border-(--color-line) bg-(--color-white)">
      {/* Mobile progress bar */}
      <div className="sticky top-[72px] z-20 border-b border-(--color-line) bg-(--color-white)/95 backdrop-blur lg:hidden">
        <div className="h-0.5 w-full bg-(--color-line)">
          <div
            className="h-full origin-left bg-(--color-brand-blue) transition-transform duration-200 ease-out"
            style={{ transform: `scaleX(${p})` }}
          />
        </div>
        <Container className="flex items-baseline justify-between py-2.5">
          <span className="font-mono text-xs text-(--color-brand-blue)">
            Step {activeIndex} / {total}
          </span>
          <span className="font-sans text-label font-medium text-(--color-steel)">
            {journeySteps[activeIndex - 1].label}
          </span>
        </Container>
      </div>

      <Container className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-16">
        {/* Desktop rail */}
        <div className="hidden lg:block">
          <div className="sticky top-28 self-start pb-12">
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
              The lifecycle
            </p>
            <ol className="relative mt-6 pl-6">
              <span aria-hidden="true" className="absolute left-0 top-1 bottom-1 w-px bg-(--color-line-strong)" />
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 bottom-1 w-px origin-top bg-(--color-brand-blue) transition-transform duration-300 ease-out"
                style={{ transform: `scaleY(${p})` }}
              />
              {journeySteps.map((step) => {
                const reached = activeIndex >= step.index;
                return (
                  <li key={step.index} className="relative mb-7 last:mb-0">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[1.4375rem] top-[0.45rem] h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        reached ? "bg-(--color-brand-blue)" : "bg-(--color-line-strong)"
                      }`}
                    />
                    <span
                      className={`font-mono text-[11px] transition-colors duration-300 ${
                        reached ? "text-(--color-brand-blue)" : "text-(--color-steel-soft)"
                      }`}
                    >
                      {String(step.index).padStart(2, "0")}
                    </span>
                    <span
                      className={`mt-0.5 block font-sans text-small font-medium transition-colors duration-300 ${
                        activeIndex === step.index
                          ? "text-(--color-ink)"
                          : reached
                            ? "text-(--color-steel)"
                            : "text-(--color-steel-soft)"
                      }`}
                    >
                      {step.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Steps */}
        <div ref={trackRef} className="divide-y divide-(--color-line)">
          {journeySteps.map((step, i) => (
            <StepSection
              key={step.index}
              step={step}
              position={i + 1}
              total={total}
              isFinale={i === total - 1}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

function StepSection({
  step,
  position,
  total,
  isFinale,
}: {
  step: JourneyStep;
  position: number;
  total: number;
  isFinale: boolean;
}) {
  return (
    <section
      data-step-index={step.index}
      className={`relative overflow-hidden ${
        isFinale
          ? "bg-(--color-blue-deep) px-6 py-16 text-white sm:px-12 sm:py-20"
          : "py-12 sm:py-16"
      }`}
    >
      {/* Ghost numeral */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-6 right-0 select-none font-display text-[6rem] font-semibold leading-none sm:text-[9rem] ${
          isFinale ? "text-white/[0.07]" : "text-(--color-brand-blue)/[0.06]"
        }`}
      >
        {String(step.index).padStart(2, "0")}
      </span>

      <div className={`relative ${isFinale ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
        <div>
          <p
            className={`flex items-baseline gap-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] ${
              isFinale ? "justify-center text-white/70" : "text-(--color-brand-blue)"
            }`}
          >
            <span className="font-mono">
              {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span>{step.subLabel}</span>
          </p>

          <h2
            className={`mt-4 font-display text-display-m font-semibold leading-[1.05] tracking-[-0.015em] ${
              isFinale ? "text-white" : "text-(--color-ink)"
            }`}
          >
            {step.sentence}
          </h2>

          <p
            className={`mt-4 max-w-xl text-body-l leading-relaxed ${
              isFinale ? "mx-auto text-white/80" : "text-(--color-steel)"
            }`}
          >
            {step.description}
          </p>

          <ul
            className={`mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2 ${
              isFinale ? "mx-auto max-w-md text-left" : ""
            }`}
          >
            {step.points.map((point) => (
              <li
                key={point}
                className={`flex gap-3 text-small ${isFinale ? "text-white/90" : "text-(--color-ink-soft)"}`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-[0.7em] h-px w-3.5 shrink-0 ${
                    isFinale ? "bg-(--color-brand-blue-soft)" : "bg-(--color-brand-blue)"
                  }`}
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {isFinale && (
            <div className="mt-10">
              <ButtonLink href="/contact/project-enquiry" size="lg">
                Discuss your project
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
