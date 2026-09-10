"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Section 01 — Hero.
 *
 * Rebuilt 2026-09-10 on direct client feedback ("doesn't look alive," "very
 * dull and dark," reference image supplied): the previous hero was a pale,
 * AI-generated architectural line-art still (no real building in it at all)
 * behind centred copy. This is a real, striking project photograph —
 * Hyatt Centric at dusk, lit against the Kathmandu skyline — with a
 * left-aligned text column (photo stays visible, not obscured) and a
 * top-right capability strip + bottom-right photo credit, matching the
 * reference layout directly.
 *
 * GSAP does three things, all transform/opacity only (no layout thrash, so
 * it stays smooth under scroll): a staggered entrance, a slow continuous
 * Ken Burns drift on the photo (so the hero never looks static even before
 * anyone scrolls), and the existing scroll-linked parallax + fade as the
 * hero clears. Everything no-ops under prefers-reduced-motion.
 */
const CAPABILITIES = [
  { code: "hvac", label: "HVAC" },
  { code: "mep", label: "MEP" },
  { code: "water", label: "Hot Water" },
  { code: "fire", label: "Fire Protection" },
] as const;

export function CinematicHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const kenBurnsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const wrapper = wrapperRef.current;
    const headline = headlineRef.current;
    const image = imageRef.current;
    const kenBurns = kenBurnsRef.current;
    if (!wrapper || !headline || !image || !kenBurns) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Intro — quiet, one curve, small travel. The headline wrapper is
        // always visible in the DOM (no inline opacity — that caused a
        // hydration mismatch that left it invisible under reduced motion);
        // GSAP animates the individual lines up from 0.
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from("[data-hero-step]", { opacity: 0, y: 22, duration: 0.8, stagger: 0.1 }, 0.15)
          .from("[data-hero-badge]", { opacity: 0, x: 16, duration: 0.7 }, 0.35);

        // Ken Burns — a slow, continuous drift so the hero reads as alive
        // even before the visitor scrolls. Separate layer from the scroll
        // parallax below so the two transforms never fight.
        gsap.fromTo(
          kenBurns,
          { scale: 1.06, xPercent: 0, yPercent: 0 },
          { scale: 1.14, xPercent: -1.5, yPercent: -1.5, duration: 22, ease: "none", repeat: -1, yoyo: true }
        );

        // Scroll — as the hero scrolls away under the next section, drift
        // the still down (parallax) and fade/lift the copy. Normal scroll,
        // no pin: the sections below simply cover it.
        gsap.to(image, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        gsap.to(headline, {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "70% top",
            scrub: 0.6,
          },
        });
        gsap.to(indicatorRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: wrapper, start: "top top", end: "18% top", scrub: true },
        });
      }, wrapper);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduceMotion]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <section
        className="relative flex h-[100svh] min-h-[620px] w-full items-center overflow-hidden bg-(--color-blue-deep)"
        aria-label="Airtech Industries — keeping Nepal moving"
      >
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <div ref={kenBurnsRef} className="absolute inset-0 will-change-transform">
            {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed hero still, outside next/image's responsive pipeline */}
            <img
              src="/images/landmarks/hyatt-centric.jpg"
              alt=""
              fetchPriority="high"
              className="h-full w-full scale-105 object-cover"
            />
          </div>
        </div>

        {/* Left-to-right grade: the text column gets a confident dark wash,
            the building itself stays bright and clearly visible on the
            right — the reference layout, not a flat vignette over the
            whole frame. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(3,13,23,0.88) 0%, rgba(3,13,23,0.72) 26%, rgba(3,13,23,0.28) 52%, rgba(3,13,23,0.06) 68%, transparent 82%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(3,13,23,0.55) 0%, rgba(3,13,23,0) 30%)",
          }}
        />

        <div
          ref={headlineRef}
          className="relative z-10 flex w-full flex-col px-6 will-change-transform sm:px-10 lg:px-16"
        >
          <div className="mx-auto flex w-full max-w-[1440px] flex-col">
            <p
              data-hero-step
              className="font-mono text-label uppercase tracking-[0.2em] text-(--color-brand-blue-soft)"
            >
              Engineering behind the places that matter
            </p>
            <h1
              data-hero-step
              className="mt-5 max-w-[15ch] font-display text-display-2xl font-semibold leading-[1.02] tracking-[-0.02em] text-balance text-white"
            >
              Keeping Nepal moving.
            </h1>
            <p
              data-hero-step
              className="mt-6 max-w-lg text-body-l leading-relaxed text-white/85"
            >
              Integrated MEP and HVAC — from first drawing to commissioning, and
              the years of support that follow.
            </p>
            <span
              data-hero-step
              className="mt-7 inline-flex w-fit items-center gap-3 border border-(--color-brand-blue-soft)/60 bg-(--color-brand-blue-vivid)/90 px-5 py-2 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-sm"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-white animate-energy-pulse"
              />
              <span className="font-mono text-small font-semibold uppercase tracking-[0.28em]">
                Reliability&nbsp;matters
              </span>
            </span>
            <div data-hero-step className="mt-10 flex flex-wrap items-center gap-6">
              <ButtonLink href="/contact/project-enquiry" size="lg">
                Inquire for Services
              </ButtonLink>
              <Link
                href="/projects"
                className="text-sm font-medium text-white/85 underline-offset-4 hover:text-white hover:underline transition-colors"
              >
                Explore our work →
              </Link>
            </div>
            <p data-hero-step className="mt-9 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-white/60">
              Est. 2000 · HVAC expertise · Integrated MEP since 2013
            </p>
          </div>
        </div>

        {/* Capability strip — top-right, matching the reference's corner
            badge. Real capability codes (src/content/services.ts), not
            decoration. */}
        <div
          data-hero-badge
          className="absolute right-6 top-24 z-10 hidden flex-col gap-3 border border-white/15 bg-(--color-blue-deep)/60 px-4 py-4 backdrop-blur-sm sm:flex lg:right-16"
        >
          {CAPABILITIES.map((c) => (
            <span key={c.code} className="flex items-center gap-2.5 text-white/85">
              <CapabilityIcon code={c.code} />
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em]">{c.label}</span>
            </span>
          ))}
        </div>

        {/* Photo credit — bottom-right, matching the reference's caption. */}
        <div className="absolute bottom-9 right-6 z-10 hidden text-right sm:block lg:right-16">
          <p className="font-display text-small font-medium text-white">Hyatt Centric</p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-white/60">
            Hospitality · Kathmandu
          </p>
        </div>

        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-9 z-10 flex justify-center motion-reduce:hidden sm:hidden"
        >
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/40 pt-1.5">
            <span className="h-1.5 w-[1.5px] animate-flow-drop rounded-full bg-white/70" />
          </span>
        </span>
      </section>
    </div>
  );
}

function CapabilityIcon({ code }: { code: string }) {
  const common = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (code) {
    case "hvac":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 2v20M4.2 6l15.6 12M4.2 18L19.8 6" />
        </svg>
      );
    case "mep":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 3 3 7.5 12 12l9-4.5L12 3ZM3 16.5 12 21l9-4.5M3 12l9 4.5 9-4.5" />
        </svg>
      );
    case "water":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 2s7 8.5 7 13a7 7 0 1 1-14 0c0-4.5 7-13 7-13Z" />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z" />
        </svg>
      );
  }
}
