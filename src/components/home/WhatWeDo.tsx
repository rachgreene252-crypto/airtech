"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";

const PLAN_LABELS = services
  .filter((s) => s.disciplineCode !== "ADV")
  .map((s) => ({ code: s.disciplineCode, name: s.name }));

/**
 * Editorial, not a services list — the brief is explicit that this section
 * must not read as a HVAC/Electrical/Plumbing/... catalogue. Statement on
 * the left; a quiet technical plan-view on the right whose discipline labels
 * reveal one at a time on scroll. Deliberately a different visual (plan view,
 * not elevation) from SystemsReveal's building-elevation diagram below it on
 * the page, so the two don't repeat the same drawing.
 */
export function WhatWeDo() {
  return (
    <Section tone="raised">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal-soft)">
            What we do — 06
          </p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-normal leading-[1.02] text-(--color-ink) text-balance">
            We engineer the systems
            <br />
            that make buildings work.
          </h2>
          <p className="mt-8 max-w-lg text-base sm:text-lg leading-relaxed text-(--color-steel)">
            From climate control and electrical infrastructure to water, fire protection and
            intelligent building systems, Airtech brings multiple disciplines together under one
            coordinated engineering approach.
          </p>
          <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-(--color-steel)">
            We work across the project lifecycle — from understanding requirements and
            engineering the right systems to procurement, installation, testing, commissioning
            and long-term support.
          </p>
          <p className="mt-8 max-w-lg font-display text-xl sm:text-2xl font-normal italic leading-snug text-(--color-ink)">
            The result is not simply a collection of installed systems. It is one coordinated
            building environment, engineered to perform.
          </p>
          <Link
            href="/expertise"
            className="mt-9 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-signal-soft) hover:gap-2.5 transition-all"
          >
            Explore Our Expertise
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <Reveal>
          <PlanView />
        </Reveal>
      </div>
    </Section>
  );
}

function PlanView() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="crop-frame relative mx-auto aspect-square w-full max-w-[440px] text-(--color-line)">
      <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Simplified building plan view">
        <rect x={40} y={40} width={320} height={320} fill="none" stroke="var(--color-blueprint)" strokeWidth={1.25} />
        {[133, 227].map((v) => (
          <g key={v}>
            <line x1={v} y1={40} x2={v} y2={360} stroke="var(--color-blueprint)" strokeWidth={0.75} opacity={0.5} />
            <line x1={40} y1={v} x2={360} y2={v} stroke="var(--color-blueprint)" strokeWidth={0.75} opacity={0.5} />
          </g>
        ))}
        <circle cx={200} cy={200} r={5} fill="var(--color-amber)" />
        <line x1={200} y1={40} x2={200} y2={360} stroke="var(--color-steel-soft)" strokeWidth={0.5} strokeDasharray="2 4" />
        <line x1={40} y1={200} x2={360} y2={200} stroke="var(--color-steel-soft)" strokeWidth={0.5} strokeDasharray="2 4" />
      </svg>

      {PLAN_LABELS.map((label, i) => {
        const positions = [
          { top: "6%", left: "50%", translate: "-50%, 0" },
          { top: "50%", left: "94%", translate: "-100%, -50%" },
          { top: "94%", left: "50%", translate: "-50%, -100%" },
          { top: "50%", left: "6%", translate: "0, -50%" },
          { top: "16%", left: "84%", translate: "-100%, 0" },
          { top: "84%", left: "16%", translate: "0, -100%" },
        ];
        const pos = positions[i % positions.length];
        return (
          <motion.span
            key={label.code}
            initial={reduceMotion ? undefined : { opacity: 0 }}
            whileInView={reduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.12 }}
            className="absolute font-mono text-[10px] tracking-[0.1em] uppercase text-(--color-ink)"
            style={{ top: pos.top, left: pos.left, transform: `translate(${pos.translate})` }}
          >
            {label.code}
          </motion.span>
        );
      })}
    </div>
  );
}
