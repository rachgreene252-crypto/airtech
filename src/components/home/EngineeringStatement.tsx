"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Section 03 — Engineering headline. The main statement, immediately after
 * the hero visual. Typography does the work — no supporting imagery here,
 * per the brief's "text should not be text-heavy" instruction.
 */
export function EngineeringStatement() {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="bg-(--color-paper) pt-16 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32">
      <Container className="max-w-4xl">
        <motion.h1
          {...rise(0)}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.96] tracking-tight text-(--color-ink) text-balance"
        >
          Engineering the systems
          <br />
          behind <span className="text-(--color-signal)">extraordinary</span> spaces.
        </motion.h1>

        <motion.p
          {...rise(0.12)}
          className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-(--color-steel)"
        >
          Integrated MEP and HVAC engineering for complex buildings, specialised environments
          and projects where reliability matters.
        </motion.p>

        <motion.p
          {...rise(0.2)}
          className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-(--color-ink-soft)"
        >
          Airtech brings engineering, procurement, execution, commissioning and long-term
          technical support together — giving clients a single engineering partner for the
          systems that make buildings perform.
        </motion.p>

        <motion.div {...rise(0.3)} className="mt-10 flex flex-wrap items-center gap-7">
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Discuss Your Project
          </ButtonLink>
          <Link
            href="/projects"
            className="text-sm font-medium text-(--color-ink)/75 hover:text-(--color-ink) transition-colors"
          >
            Explore Our Work →
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
