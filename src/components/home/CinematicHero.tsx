"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Section 01 — Hero.
 *
 * Was a 240-frame scroll-scrubbed canvas sequence; the source frames turned
 * out to be an AI-generated glossy "MEP" wheel with warped lettering — the
 * exact visual trope the brand brief rules out — so the sequence is gone.
 * What's kept is the motion the client liked: a choreographed intro (the
 * headline column eases up in sequence, a hairline draws) and a slow
 * scroll-linked parallax + fade on a single clean architectural still.
 *
 * All GSAP is dynamically imported and no-ops under `prefers-reduced-motion`
 * (the still + a fully-visible headline are the whole hero there).
 */
export function CinematicHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const wrapper = wrapperRef.current;
    const headline = headlineRef.current;
    const image = imageRef.current;
    if (!wrapper || !headline || !image) return;

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
        // Intro — quiet, one curve, small travel.
        gsap.set(headline, { opacity: 1 });
        const intro = gsap.timeline({ defaults: { ease: "power2.out" } });
        intro
          .from("[data-hero-step]", { opacity: 0, y: 18, duration: 0.7, stagger: 0.09 }, 0.15)
          .from("[data-hero-rule]", { scaleX: 0, duration: 0.9 }, 0.4);

        // Scroll — as the hero scrolls away under the next section, drift
        // the still down + up-scale it a touch (parallax) and fade/lift the
        // copy. Normal scroll, no pin: the sections below simply cover it.
        gsap.to(image, {
          yPercent: 12,
          scale: 1.08,
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
        className="relative flex h-[100svh] min-h-[560px] w-full items-center justify-center overflow-hidden bg-(--color-blue-deep)"
        aria-label="Airtech Industries — engineering what keeps Nepal moving"
      >
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed hero still, outside next/image's responsive pipeline */}
          <img
            src="/images/hero/frames-desktop/frame_001.webp"
            srcSet="/images/hero/frames-mobile/frame_001.webp 640w, /images/hero/frames-desktop/frame_001.webp 1280w"
            sizes="100vw"
            alt=""
            fetchPriority="high"
            className="h-full w-full scale-105 object-cover"
          />
        </div>

        {/* Light grade: a faint cool wash to hold the palette, plus a soft
            top+bottom vignette so the centred copy stays legible without
            darkening the whole frame. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-multiply"
          style={{ background: "rgba(12, 34, 51, 0.14)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,16,22,0.30), rgba(10,16,22,0.02) 38%, rgba(10,16,22,0.08) 70%, rgba(10,16,22,0.46))",
          }}
        />

        <div
          ref={headlineRef}
          className="relative z-10 flex flex-col items-center px-6 text-center will-change-transform"
          style={{ opacity: reduceMotion ? 1 : 0 }}
        >
          <p
            data-hero-step
            className="font-mono text-label uppercase tracking-[0.2em] text-white/80"
          >
            Est. 2000 · Kathmandu, Nepal
          </p>
          <h1
            data-hero-step
            className="mt-6 max-w-[15ch] font-display text-display-2xl font-normal leading-[1.02] tracking-[-0.015em] text-balance text-white"
          >
            Engineering what keeps Nepal moving.
          </h1>
          <span
            data-hero-rule
            aria-hidden="true"
            className="mt-8 block h-px w-24 origin-center bg-white/50"
          />
          <p
            data-hero-step
            className="mt-8 max-w-xl text-body-l leading-relaxed text-white/85"
          >
            Integrated MEP and HVAC — from first drawing to commissioning, and
            the years of support that follow.
          </p>
          <div data-hero-step className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <ButtonLink href="/contact/project-enquiry" size="lg">
              Discuss your project
            </ButtonLink>
            <Link
              href="/projects"
              className="text-sm font-medium text-white/85 underline-offset-4 hover:text-white hover:underline transition-colors"
            >
              Explore our work →
            </Link>
          </div>
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
