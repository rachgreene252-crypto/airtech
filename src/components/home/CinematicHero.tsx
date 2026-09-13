"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

const FRAME_COUNT = 240;
const FRAME_SRC = (i: number) => `/images/hero/sequence/frame-${String(i).padStart(3, "0")}.webp`;
const LAST_FRAME = FRAME_SRC(FRAME_COUNT - 1);

/**
 * Section 01 — Hero.
 *
 * Rebuilt 2026-09-13 — the client's own MEP logo-reveal sequence
 * (ASSETS/hero-frames, all 240 frames), scroll-scrubbed on a canvas: the
 * visitor's scroll draws the reveal frame by frame across roughly two
 * screens' worth of scrolling, then the headline follows once it settles.
 * Every frame is preloaded before the scrub is wired up, so scrolling
 * never lands on a blank canvas.
 *
 * 2026-09-15 — the text panel below the canvas is light now (was a dark
 * navy band), per explicit "no dark blue block anywhere" feedback. It sits
 * on the same transparent/sitewide-background material as every other
 * section instead of inverting to a photo-dark bookend.
 */
export function CinematicHero() {
  const panelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const drawnIndexRef = useRef(-1);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  // Preload every frame up front. Reduced-motion visitors never need the
  // sequence at all, so skip the download entirely for them.
  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loaded = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_SRC(i);
      img.onload = () => {
        loaded += 1;
        if (loaded === FRAME_COUNT && !cancelled) setReady(true);
      };
      images.push(img);
    }
    framesRef.current = images;
    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !ready) return;
    const panel = panelRef.current;
    const canvas = canvasRef.current;
    const textPanel = textPanelRef.current;
    if (!panel || !canvas || !textPanel) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let currentIndex = 0;

    function drawFrame(index: number) {
      if (!canvas || !ctx) return;
      const img = framesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const canvasRatio = cw / ch;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let sx = 0,
        sy = 0,
        sw = img.naturalWidth,
        sh = img.naturalHeight;
      if (imgRatio > canvasRatio) {
        sw = sh * canvasRatio;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = sw / canvasRatio;
        sy = (img.naturalHeight - sh) / 2;
      }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
      drawnIndexRef.current = index;
    }

    function sizeCanvas() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      drawnIndexRef.current = -1;
      drawFrame(currentIndex);
    }

    let cancelled = false;
    let ctxGsap: { revert: () => void } | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      sizeCanvas();
      drawFrame(0);

      ctxGsap = gsap.context(() => {
        // `pin: true` (not a manually-sized sticky wrapper) so GSAP inserts
        // and sizes its own spacer — the text panel that follows in the DOM
        // is guaranteed to pick up exactly where the pin releases, with no
        // gap or overlap to get wrong by hand. Scroll distance is ~2 screen
        // heights, so the full 240-frame reveal completes over roughly two
        // scrolls, per spec.
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 2)}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              FRAME_COUNT - 1,
              Math.max(0, Math.round(self.progress * (FRAME_COUNT - 1)))
            );
            currentIndex = index;
            if (index !== drawnIndexRef.current) drawFrame(index);
          },
        });

        gsap.from(textPanel, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: textPanel, start: "top 90%" },
        });
      }, panel);

      window.addEventListener("resize", sizeCanvas);
    })();

    return () => {
      cancelled = true;
      ctxGsap?.revert();
      window.removeEventListener("resize", sizeCanvas);
    };
  }, [reduceMotion, ready]);

  if (reduceMotion) {
    return (
      <div className="relative w-full">
        <div className="relative h-[56svh] min-h-[340px] w-full overflow-hidden bg-white sm:h-[62svh]">
          {/* eslint-disable-next-line @next/next/no-img-element -- static fallback, not part of next/image's responsive pipeline */}
          <img src={LAST_FRAME} alt="Airtech — integrated MEP engineering" className="h-full w-full object-cover" />
        </div>
        <HeroTextPanel />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div
        ref={panelRef}
        className="relative h-[56svh] min-h-[340px] w-full overflow-hidden bg-white sm:h-[62svh]"
      >
        {/* Static first-paint frame: renders immediately (good LCP), sits
            beneath the canvas, and is what reduced-motion / no-JS visitors
            see permanently. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- static fallback beneath the canvas */}
        <img
          src={FRAME_SRC(0)}
          alt="Airtech — integrated MEP engineering"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full transition-opacity duration-300"
          style={{ opacity: ready ? 1 : 0 }}
          aria-hidden="true"
        />
      </div>
      <div ref={textPanelRef}>
        <HeroTextPanel />
      </div>
    </div>
  );
}

function HeroTextPanel() {
  return (
    <section
      className="relative bg-site-texture px-6 py-14 text-center sm:px-10 sm:py-20"
      aria-label="Airtech Industries — keeping Nepal moving"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <p className="font-mono text-label uppercase tracking-[0.24em] text-(--color-brand-blue)">
          Engineering behind the places that matter
        </p>
        <h1 className="mt-7 max-w-[15ch] font-display text-display-2xl font-semibold leading-[1.01] tracking-[-0.025em] text-balance text-(--color-ink)">
          Keeping Nepal moving.
        </h1>
        <p className="mt-7 max-w-lg text-body-l leading-relaxed text-(--color-steel)">
          Integrated MEP and HVAC — from first drawing to commissioning, and
          the years of support that follow.
        </p>
        <div className="mt-11 flex flex-wrap items-center justify-center gap-7">
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Inquire for Services
          </ButtonLink>
          <Link
            href="/projects"
            className="text-sm font-medium text-(--color-ink-soft) underline-offset-4 hover:text-(--color-brand-blue) hover:underline transition-colors"
          >
            Explore our work →
          </Link>
        </div>

        <div className="mt-14 flex items-center gap-3 text-(--color-steel-soft)">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-brand-blue) animate-energy-pulse" />
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em]">
            Reliability matters · Est. 2000 · Integrated MEP since 2013
          </span>
        </div>
      </div>
    </section>
  );
}
