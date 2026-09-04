import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function Section({
  children,
  className,
  containerClassName,
  id,
  tone = "paper",
  border = true,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  tone?: "paper" | "ink" | "raised";
  border?: boolean;
}) {
  const toneClasses = {
    paper: "bg-site-texture text-(--color-ink)",
    ink: "bg-(--color-ink) text-(--color-paper)",
    raised: "bg-(--color-paper-raised) text-(--color-ink)",
  }[tone];

  return (
    <section
      id={id}
      className={cn(
        "py-14 sm:py-16 lg:py-20",
        border && "border-t border-(--color-line)",
        toneClasses,
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
