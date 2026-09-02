import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Section header. Centred by default — the site's standing layout rule is
 * "every page centre-aligned." Pass align="left" for the few places a
 * left-aligned header genuinely reads better (e.g. a row list beside it).
 *
 * The eyebrow reads like a coordination drawing's sheet reference
 * ("M — MECHANICAL", "04 — PROJECTS"); the heading is Fraunces at a light
 * display weight, leaning on size rather than boldness for hierarchy.
 */
export function SectionHeader({
  eyebrow,
  heading,
  description,
  align = "center",
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
        align === "center" ? "mx-auto text-center" : "",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 font-mono text-label font-medium uppercase tracking-[0.14em]",
            tone === "ink" ? "text-(--color-brand-blue)" : "text-(--color-brand-blue-soft)"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-display-l font-normal leading-[1.08] tracking-[-0.012em] text-balance">
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-body-l leading-relaxed",
            align === "center" && "mx-auto",
            "max-w-[46rem]",
            tone === "ink" ? "text-(--color-steel)" : "text-(--color-steel-soft)"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
