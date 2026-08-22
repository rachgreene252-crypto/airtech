"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Section 06 — What We Do. Editorial statement + a real Airtech project
 * photograph, deliberately not a HVAC/Electrical/Plumbing/... service list
 * (the brief explicitly rules that out). Per the "no dark rectangles / no
 * generic UI diagrams" correction, this replaced an SVG diagram in a
 * bordered card with the real image itself as the hero, carrying only a
 * restrained blue/gold line overlay — the image remains dominant, the
 * technical marks are secondary.
 */
const MARKS = [
  { label: "Climate", top: "18%" },
  { label: "Power", top: "42%" },
  { label: "Safety", top: "68%" },
] as const;

export function WhatWeDo() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-(--color-paper) py-20 sm:py-24 lg:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
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
          <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-(--color-ink-soft) font-medium">
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

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:aspect-[5/6]">
          <Image
            src="/images/landmarks/chandragiri-hills-resort.jpg"
            alt="Chandragiri Hills Resort — an Airtech engineered building"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          {MARKS.map((mark, i) => (
            <motion.div
              key={mark.label}
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              className="absolute left-6 flex items-center gap-2.5 sm:left-8"
              style={{ top: mark.top }}
            >
              <span className="h-px w-6 bg-(--color-signal-soft)" />
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                {mark.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
