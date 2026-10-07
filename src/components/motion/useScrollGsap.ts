"use client";

import { useEffect, type RefObject } from "react";
import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type Setup = (gsap: typeof GsapType, ScrollTrigger: typeof ScrollTriggerType) => void;

/**
 * Lazy-loads GSAP + ScrollTrigger and runs `setup` inside a matchMedia scope
 * on `scope`, only for visitors without reduced motion and at or above
 * `minWidth`. Everything created inside is reverted on unmount, so the
 * static (no-JS / reduced-motion / small-screen) layout is always the
 * fallback. SmoothScroll already feeds Lenis into ScrollTrigger.
 */
export function useScrollGsap(scope: RefObject<HTMLElement | null>, setup: Setup, minWidth = 768) {
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || !scope.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia(scope.current);
      mm.add(`(min-width: ${minWidth}px) and (prefers-reduced-motion: no-preference)`, () => {
        setup(gsap, ScrollTrigger);
      });
      revert = () => mm.revert();
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
    // `setup` is defined inline by callers and intentionally not a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope, minWidth]);
}
