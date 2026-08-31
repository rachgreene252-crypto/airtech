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
            "mb-3.5 font-sans text-label font-medium tracking-[0.01em]",
            tone === "ink" ? "text-(--color-brand-blue)" : "text-(--color-brand-blue-soft)"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-[1.06] tracking-[-0.015em] text-balance">
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-[44rem] text-base sm:text-lg leading-relaxed",
            tone === "ink" ? "text-(--color-steel)" : "text-(--color-steel-soft)"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
