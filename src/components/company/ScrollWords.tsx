"use client";

import { useRef, type ReactNode } from "react";
import { useScrollGsap } from "@/components/motion/useScrollGsap";
import { cn } from "@/lib/cn";

type Part = string | { text: string; className?: string };

/**
 * A statement that lights up word by word as it scrolls through the
 * viewport. Words start dim (`dimClass`) and brighten in reading order,
 * scrubbed to scroll. Without motion they are simply at full strength.
 */
export function ScrollWords({
  parts,
  className,
  dimOpacity = 0.16,
  as: Tag = "p",
  after,
}: {
  parts: Part[];
  className?: string;
  dimOpacity?: number;
  as?: "p" | "h2" | "blockquote";
  after?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useScrollGsap(ref, (gsap) => {
    const words = gsap.utils.toArray<HTMLElement>(ref.current!.querySelectorAll("[data-w]"));
    gsap.fromTo(
      words,
      { opacity: dimOpacity },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 42%", scrub: 0.4 },
      }
    );
  }, 0);

  let i = 0;
  const words = parts.flatMap((p, pi) => {
    const text = typeof p === "string" ? p : p.text;
    const cls = typeof p === "string" ? undefined : p.className;
    return (pi > 0 ? " " + text : text)
      .split(/(\s+)/)
      .filter(Boolean)
      .map((w) =>
        /^\s+$/.test(w) ? (
          " "
        ) : (
          <span key={i++} data-w className={cn("inline-block", cls)}>
            {w}
          </span>
        )
      );
  });

  return (
    <Tag ref={ref as never} className={className}>
      {words}
      {after}
    </Tag>
  );
}
