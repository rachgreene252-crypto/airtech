"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Section 06 — What We Do. Editorial statement + a quiet layered-building
 * motif, deliberately not a HVAC/Electrical/Plumbing/... service list (the
 * brief explicitly rules that out). Per the 2026-08-22 visual-correction
 * pass, the diagram sits inside a light, elevated card (not floating thin
 * lines on bare whitespace) with a blue-glass building fill and gold layer
 * lines, so it reads as an intentional engineering visual rather than a
 * placeholder. The full interactive version of this "systems appear on the
 * building" idea is the Our Solutions centerpiece right after.
 */
const LAYERS = [
  { label: "Climate", y: 30 },
  { label: "Power", y: 55 },
  { label: "Water", y: 80 },
  { label: "Safety", y: 105 },
  { label: "Intelligence", y: 130 },
] as const;

export function WhatWeDo() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-(--color-line) bg-(--color-paper) py-20 sm:py-24 lg:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-brand-blue)">
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
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-brand-blue) hover:gap-2.5 transition-all"
          >
            Explore Our Expertise
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-sm rounded-3xl border border-(--color-line-strong) bg-(--color-paper-raised) p-8 shadow-[0_1px_2px_rgba(37,38,41,0.04)] lg:max-w-none">
          <svg viewBox="0 0 260 200" className="w-full h-auto" role="img" aria-label="Building diagram with layered engineering systems">
            <defs>
              <linearGradient id="whatwedo-glass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-brand-blue-tint)" stopOpacity={0.9} />
                <stop offset="100%" stopColor="var(--color-brand-blue-tint)" stopOpacity={0.35} />
              </linearGradient>
            </defs>
            <rect
              x={40}
              y={16}
              width={130}
              height={168}
              rx={4}
              fill="url(#whatwedo-glass)"
              stroke="var(--color-brand-blue)"
              strokeWidth={1.25}
            />
            {LAYERS.map((layer, i) => (
              <motion.g
                key={layer.label}
                initial={reduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <line x1={40} y1={layer.y} x2={170} y2={layer.y} stroke="var(--color-signal-soft)" strokeWidth={1.5} />
                <text
                  x={178}
                  y={layer.y + 3}
                  fontSize={8}
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.05em"
                  fill="var(--color-ink-soft)"
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
