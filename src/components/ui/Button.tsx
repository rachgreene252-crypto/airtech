import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-signal) disabled:opacity-50 disabled:pointer-events-none rounded-[3px]";

const variants: Record<Variant, string> = {
  // hover:brightness-90 darkens rather than lightens — --color-signal is
  // already the WCAG-AA-safe darkened bronze (see globals.css); swapping to
  // --color-signal-soft (the brighter literal Champagne Gold) on hover was
  // dropping text contrast to ~2.2:1 against the light paper-colored text,
  // failing AA even though the resting state passes.
  primary: "bg-(--color-signal) text-(--color-paper) hover:brightness-90",
  secondary:
    "border border-(--color-ink) text-(--color-ink) hover:bg-(--color-ink) hover:text-(--color-paper)",
  ghost: "text-(--color-signal) hover:text-(--color-ink) underline underline-offset-4",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

function buttonClasses(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface LinkButtonProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  children,
  className,
  ...rest
}: LinkButtonProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
