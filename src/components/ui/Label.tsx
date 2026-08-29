import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The sentence-case micro-label pattern (spec §3.3): small, medium-weight,
 * sans — not the old font-mono uppercase-tracked eyebrow. Mono stays
 * reserved for genuine machine data (discipline codes, drawing references,
 * spec values), not prose labels.
 */
export function Label({
  children,
  tone = "accent",
  as: Tag = "span",
  className,
}: {
  children: ReactNode;
  tone?: "accent" | "muted";
  as?: "span" | "p" | "div";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-sans text-label font-medium",
        tone === "accent" ? "text-(--color-brand-blue)" : "text-(--color-steel)",
        className
      )}
    >
      {children}
    </Tag>
  );
}
