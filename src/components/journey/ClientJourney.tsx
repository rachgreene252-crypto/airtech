"use client";

import { useCallback, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { journeySteps, type JourneyStep } from "@/content/journey";

/**
 * The canonical Airtech project lifecycle as the full scroll story on
 * /how-we-work. The homepage's compact variant was replaced 2026-09-29 by
 * AirtechMethod (src/components/home), which reads the same
 * src/content/journey.ts data — still no second lifecycle definition.
 */
export function ClientJourney() {
  return <FullJourney />;
}

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
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
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
          ? "border-t border-(--color-line) bg-band px-6 py-16 text-(--color-ink) sm:px-12 sm:py-20"
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
            className={`flex items-baseline gap-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue) ${
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
