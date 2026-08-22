"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HeaderShell } from "./HeaderShell";

/** Homepage-only transparent-over-hero -> solid-on-scroll behavior — see
 * HeaderShell for why this is split out (Cache Components' Suspense
 * requirement around `usePathname`). Every other route always renders
 * solid, unchanged from before this brief. */
export function HeaderClient() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    if (!isHome) return;
    function onScroll() {
      setScrolled(window.scrollY > 64);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return <HeaderShell transparent={isHome && !scrolled} />;
}
