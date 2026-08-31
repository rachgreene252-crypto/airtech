"use client";

import { useRef, useState } from "react";
import type { ComponentType } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { journeySteps, journeyIntro, type JourneyStep } from "@/content/journey";
import { Conversation } from "./visuals/Conversation";
import { Engineer } from "./visuals/Engineer";
import { Procure } from "./visuals/Procure";
import { Site } from "./visuals/Site";
import { Commission } from "./visuals/Commission";
import { Support } from "./visuals/Support";

const VISUALS: Record<JourneyStep["visual"], ComponentType<{ active: boolean }>> = {
  conversation: Conversation,
  engineer: Engineer,
  procure: Procure,
  site: Site,
  commission: Commission,
  support: Support,
};

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
    offset: ["start 0.8", "end 0.6"],
  });
  const [fill, setFill] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setFill(Math.max(0, Math.min(1, v)));
  });

  const displayFill = reduceMotion ? 1 : fill;

  return (
    <section className="bg-site-texture py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Label>Client journey</Label>
            <h2 className="mt-4 font-display text-display-l font-semibold leading-[0.98] text-(--color-ink) text-balance">
              One partner, the whole lifecycle.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-body-l leading-relaxed text-(--color-steel)">
              {journeyIntro}
            </p>
          </div>

          <div ref={railRef} className="relative mx-auto mt-16 max-w-5xl">
            {/* Mobile: vertical rail */}
            <div className="relative pl-8 sm:hidden">
              <span aria-hidden="true" className="absolute left-0 top-1 bottom-1 w-px bg-(--color-line-strong)" />
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 bottom-1 w-px origin-top bg-(--color-brand-blue) transition-transform duration-300 ease-out"
                style={{ transform: `scaleY(${displayFill})` }}
              />
              {journeySteps.map((step) => (
                <div key={step.index} className="mb-8 last:mb-0">
                  <p className="font-mono text-xs text-(--color-brand-blue)">
                    {String(step.index).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-(--color-ink)">{step.label}</h3>
                  <p className="mt-1 text-sm text-(--color-steel)">{step.sentence}</p>
                </div>
              ))}
            </div>

            {/* Desktop: horizontal rail */}
            <div className="relative hidden pt-6 sm:block">
              <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-(--color-line-strong)" />
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 top-0 h-px origin-left bg-(--color-brand-blue) transition-transform duration-300 ease-out"
                style={{ transform: `scaleX(${displayFill})` }}
              />
              <div className="grid grid-cols-6 gap-4">
                {journeySteps.map((step) => (
                  <div key={step.index}>
                    <p className="font-mono text-xs text-(--color-brand-blue)">
                      {String(step.index).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold leading-tight text-(--color-ink)">
                      {step.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-(--color-steel)">{step.sentence}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
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
  const reduceMotion = useReducedMotion();
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

  const p = reduceMotion ? 1 : progress;
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

      <Container className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
        {/* Desktop rail */}
        <div className="hidden lg:block">
          <div className="sticky top-28 self-start pb-12">
            <p className="font-sans text-label font-medium tracking-[0.01em] text-(--color-brand-blue)">
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
              active={activeIndex === step.index}
              reversed={i % 2 === 1}
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
  active,
  reversed,
}: {
  step: JourneyStep;
  position: number;
  total: number;
  isFinale: boolean;
  active: boolean;
  reversed: boolean;
}) {
  const Visual = VISUALS[step.visual];

  return (
    <motion.section
      data-step-index={step.index}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden ${
        isFinale
          ? "bg-(--color-blue-deep) px-6 py-20 text-white sm:px-12 sm:py-24"
          : "py-20 sm:py-28"
      }`}
    >
      {/* Ghost numeral */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-4 right-2 select-none font-display text-[7rem] font-semibold leading-none sm:text-[10rem] ${
          isFinale ? "text-white/[0.07]" : "text-(--color-brand-blue)/[0.06]"
        }`}
      >
        {String(step.index).padStart(2, "0")}
      </span>

      <div
        className={`relative grid items-center gap-10 lg:gap-16 ${
          isFinale ? "" : "lg:grid-cols-2"
        }`}
      >
        {!isFinale && (
          <div className={`aspect-[4/3] w-full ${reversed ? "lg:order-2" : "lg:order-1"}`}>
            <div className="crop-frame relative h-full w-full border border-(--color-line) text-(--color-line-strong)">
              <span className="crop-tick-tl" />
              <span className="crop-tick-br" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <Visual active={active} />
              </div>
            </div>
          </div>
        )}

        <div className={isFinale ? "mx-auto max-w-2xl text-center" : reversed ? "lg:order-1" : "lg:order-2"}>
          <p
            className={`flex items-baseline gap-3 font-sans text-label font-medium tracking-[0.01em] ${
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
    </motion.section>
  );
}
