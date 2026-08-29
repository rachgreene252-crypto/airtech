"use client";

import { useEffect, useRef, useState } from "react";
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
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-1 w-px origin-top bg-(--color-brand-blue)"
                style={{ height: `${displayFill * 100}%` }}
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
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px origin-left bg-(--color-brand-blue)"
                style={{ width: `${displayFill * 100}%` }}
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
              className="inline-flex items-center gap-1.5 text-sm font-medium text-(--color-brand-blue) hover:gap-2.5 transition-all"
            >
              Explore how we work
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function FullJourney() {
  const [activeIndex, setActiveIndex] = useState(1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute("data-step-index"));
          if (idx) setActiveIndex(idx);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <div className="sticky top-[72px] z-10 border-b border-(--color-line) bg-(--color-paper)/95 px-5 py-3 backdrop-blur sm:hidden">
        <p className="font-mono text-xs text-(--color-brand-blue)">
          {String(activeIndex).padStart(2, "0")} / {String(journeySteps.length).padStart(2, "0")}
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[64px_1fr]">
        <div className="hidden lg:sticky lg:top-24 lg:flex lg:h-fit lg:flex-col lg:items-center lg:gap-6 lg:self-start lg:pt-2">
          {journeySteps.map((step) => (
            <div key={step.index} className="flex flex-col items-center gap-2">
              <span
                className={`font-mono text-xs transition-colors ${
                  activeIndex === step.index ? "text-(--color-brand-blue)" : "text-(--color-steel-soft)"
                }`}
              >
                {String(step.index).padStart(2, "0")}
              </span>
              <span
                className={`h-6 w-px transition-colors ${
                  activeIndex === step.index ? "bg-(--color-brand-blue)" : "bg-(--color-line-strong)"
                }`}
              />
            </div>
          ))}
        </div>

        <div>
          {journeySteps.map((step, i) => (
            <StepSection
              key={step.index}
              step={step}
              isFinale={i === journeySteps.length - 1}
              active={activeIndex === step.index}
              setRef={(el) => {
                stepRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepSection({
  step,
  isFinale,
  active,
  setRef,
}: {
  step: JourneyStep;
  isFinale: boolean;
  active: boolean;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const Visual = VISUALS[step.visual];

  return (
    <motion.div
      ref={setRef}
      data-step-index={step.index}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex min-h-[80vh] flex-col justify-center border-t border-(--color-line) px-5 py-16 sm:px-8 lg:px-0 lg:pr-12 ${
        isFinale ? "bg-(--color-blue-deep) text-white" : ""
      }`}
    >
      <div
        className={
          isFinale ? "mx-auto max-w-2xl text-center" : "grid gap-10 lg:grid-cols-2 lg:items-center"
        }
      >
        {!isFinale && (
          <div className="order-2 aspect-[3/2] w-full lg:order-1">
            <Visual active={active} />
          </div>
        )}
        <div className={isFinale ? "" : "order-1 lg:order-2"}>
          <p
            className={`font-display text-display-m font-semibold ${
              isFinale ? "text-white" : "text-(--color-brand-blue)"
            }`}
          >
            {String(step.index).padStart(2, "0")} — {step.label}
          </p>
          <h2
            className={`mt-3 font-display text-display-l font-semibold leading-[1.02] text-balance ${
              isFinale ? "text-white" : "text-(--color-ink)"
            }`}
          >
            {step.sentence}
          </h2>
          <Label className={`mt-5 block ${isFinale ? "text-(--color-brand-blue-soft)" : ""}`}>
            {step.subLabel}
          </Label>
          <p
            className={`mt-3 max-w-xl text-body-l leading-relaxed ${
              isFinale ? "mx-auto text-white/80" : "text-(--color-steel)"
            }`}
          >
            {step.description}
          </p>
          <ul className={`mt-6 flex flex-col gap-2 ${isFinale ? "mx-auto max-w-xs items-start" : ""}`}>
            {step.points.map((point) => (
              <li
                key={point}
                className={`flex gap-3 text-body ${isFinale ? "text-white/90" : "text-(--color-ink)"}`}
              >
                <span aria-hidden="true" className={isFinale ? "text-(--color-brand-blue-soft)" : "text-(--color-brand-blue)"}>
                  —
                </span>
                {point}
              </li>
            ))}
          </ul>
          {isFinale && (
            <div className="mx-auto mt-10 max-w-xs">
              <Visual active={active} />
              <div className="mt-10">
                <ButtonLink href="/contact/project-enquiry" size="lg">
                  Discuss your project
                </ButtonLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
