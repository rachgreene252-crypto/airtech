import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  // Full pill, not the drafted-rectangle shape tried earlier — 2026-09-13,
  // reversing that per direct client feedback ("make all buttons rounder
  // and attractive"). A soft lift + shadow on hover gives it some presence
  // instead of just a flat colour swap. Focus ring is a box-shadow, not
  // `outline`, so it draws a clean concentric ring; a paper-coloured inner
  // gap separates it from the fill on the solid variant.
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out outline-none focus-visible:shadow-[0_0_0_2px_var(--color-paper),0_0_0_4px_var(--color-brand-blue)] disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0";

const variants: Record<Variant, string> = {
  // --color-brand-blue is the primary UI blue (~6:1 on white — see
  // globals.css). A press/hover darkens toward --color-brand-blue-hover
  // rather than brightening toward the literal logo blue
  // (--color-brand-blue-soft) — a pressed control should read as "pushed
  // in," not "lit up."
  primary:
    "bg-(--color-brand-blue) text-white shadow-[0_1px_2px_rgba(15,23,32,0.12)] hover:bg-(--color-brand-blue-hover) hover:shadow-[0_10px_24px_-8px_rgba(0,119,170,0.55)]",
  secondary:
    "border border-(--color-brand-blue) text-(--color-brand-blue) hover:bg-(--color-brand-blue) hover:text-white hover:shadow-[0_10px_24px_-8px_rgba(0,119,170,0.4)]",
  ghost: "text-(--color-brand-blue) hover:text-(--color-ink) underline underline-offset-4",
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
