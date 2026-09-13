"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

const START_SRC = "/images/hero/sequence/reveal-start.webp";
const END_SRC = "/images/hero/sequence/reveal-end.webp";

/**
 * Section 01 — Hero.
 *
 * Rebuilt 2026-09-13 — replaces the static Ken Burns photo with the client's
 * own MEP logo-reveal artwork (ASSETS/hero-frames), scroll-driven: the
 * unbranded sketch dissolves into the fully-formed logo as the visitor
 * scrolls, then the headline follows.
 *
 * The full 240-frame source sequence was auditioned frame by frame first —
 * roughly the middle third of it (the logo assembling) contains visible
 * AI-generation artefacts (garbled interim lettering: "Mectriitial",
 * "lumbing"), legible enough that stepping through those frames on scroll
 * would read as a broken build, exactly the "no mistakes" the animation was
 * asked to avoid. Only the first frame (bare sketch, no logo) and the last
 * (logo fully correct and stable) are clean, so the reveal is a two-image
 * crossfade between those two rather than a frame-by-frame scrub — visually
 * simpler, but the only version of this asset with zero glitch frames.
 */
export function CinematicHero() {
  const panelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const startImgRef = useRef<HTMLImageElement | null>(null);
  const endImgRef = useRef<HTMLImageElement | null>(null);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;
    let loaded = 0;
    const onOne = () => {
      loaded += 1;
      if (loaded === 2 && !cancelled) setReady(true);
    };
    const start = new Image();
    start.src = START_SRC;
    start.onload = onOne;
    const end = new Image();
    end.src = END_SRC;
    end.onload = onOne;
    startImgRef.current = start;
    endImgRef.current = end;
    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !ready) return;
    const panel = panelRef.current;
    const canvas = canvasRef.current;
    const textPanel = textPanelRef.current;
    const start = startImgRef.current;
    const end = endImgRef.current;
    if (!panel || !canvas || !textPanel || !start || !end) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let progress = 0;

    function coverRect(img: HTMLImageElement, cw: number, ch: number) {
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
      return { sx, sy, sw, sh };
    }

    function draw() {
      if (!canvas || !ctx || !start || !end) return;
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);
      const a = coverRect(start, cw, ch);
      ctx.globalAlpha = 1;
      ctx.drawImage(start, a.sx, a.sy, a.sw, a.sh, 0, 0, cw, ch);
      const b = coverRect(end, cw, ch);
      ctx.globalAlpha = progress;
      ctx.drawImage(end, b.sx, b.sy, b.sw, b.sh, 0, 0, cw, ch);
      ctx.globalAlpha = 1;
    }

    function sizeCanvas() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw();
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

      ctxGsap = gsap.context(() => {
        // `pin: true` (not a manually-sized sticky wrapper) so GSAP inserts
        // and sizes its own spacer — the text panel that follows in the DOM
        // is guaranteed to pick up exactly where the pin releases, with no
        // gap or overlap to get wrong by hand.
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 1.1)}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            progress = self.progress;
            draw();
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
          <img src={END_SRC} alt="Airtech — integrated MEP engineering" className="h-full w-full object-cover" />
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
          src={START_SRC}
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
      className="relative bg-(--color-blue-deep) px-6 py-16 text-center sm:px-10 sm:py-20"
      aria-label="Airtech Industries — keeping Nepal moving"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <p className="font-mono text-label uppercase tracking-[0.24em] text-(--color-brand-blue-soft)">
          Engineering behind the places that matter
        </p>
        <h1 className="mt-7 max-w-[15ch] font-display text-display-2xl font-semibold leading-[1.01] tracking-[-0.025em] text-balance text-white">
          Keeping Nepal moving.
        </h1>
        <p className="mt-7 max-w-lg text-body-l leading-relaxed text-white/85">
          Integrated MEP and HVAC — from first drawing to commissioning, and
          the years of support that follow.
        </p>
        <div className="mt-11 flex flex-wrap items-center justify-center gap-7">
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

        <div className="mt-14 flex items-center gap-3 text-white/60">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-brand-blue-soft) animate-energy-pulse" />
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em]">
            Reliability matters · Est. 2000 · Integrated MEP since 2013
          </span>
        </div>
      </div>
    </section>
  );
}
