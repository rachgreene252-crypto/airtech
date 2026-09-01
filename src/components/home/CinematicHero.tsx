"use client";

import { useEffect, useRef } from "react";
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
 *
 * Layout: a single JSX tree in every state. The scroll-track height lives
 * entirely in CSS (`.hero-scroll-track` in globals.css) — 330vh desktop /
 * 250vh mobile for the scrub, collapsing to one viewport under
 * `prefers-reduced-motion`. Nothing here mutates layout after hydration, so
 * the sections below the hero never shift (an earlier version grew the
 * wrapper height in an effect and measured as CLS ~0.41). Reduced motion /
 * no-JS falls back to a single graded still frame via `motion-reduce:`
 * utilities; the effect below no-ops in that case.
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

  useEffect(() => {
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

    // Hold the rest of the sequence (80–240 requests) until the browser is
    // idle or the visitor scrolls — firing them all at hydration otherwise
    // saturates a slow connection and pushes out the hero's own LCP paint.
    // draw() clamps to loaded frames, so an early scrub just holds frame 0.
    let pumpStarted = false;
    const startPump = () => {
      if (pumpStarted || cancelled) return;
      pumpStarted = true;
      window.removeEventListener("scroll", startPump);
      pump();
    };
    window.addEventListener("scroll", startPump, { once: true, passive: true });
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(startPump, { timeout: 2500 });
    } else {
      window.setTimeout(startPump, 1500);
    }

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

    let currentIndex = 0; // frame index last drawn
    let targetIndex = 0; // frame the scroll position wants (float)
    let renderIndex = 0; // eased position gliding toward targetIndex
    let lastLoadedUpTo = 0;
    let primed = false; // snap (not ease) to the first scroll position

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
        // headline layer a controlled dark field to sit on.
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
    let tickerFn: (() => void) | undefined;
    let gsapForCleanup: { ticker: { remove: (fn: () => void) => void } } | undefined;

    // Scrub distance as a multiple of the live viewport height, kept as a
    // function + invalidateOnRefresh so it tracks orientation changes and
    // the mobile URL bar. Must stay in sync with `.hero-scroll-track`'s
    // min-height in globals.css: 1 viewport (sticky section) + this.
    const scrubViewports = isMobile ? 1.5 : 2.3;
    const endDistance = () => `+=${window.innerHeight * scrubViewports}`;

    // CSS `sticky` does the pinning, not GSAP: ScrollTrigger's own `pin: true`
    // inserts a pin-spacer wrapper div via raw DOM APIs, which Next's Cache
    // Components (React Activity keeps hidden routes' DOM alive instead of
    // unmounting it) can't reconcile against — React expects `section` to
    // stay a direct child of its original parent, and the untracked wrapper
    // causes an `insertBefore` crash the next time React touches that
    // subtree. `section` is `sticky top-0` inside `wrapper`, so ScrollTrigger
    // only reads scroll progress here — it never mutates the DOM.
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      gsapForCleanup = gsap;

      // Keep GSAP's frame clock steady through main-thread stalls (image
      // decodes, route work) so the scrub doesn't jump when it recovers.
      gsap.ticker.lagSmoothing(700, 33);
      ScrollTrigger.config({ ignoreMobileResize: true });

      ctxGsap = gsap.context(() => {
        const st = ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: endDistance,
          pin: false,
          // A slightly longer catch-up than before; the per-frame lerp
          // below adds the final smoothing so playback never visibly steps.
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            targetIndex = self.progress * (total - 1);
            if (!primed) {
              renderIndex = targetIndex;
              primed = true;
            }
            if (indicatorRef.current) {
              indicatorRef.current.style.opacity = String(Math.max(0, 1 - self.progress * 6));
            }
            if (headlineRef.current) {
              headlineRef.current.style.opacity = String(Math.max(0, 1 - self.progress * 3));
            }
          },
        });
        scrollTriggerInstance = st;
      }, wrapper);

      // Render on GSAP's ticker (~60fps) instead of a 400ms interval: ease
      // renderIndex toward the scroll target every frame and only repaint
      // when the rounded frame changes or more frames have finished loading.
      tickerFn = () => {
        renderIndex += (targetIndex - renderIndex) * 0.2;
        if (Math.abs(targetIndex - renderIndex) < 0.01) renderIndex = targetIndex;
        const idx = Math.max(0, Math.min(total - 1, Math.round(renderIndex)));
        const loadedChanged = loadedUpToRef.current !== lastLoadedUpTo;
        if (idx !== currentIndex || loadedChanged) {
          currentIndex = idx;
          lastLoadedUpTo = loadedUpToRef.current;
          draw();
        }
      };
      gsap.ticker.add(tickerFn);
    })();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", startPump);
      if (tickerFn) gsapForCleanup?.ticker.remove(tickerFn);
      scrollTriggerInstance?.kill();
      ctxGsap?.revert();
    };
  }, [reduceMotion]);

  return (
    <div ref={wrapperRef} className="hero-scroll-track relative w-full">
      <section
        ref={sectionRef}
        className="sticky top-0 h-[100dvh] min-h-[560px] w-full overflow-hidden bg-(--color-blue-deep)"
        aria-label="Airtech Industries: engineering the systems behind Nepal's most demanding buildings"
      >
        {/* Base still: the first frame as an eager <img> so the hero has a
            real picture at first paint without waiting on hydration + the
            GSAP chunks, and its bytes are reused by the canvas (same URLs).
            No fetchpriority — it must not contend with the document's own
            critical chain. The canvas draws the full sequence over it once
            motion is allowed; under reduced motion the canvas stays hidden
            and this frame plus the grade below are the whole hero. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- hero still, outside next/image's responsive pipeline */}
        <img
          src="/images/hero/frames-desktop/frame_001.webp"
          srcSet="/images/hero/frames-mobile/frame_001.webp 640w, /images/hero/frames-desktop/frame_001.webp 1280w"
          sizes="100vw"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Palette grade + headline scrim, mirroring canvas draw()'s wash. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-multiply"
          style={{ background: "rgba(13, 43, 62, 0.4)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(22,26,31,0.78), rgba(22,26,31,0.2) 45%, transparent 65%)",
          }}
        />

        {/* Scrubbed frame sequence — drawn over the base still once motion is
            allowed (draw() reapplies the same grade). */}
        <canvas ref={canvasRef} className="absolute inset-0 block motion-reduce:hidden" />

        <div
          ref={headlineRef}
          className="absolute inset-0 flex flex-col items-start justify-end p-6 pb-20 sm:p-10 sm:pb-24 lg:p-16 lg:pb-28"
        >
          <h1 className="max-w-3xl font-display text-display-xl font-bold leading-[0.98] text-balance text-white">
            Engineering the systems behind Nepal&apos;s most demanding buildings.
          </h1>
          <p className="mt-5 max-w-xl text-body-l leading-relaxed text-white/75">
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
          className="absolute inset-x-0 bottom-9 flex justify-center transition-opacity motion-reduce:hidden"
        >
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/40 pt-1.5">
            <span className="h-1.5 w-[1.5px] animate-flow-drop rounded-full bg-white/70" />
          </span>
        </span>
      </section>
    </div>
  );
}
