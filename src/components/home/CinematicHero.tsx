"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Section 01 — Hero.
 *
 * Rebuilt 2026-09-11 again — the overlaid-text version put the headline
 * directly across the busiest part of the photo (the lit tower windows),
 * which read as messy and hard to hold onto ("I hate it"). Restructured
 * into two honest panels instead of one: a full-bleed cinematic photo
 * panel carrying the GSAP Ken Burns drift with nothing written on top of
 * it, then a solid panel directly below it where the headline gets full,
 * uncompromised contrast. The GSAP intro sequences the two in order — the
 * photo settles first, the text panel's copy eases in after — instead of
 * both fighting for the same instant.
 */
export function CinematicHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const kenBurnsRef = useRef<HTMLDivElement>(null);
  const photoPanelRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const wrapper = wrapperRef.current;
    const kenBurns = kenBurnsRef.current;
    const photoPanel = photoPanelRef.current;
    const textPanel = textPanelRef.current;
    if (!wrapper || !kenBurns || !photoPanel || !textPanel) return;

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
        // Intro — the photo settles in first (a slow scale-down from a touch
        // zoomed-in), and only once that's mostly resolved does the text
        // panel's copy ease up. Sequential, not simultaneous.
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(photoPanel, { opacity: 0, duration: 1, ease: "power2.out" }, 0)
          .from("[data-hero-step]", { opacity: 0, y: 20, duration: 0.8, stagger: 0.09 }, 0.55);

        // Ken Burns — a slow, continuous drift on the photo itself, so the
        // panel never looks static even once the intro has finished.
        gsap.fromTo(
          kenBurns,
          { scale: 1.05, xPercent: 0, yPercent: 0 },
          { scale: 1.13, xPercent: -1.5, yPercent: -1.5, duration: 24, ease: "none", repeat: -1, yoyo: true }
        );

        // Scroll — a light parallax on the photo panel only; the text panel
        // sits on a flat colour and scrolls normally underneath it.
        gsap.to(kenBurns, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: wrapper, start: "top top", end: "bottom top", scrub: 0.6 },
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
      {/* Photo panel — cinematic, full-bleed, nothing written on top of it. */}
      <div
        ref={photoPanelRef}
        className="relative h-[62svh] min-h-[380px] w-full overflow-hidden bg-(--color-blue-deep) will-change-transform sm:h-[68svh]"
        aria-hidden="true"
      >
        <div ref={kenBurnsRef} className="absolute inset-0 will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed cinematic still, outside next/image's responsive pipeline */}
          <img
            src="/images/landmarks/hyatt-centric.jpg"
            alt="Hyatt Centric, Kathmandu — lit at dusk"
            fetchPriority="high"
            className="h-full w-full scale-105 object-cover"
          />
        </div>
        {/* A soft top wash (so the sticky nav's white bar reads cleanly
            against it) and a bottom fade into the text panel's own colour,
            not a flat vignette meant to hold text. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(3,13,23,0.28) 0%, rgba(3,13,23,0) 26%, rgba(3,13,23,0) 70%, var(--color-blue-deep) 100%)",
          }}
        />
      </div>

      {/* Text panel — full, uncompromised contrast, directly beneath. */}
      <section
        ref={textPanelRef}
        className="relative bg-(--color-blue-deep) px-6 py-16 text-center sm:px-10 sm:py-20"
        aria-label="Airtech Industries — keeping Nepal moving"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <p
            data-hero-step
            className="font-mono text-label uppercase tracking-[0.24em] text-(--color-brand-blue-soft)"
          >
            Engineering behind the places that matter
          </p>
          <h1
            data-hero-step
            className="mt-7 max-w-[15ch] font-display text-display-2xl font-semibold leading-[1.01] tracking-[-0.025em] text-balance text-white"
          >
            Keeping Nepal moving.
          </h1>
          <p data-hero-step className="mt-7 max-w-lg text-body-l leading-relaxed text-white/85">
            Integrated MEP and HVAC — from first drawing to commissioning, and
            the years of support that follow.
          </p>
          <div data-hero-step className="mt-11 flex flex-wrap items-center justify-center gap-7">
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

          <div data-hero-step className="mt-14 flex items-center gap-3 text-white/60">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-brand-blue-soft) animate-energy-pulse" />
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em]">
              Reliability matters · Est. 2000 · Integrated MEP since 2013
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
