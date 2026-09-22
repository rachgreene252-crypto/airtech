"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
    offset: ["start start", "end end"],
  });
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(clamp01(v)));

  const total = journeySteps.length;

  // The station the visitor has selected (click / key / autoplay). Until
  // they interact, `pinned` is null and the rail follows the scroll signal.
  const [pinned, setPinned] = useState<number | null>(null);
  const [engaged, setEngaged] = useState(false);

  const scrollIndex = Math.min(total, Math.max(1, Math.ceil(progress * total + 0.0001)));
  const activeIndex = pinned ?? scrollIndex;
  const active = journeySteps[activeIndex - 1];

  const fill = pinned != null ? (pinned - 0.5) / total : progress;

  const select = useCallback(
    (index: number) => {
      setPinned(Math.min(total, Math.max(1, index)));
      setEngaged(true);
    },
    [total]
  );

  // Autoplay — a slow walk through the lifecycle so the section reads as
  // alive on load. Stops for good the moment the visitor takes control, and
  // never runs under reduced motion.
  useEffect(() => {
    if (reduceMotion || engaged) return;
    const id = window.setInterval(() => {
      setPinned((cur) => {
        const from = cur ?? 0;
        return from >= total ? 1 : from + 1;
      });
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduceMotion, engaged, total]);

  function onRailKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    let target: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") target = activeIndex + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") target = activeIndex - 1;
    else if (e.key === "Home") target = 1;
    else if (e.key === "End") target = total;
    if (target == null) return;
    e.preventDefault();
    const clamped = Math.min(total, Math.max(1, target));
    select(clamped);
    const tabs = e.currentTarget.querySelectorAll<HTMLButtonElement>("button");
    tabs[clamped - 1]?.focus();
  }

  return (
    <section className="border-t border-(--color-line) py-12 sm:py-14 lg:py-16">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
              Client journey
            </p>
            <h2 className="mt-5 font-display text-display-l font-semibold leading-[1.08] tracking-[-0.016em] text-(--color-ink) text-balance">
              One partner, the whole lifecycle.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-body-l leading-relaxed text-(--color-steel)">
              {journeyIntro}
            </p>
          </div>

          {/* No scroll-pin — removed 2026-09-10 (client: unpin Featured
              Projects AND this section; a visitor should be able to keep
              scrolling past freely and only slide/click if they choose to).
              Autoplay + click/keyboard stay the primary interaction. */}
          <div ref={railRef} className="relative mx-auto mt-10 max-w-3xl">
          <div>
            {/* Console: the active step, swapped as the visitor scrolls or
                points at a station on the rail below. Fixed min-height so
                changing steps never shifts the layout. */}
            <div className="crop-frame relative border border-(--color-line-strong) text-(--color-brand-blue)">
              <span className="crop-tick-tl" />
              <span className="crop-tick-br" />
              <div className="relative min-h-[17rem] p-7 text-left sm:min-h-[14rem] sm:p-10">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-3 select-none font-display text-[4rem] font-semibold leading-none text-(--color-brand-blue)/[0.06] sm:right-6 sm:top-4 sm:text-[7rem]"
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
                      <p className="max-w-[calc(100%-3rem)] font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
                        <span>{String(active.index).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
                        <span className="ml-3 inline-block">{active.subLabel}</span>
                      </p>
                      <h3 className="mt-3 font-display text-display-m font-semibold tracking-[-0.016em] leading-[1.12] text-(--color-ink)">
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
                              className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-brand-blue)"
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

            {/* Console controls — prev / next / step counter. */}
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => select(activeIndex - 1)}
                disabled={activeIndex === 1}
                aria-label="Previous step"
                className="flex h-10 w-10 items-center justify-center border border-(--color-line-strong) text-(--color-brand-blue) transition-colors hover:border-(--color-brand-blue) disabled:opacity-30 disabled:hover:border-(--color-line-strong)"
              >
                <span aria-hidden="true">&larr;</span>
              </button>
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-(--color-steel)">
                Step {activeIndex} of {total}
              </p>
              <button
                type="button"
                onClick={() => select(activeIndex + 1)}
                disabled={activeIndex === total}
                aria-label="Next step"
                className="flex h-10 w-10 items-center justify-center border border-(--color-line-strong) text-(--color-brand-blue) transition-colors hover:border-(--color-brand-blue) disabled:opacity-30 disabled:hover:border-(--color-line-strong)"
              >
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>

            {/* Node rail — the six stations. Click or arrow keys select one;
                the scroll signal drives it until the visitor takes control. */}
            <div className="mt-8">
              {/* Desktop */}
              <div
                role="group"
                aria-label="Project lifecycle stages"
                onKeyDown={onRailKeyDown}
                className="relative hidden sm:block"
              >
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
                          aria-pressed={isActive}
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => select(step.index)}
                          className="group flex w-full cursor-pointer flex-col items-start pt-5 text-left outline-none focus-visible:[&>span:last-child]:underline"
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
                            className={`font-mono text-[12px] transition-colors duration-300 ${
                              reached ? "text-(--color-brand-blue)" : "text-(--color-steel-soft)"
                            }`}
                          >
                            {String(step.index).padStart(2, "0")}
                          </span>
                          <span
                            className={`mt-1 font-display text-small font-normal leading-tight transition-colors duration-300 ${
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
              <div
                role="group"
                aria-label="Project lifecycle stages"
                onKeyDown={onRailKeyDown}
                className="relative pl-7 sm:hidden"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-[6px] top-2 bottom-2 w-px bg-(--color-line-strong)"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-[6px] top-2 bottom-2 w-px origin-top bg-(--color-brand-blue) transition-transform duration-500 ease-out"
                  style={{ transform: `scaleY(${fill})` }}
                />
                <ol>
                {journeySteps.map((step) => {
                  const isActive = step.index === activeIndex;
                  const reached = step.index <= activeIndex;
                  return (
                    <li key={step.index} className="relative mb-4 last:mb-0">
                      <button
                        type="button"
                        aria-pressed={isActive}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => select(step.index)}
                        className="flex items-baseline gap-3 text-left outline-none focus-visible:[&>span:last-child]:underline"
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
                          className={`font-mono text-[12px] ${
                            reached ? "text-(--color-brand-blue)" : "text-(--color-steel-soft)"
                          }`}
                        >
                          {String(step.index).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-body font-normal leading-tight ${
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

  // Rail entries were purely passive before (they lit up as you scrolled
  // past, but clicking did nothing) — now the desktop rail is a real jump
  // list: clicking a step scrolls its section into view.
  const jumpToStep = useCallback((index: number) => {
    document
      .querySelector(`[data-step-index="${index}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

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
    // Was a hardcoded opaque bg-(--color-white) — the page above (the
    // how-we-work hero) is bg-site-texture (transparent, the sitewide
    // background artwork showing through), so this solid white block
    // created a hard visible seam right at the boundary ("the sudden
    // change from background look untidy," client feedback). Transparent
    // now, same as every other light section on the site.
    <div className="relative border-t border-(--color-line) bg-site-texture">
      {/* Mobile progress bar */}
      <div className="sticky top-[72px] z-20 border-b border-(--color-line) bg-(--color-paper)/95 backdrop-blur lg:hidden">
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
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
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
                    <button
                      type="button"
                      onClick={() => jumpToStep(step.index)}
                      aria-current={activeIndex === step.index ? "step" : undefined}
                      className="group -ml-1 flex items-baseline gap-0 py-1 pl-1 text-left outline-none"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute -left-[1.4375rem] top-[0.45rem] h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:scale-150 ${
                          reached ? "bg-(--color-brand-blue)" : "bg-(--color-line-strong)"
                        }`}
                      />
                      <span
                        className={`font-mono text-[12px] transition-colors duration-300 ${
                          reached ? "text-(--color-brand-blue)" : "text-(--color-steel-soft)"
                        }`}
                      >
                        {String(step.index).padStart(2, "0")}
                      </span>
                      <span
                        className={`ml-2 font-sans text-small font-medium transition-colors duration-300 group-hover:text-(--color-brand-blue) ${
                          activeIndex === step.index
                            ? "text-(--color-ink)"
                            : reached
                              ? "text-(--color-steel)"
                              : "text-(--color-steel-soft)"
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
          ? "border-t border-(--color-line) bg-(--color-paper-raised) px-6 py-16 text-(--color-ink) sm:px-12 sm:py-20"
          : "py-12 sm:py-16"
      }`}
    >
      {/* Ghost numeral */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-0 select-none font-display text-[6rem] font-semibold leading-none text-(--color-brand-blue)/[0.06] sm:text-[9rem]"
      >
        {String(step.index).padStart(2, "0")}
      </span>

      <div className={`relative ${isFinale ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
        <div>
          <p
            className={`flex items-baseline gap-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue) ${
              isFinale ? "justify-center" : ""
            }`}
          >
            <span className="font-mono">
              {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span>{step.subLabel}</span>
          </p>

          <h2 className="mt-4 font-display text-display-m font-semibold leading-[1.05] tracking-[-0.015em] text-(--color-ink)">
            {step.sentence}
          </h2>

          <p
            className={`mt-4 max-w-xl text-body-l leading-relaxed text-(--color-steel) ${
              isFinale ? "mx-auto" : ""
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
              <li key={point} className="flex gap-3 text-small text-(--color-ink-soft)">
                <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-brand-blue)" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {isFinale && (
            <div className="mt-10">
              <ButtonLink href="/contact/project-enquiry" size="lg">
                Enquire
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
