import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  // Sharp corners, not a pill — 2026-09-11, correcting the rounded-full
  // shape that read as generic SaaS. A drafted rectangle (--radius-xs, the
  // same 2px used on crop-frame photo panels elsewhere) fits the site's
  // technical-drawing identity instead. Focus ring is a box-shadow, not
  // `outline`, so it draws a clean concentric rectangle; a paper-coloured
  // inner gap separates it from the fill on the solid variant.
  "inline-flex items-center justify-center gap-2 rounded-[2px] font-medium transition-all duration-150 outline-none focus-visible:shadow-[0_0_0_2px_var(--color-paper),0_0_0_4px_var(--color-brand-blue)] disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-px active:translate-y-0";

const variants: Record<Variant, string> = {
  // --color-brand-blue is the primary UI blue (~6:1 on white — see
  // globals.css). A press/hover darkens toward --color-brand-blue-hover
  // rather than brightening toward the literal logo blue
  // (--color-brand-blue-soft) — a pressed control should read as "pushed
  // in," not "lit up."
  primary: "bg-(--color-brand-blue) text-white hover:bg-(--color-brand-blue-hover)",
  secondary:
    "border border-(--color-brand-blue) text-(--color-brand-blue) hover:bg-(--color-brand-blue) hover:text-white",
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
