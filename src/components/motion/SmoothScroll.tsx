"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  // Lenis owns scroll position independently of the browser, so a
  // client-side route change (Next <Link>) left the visitor at their old
  // scroll Y on the new page — reading as "navigation dumps you in the
  // middle of the page." Force both Lenis and native scroll to the top on
  // every route change, before paint.
  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    // The new route's content mounts with a different real height than
    // whatever Lenis last measured on the previous page — resize before the
    // visitor scrolls, not after autoResize's debounce catches up.
    const id = window.setTimeout(() => lenisRef.current?.lenis?.resize(), 50);
    return () => window.clearTimeout(id);
  }, [pathname]);

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

      // Lenis's own autoResize (a ResizeObserver on documentElement) and
      // ScrollTrigger's cached trigger positions can both go stale when a
      // page's real height only settles after mount — a late image without
      // reserved space, a GSAP-driven section that changes height as it
      // builds, a font swap nudging line count. Symptom: scroll physically
      // stops short of the real bottom of the page ("can't scroll past
      // this"), because Lenis is still bounding movement to an earlier,
      // shorter measurement. Force both back in sync at the moments most
      // likely to have invalidated them, rather than trusting each
      // library's own debounce to always catch it.
      const resync = () => {
        lenisRef.current?.lenis?.resize();
        ScrollTrigger.refresh();
      };
      window.addEventListener("load", resync);
      const resizeObserver = new ResizeObserver(resync);
      resizeObserver.observe(document.documentElement);
      // Fonts swapping in after first paint (display: swap) can also change
      // line count/height without a corresponding element resize.
      document.fonts?.ready?.then(resync).catch(() => {});

      cleanup = () => {
        lenisRef.current?.lenis?.off("scroll", onScroll);
        gsap.ticker.remove(raf);
        window.removeEventListener("load", resync);
        resizeObserver.disconnect();
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
