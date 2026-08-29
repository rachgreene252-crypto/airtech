"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Section 02 — Hero. GSAP ScrollTrigger canvas frame-sequence: the full,
 * unmodified 240-frame set from ASSETS/hero-frames, pre-optimized to WebP
 * at build time into public/images/hero/frames-desktop (and a decimated
 * public/images/hero/frames-mobile for small screens — same source frames,
 * every 3rd one, purely a bandwidth optimization, not a content change).
 * Every frame plays exactly as supplied, in order, with nothing drawn on
 * top of the canvas.
 *
 * Loading strategy: frame Images are created upfront but their `src` is
 * only assigned progressively (frame 0 first for instant paint, the rest
 * with limited concurrency) — canvas draws always clamp to the highest
 * contiguously-loaded frame, so scrubbing ahead of the network never shows
 * a blank frame, it just holds the last available one.
 */
const DESKTOP_FRAME_COUNT = 240;
const MOBILE_FRAME_NUMBERS = Array.from({ length: 80 }, (_, i) => 1 + i * 3);
const MOBILE_BREAKPOINT = 768;

function pad3(n: number) {
  return String(n).padStart(3, "0");
}

export function CinematicHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reduceMotion) return;

    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !section || !canvas) return;

    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
    const total = isMobile ? MOBILE_FRAME_NUMBERS.length : DESKTOP_FRAME_COUNT;
    const frameSrc = (i: number) =>
      isMobile
        ? `/images/hero/frames-mobile/frame_${pad3(MOBILE_FRAME_NUMBERS[i])}.webp`
        : `/images/hero/frames-desktop/frame_${pad3(i + 1)}.webp`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(total);
    const loaded: boolean[] = new Array(total).fill(false);
    const loadedUpToRef = { current: 0 };
    let cancelled = false;

    function markLoaded(i: number) {
      loaded[i] = true;
      let p = loadedUpToRef.current;
      while (p < total && loaded[p]) p++;
      loadedUpToRef.current = p;
      if (i === 0) draw();
    }

    function loadFrame(i: number) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => !cancelled && markLoaded(i);
      img.onerror = () => !cancelled && markLoaded(i);
      img.src = frameSrc(i);
      images[i] = img;
    }

    // Frame 0 first for instant paint, then the rest with modest concurrency
    // so the network doesn't starve whichever frame the visitor scrubs to.
    loadFrame(0);
    let next = 1;
    const CONCURRENCY = 6;
    function pump() {
      if (cancelled) return;
      while (next < total && next < loadedUpToRef.current + CONCURRENCY + 1) {
        loadFrame(next);
        next++;
      }
      if (next < total) requestAnimationFrame(pump);
    }
    pump();

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cssW = 0;
    let cssH = 0;

    function resize() {
      if (!section || !canvas) return;
      cssW = section.clientWidth;
      cssH = section.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      draw();
    }

    let currentIndex = 0;

    function draw() {
      if (!ctx || cssW === 0 || cssH === 0) return;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      const drawIndex = Math.min(currentIndex, Math.max(0, loadedUpToRef.current - 1));
      const img = images[drawIndex];
      if (img && img.complete && img.naturalWidth > 0) {
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = cssW / cssH;
        let drawW: number, drawH: number, offsetX: number, offsetY: number;
        if (imgRatio > canvasRatio) {
          drawH = cssH;
          drawW = drawH * imgRatio;
          offsetX = (cssW - drawW) / 2;
          offsetY = 0;
        } else {
          drawW = cssW;
          drawH = drawW / imgRatio;
          offsetX = 0;
          offsetY = (cssH - drawH) / 2;
        }
        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

        // Grade the frame: a --color-blue-deep (#0d2b3e) multiply wash keeps
        // the sequence in the site's palette instead of raw photography
        // tones, then a bottom-up --color-ink (#161a1f) scrim gives the
        // headline layer (Step 4 below) a controlled dark field to sit on.
        ctx.save();
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = "rgba(13, 43, 62, 0.4)";
        ctx.fillRect(0, 0, cssW, cssH);
        ctx.restore();

        const scrim = ctx.createLinearGradient(0, cssH * 0.35, 0, cssH);
        scrim.addColorStop(0, "rgba(22, 26, 31, 0)");
        scrim.addColorStop(1, "rgba(22, 26, 31, 0.78)");
        ctx.fillStyle = scrim;
        ctx.fillRect(0, cssH * 0.35, cssW, cssH * 0.65);
      } else {
        ctx.fillStyle = "#0d2b3e";
        ctx.fillRect(0, 0, cssW, cssH);
      }

      ctx.restore();
    }

    resize();
    window.addEventListener("resize", resize);

    let scrollTriggerInstance: { kill: () => void } | undefined;
    let ctxGsap: { revert: () => void } | undefined;

    const pinDistance = window.innerHeight * (isMobile ? 1.5 : 2.3);
    // CSS `sticky` does the pinning, not GSAP: ScrollTrigger's own `pin: true`
    // inserts a pin-spacer wrapper div via raw DOM APIs, which Next's Cache
    // Components (React Activity keeps hidden routes' DOM alive instead of
    // unmounting it) can't reconcile against — React expects `section` to
    // stay a direct child of its original parent, and the untracked wrapper
    // causes an `insertBefore` crash the next time React touches that
    // subtree. `wrapper` reserves the scroll distance in JSX-owned DOM and
    // `section` is `sticky top-0` inside it (see the returned JSX below), so
    // ScrollTrigger only reads scroll progress here — it never mutates the DOM.
    wrapper.style.height = `${window.innerHeight + pinDistance}px`;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctxGsap = gsap.context(() => {
        const st = ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: `+=${pinDistance}`,
          pin: false,
          scrub: 0.35,
          anticipatePin: 1,
          onUpdate: (self) => {
            currentIndex = Math.min(total - 1, Math.round(self.progress * (total - 1)));
            if (indicatorRef.current) {
              indicatorRef.current.style.opacity = String(Math.max(0, 1 - self.progress * 6));
            }
            if (headlineRef.current) {
              headlineRef.current.style.opacity = String(Math.max(0, 1 - self.progress * 3));
            }
            draw();
          },
        });
        scrollTriggerInstance = st;
      }, wrapper);
    })();

    const drawLoop = window.setInterval(draw, 400);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      window.clearInterval(drawLoop);
      scrollTriggerInstance?.kill();
      ctxGsap?.revert();
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <section className="relative h-[86vh] min-h-[600px] w-full overflow-hidden bg-(--color-blue-deep)">
        {/* eslint-disable-next-line @next/next/no-img-element -- static reduced-motion fallback, not part of next/image's responsive pipeline */}
        <img
          src="/images/hero/frames-desktop/frame_001.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(0.55) saturate(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/35 to-(--color-blue-deep)/30" />
        <div className="relative z-10 flex h-full flex-col items-start justify-end p-6 pb-16 sm:p-10 lg:p-16">
          <h1 className="max-w-3xl font-display text-(--text-display-xl) font-bold leading-[0.98] text-balance text-white">
            Engineering the systems behind Nepal&apos;s most demanding buildings.
          </h1>
          <p className="mt-5 max-w-xl text-(--text-body-l) leading-relaxed text-white/75">
            Integrated MEP and HVAC — from design through commissioning and long-term support.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <ButtonLink href="/contact/project-enquiry" size="lg">
              Discuss your project
            </ButtonLink>
            <Link href="/projects" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Explore our work →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={wrapperRef} className="relative w-full min-h-[100dvh]">
      <section
        ref={sectionRef}
        className="sticky top-0 h-[100dvh] min-h-[560px] w-full overflow-hidden bg-(--color-blue-deep)"
        style={{
          backgroundImage: "url(/images/backgrounds/architectural-light.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="Airtech Industries: engineering the systems behind Nepal's most demanding buildings"
      >
        <canvas ref={canvasRef} className="absolute inset-0 block" />

        <div
          ref={headlineRef}
          className="absolute inset-0 flex flex-col items-start justify-end p-6 pb-20 sm:p-10 sm:pb-24 lg:p-16 lg:pb-28"
        >
          <h1 className="max-w-3xl font-display text-(--text-display-xl) font-bold leading-[0.98] text-balance text-white">
            Engineering the systems behind Nepal&apos;s most demanding buildings.
          </h1>
          <p className="mt-5 max-w-xl text-(--text-body-l) leading-relaxed text-white/75">
            Integrated MEP and HVAC — from design through commissioning and long-term support.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <ButtonLink href="/contact/project-enquiry" size="lg">
              Discuss your project
            </ButtonLink>
            <Link href="/projects" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Explore our work →
            </Link>
          </div>
        </div>

        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-9 flex justify-center transition-opacity"
        >
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/40 pt-1.5">
            <span className="h-1.5 w-[1.5px] animate-flow-drop rounded-full bg-white/70" />
          </span>
        </span>
      </section>
    </div>
  );
}
