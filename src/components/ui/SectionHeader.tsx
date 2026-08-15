import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Drawing-sheet style section header — the eyebrow reads like a coordination
 * drawing's sheet reference (e.g. "M — MECHANICAL", "04 — PROJECTS").
 */
export function SectionHeader({
  eyebrow,
  heading,
  description,
  align = "left",
  className,
  tone = "ink",
}: {
  eyebrow?: string;
  heading: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 font-mono text-xs tracking-[0.18em] uppercase",
            tone === "ink" ? "text-(--color-signal)" : "text-(--color-signal-soft)"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.98] text-balance">
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base sm:text-lg leading-relaxed",
            tone === "ink" ? "text-(--color-steel)" : "text-(--color-steel-soft)"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
