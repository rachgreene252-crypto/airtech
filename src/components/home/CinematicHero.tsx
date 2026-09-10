"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Section 01 — Hero.
 *
 * Rebuilt 2026-09-10 again on client feedback: centred (not left-aligned —
 * that was last session's call, reversed here), and now carries the
 * Airtech logo-reveal animation (the "MEP wheel" frame sequence in
 * ASSETS/hero-frames — 240 raw frames, sampled to 40 and compressed to
 * public/images/hero/logo-reveal/ since the raw set is ~800MB) as a small
 * badge above the headline, driven by GSAP. The client asked for this
 * specifically and repeatedly — a prior session's call to drop it (some
 * mid-sequence frames render "Mectritical"-style garbled text as the ring
 * segments cross-fade) is overridden by direct instruction; playing the
 * whole 40-frame set fast (under 1s) keeps the garbled frames from ever
 * holding still enough to read clearly, landing on a fully clean final
 * frame as a static mark.
 */
const LOGO_FRAME_COUNT = 40;
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
  // Starts on frame 1 so the GSAP reveal below has somewhere to animate
  // from; reduced-motion (or if JS never runs the effect) jumps straight to
  // the clean final frame instead of sitting on a half-formed logo forever.
  const [logoFrame, setLogoFrame] = useState(1);

  useEffect(() => {
    if (reduceMotion) {
      setLogoFrame(LOGO_FRAME_COUNT);
      return;
    }
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
        // Intro — the headline column eases up in sequence; the logo badge
        // plays its frame sequence over the same beat, landing on the clean
        // final frame just as the CTAs settle in.
        const frameCounter = { n: 1 };
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from("[data-hero-step]", { opacity: 0, y: 22, duration: 0.8, stagger: 0.1 }, 0.15)
          .from("[data-hero-badge]", { opacity: 0, x: 16, duration: 0.7 }, 0.35)
          .to(
            frameCounter,
            {
              n: LOGO_FRAME_COUNT,
              duration: 0.9,
              ease: "power1.inOut",
              onUpdate: () => setLogoFrame(Math.round(frameCounter.n)),
            },
            0.1
          );

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
          scrollTrigger: { trigger: wrapper, start: "top top", end: "bottom top", scrub: 0.6 },
        });
        gsap.to(headline, {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: { trigger: wrapper, start: "top top", end: "70% top", scrub: 0.6 },
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
        className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-(--color-blue-deep)"
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

        {/* Even top+bottom vignette for centred copy (a left-right grade
            only makes sense for a left-aligned column). */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(3,13,23,0.62) 0%, rgba(3,13,23,0.32) 30%, rgba(3,13,23,0.28) 62%, rgba(3,13,23,0.66) 100%)",
          }}
        />

        <div
          ref={headlineRef}
          className="relative z-10 flex w-full flex-col items-center px-6 text-center will-change-transform sm:px-10"
        >
          {/* Logo-reveal badge — the MEP wheel frame sequence, GSAP-driven. */}
          <span
            data-hero-badge
            className="mb-6 block h-24 w-24 overflow-hidden rounded-full bg-white shadow-[0_8px_30px_rgba(3,13,23,0.35)] ring-1 ring-white/40 sm:h-28 sm:w-28"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- sequential frame swap, not a responsive asset */}
            <img
              src={`/images/hero/logo-reveal/frame_${String(logoFrame).padStart(2, "0")}.webp`}
              alt="Airtech — Mechanical, Electrical, Plumbing"
              className="h-full w-full scale-[1.7] object-cover object-center"
            />
          </span>

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
          <p data-hero-step className="mt-6 max-w-lg text-body-l leading-relaxed text-white/85">
            Integrated MEP and HVAC — from first drawing to commissioning, and
            the years of support that follow.
          </p>
          <span
            data-hero-step
            className="mt-7 inline-flex w-fit items-center gap-3 border border-(--color-brand-blue-soft)/60 bg-(--color-brand-blue-vivid)/90 px-5 py-2 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-sm"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-white animate-energy-pulse" />
            <span className="font-mono text-small font-semibold uppercase tracking-[0.28em]">
              Reliability&nbsp;matters
            </span>
          </span>
          <div data-hero-step className="mt-10 flex flex-wrap items-center justify-center gap-6">
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

          {/* Capability strip — a centred inline row, not a floating corner
              box, to match the centred composition. */}
          <ul data-hero-step className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {CAPABILITIES.map((c) => (
              <li key={c.code} className="flex items-center gap-2 text-white/75">
                <CapabilityIcon code={c.code} />
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em]">{c.label}</span>
              </li>
            ))}
          </ul>

          <p data-hero-step className="mt-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-white/55">
            Est. 2000 · HVAC expertise · Integrated MEP since 2013
          </p>
        </div>

        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-9 z-10 flex justify-center motion-reduce:hidden"
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
  const common = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
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
