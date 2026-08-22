import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-blue) disabled:opacity-50 disabled:pointer-events-none rounded-full hover:-translate-y-px active:translate-y-0";

const variants: Record<Variant, string> = {
  // --color-brand-blue is the accessible (~5.3:1) darkened pairing of the
  // literal logo blue --color-brand-blue-soft (see globals.css) — safe for
  // white button-label text. Hovering toward the brighter literal brand
  // blue reads as a "lift" without needing a shadow/animation trick.
  primary: "bg-(--color-brand-blue) text-white hover:bg-(--color-brand-blue-soft)",
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
