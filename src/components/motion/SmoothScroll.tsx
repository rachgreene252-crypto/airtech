"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useReducedMotion } from "framer-motion";

/**
 * Sitewide smooth scroll. Lenis owns the scroll position and feeds it to
 * GSAP's ticker so every ScrollTrigger (the hero scrub, the systems
 * diagram, the lifecycle track) stays perfectly in step with the eased
 * scroll rather than raw wheel deltas — that's what makes entry/exit read
 * as "smooth" instead of stepped.
 *
 * Under prefers-reduced-motion we don't mount Lenis at all: native scroll
 * takes over and globals.css re-enables `scroll-behavior: smooth` for
 * anchors. ScrollTriggers still work off the native scroll in that case.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      function onScroll() {
        ScrollTrigger.update();
      }
      function raf(time: number) {
        lenisRef.current?.lenis?.raf(time * 1000);
      }

      lenisRef.current?.lenis?.on("scroll", onScroll);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        lenisRef.current?.lenis?.off("scroll", onScroll);
        gsap.ticker.remove(raf);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduceMotion]);

  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 1.05,
        // A slightly restrained wheel feel — premium, not floaty.
        lerp: 0.11,
        anchors: { offset: -80 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
