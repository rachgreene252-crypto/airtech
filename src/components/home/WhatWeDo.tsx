"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Section 06 — What We Do. Editorial statement + a quiet layered-building
 * motif, deliberately not a HVAC/Electrical/Plumbing/... service list (the
 * brief explicitly rules that out). The full interactive version of this
 * "systems appear on the building" idea is the Our Solutions centerpiece
 * right after — this is the lighter, concise preview.
 */
const LAYERS = [
  { label: "Climate", y: 22 },
  { label: "Power", y: 42 },
  { label: "Water", y: 62 },
  { label: "Safety", y: 82 },
  { label: "Intelligence", y: 102 },
] as const;

export function WhatWeDo() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-(--color-line) bg-(--color-paper) py-20 sm:py-24 lg:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)">
            What we do
          </p>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[0.98] text-(--color-ink) text-balance">
            We engineer the systems
            <br />
            that make buildings work.
          </h2>
          <p className="mt-7 max-w-lg text-base sm:text-lg leading-relaxed text-(--color-steel)">
            From climate control and electrical infrastructure to water, fire protection and
            intelligent building systems, Airtech brings multiple disciplines together under
            one coordinated engineering approach.
          </p>
          <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-(--color-steel)">
            We work across the project lifecycle — from understanding requirements and
            engineering the right systems to procurement, installation, testing, commissioning
            and long-term support.
          </p>
          <p className="mt-7 max-w-lg text-base sm:text-lg leading-relaxed text-(--color-ink-soft) font-medium">
            The result is not simply a collection of installed systems. It is one coordinated
            building environment, engineered to perform.
          </p>
          <Link
            href="/expertise"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-signal) hover:gap-2.5 transition-all"
          >
            Explore Our Expertise
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
          <svg viewBox="0 0 235 200" className="w-full h-auto" role="img" aria-label="Building diagram with layered engineering systems">
            <rect x={40} y={16} width={120} height={168} fill="none" stroke="var(--color-line-strong)" strokeWidth={1.25} />
            {LAYERS.map((layer, i) => (
              <motion.g
                key={layer.label}
                initial={reduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <line x1={40} y1={layer.y} x2={160} y2={layer.y} stroke="var(--color-signal-soft)" strokeWidth={1.5} />
                <text
                  x={166}
                  y={layer.y + 3}
                  fontSize={7}
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.06em"
                  fill="var(--color-steel)"
                >
                  {layer.label.toUpperCase()}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>
      </Container>
    </section>
  );
}
