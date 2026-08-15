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
    paper: "bg-(--color-paper) text-(--color-ink)",
    ink: "bg-(--color-ink) text-(--color-paper)",
    raised: "bg-(--color-paper-raised) text-(--color-ink)",
  }[tone];

  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-28",
        border && "border-t border-(--color-line)",
        toneClasses,
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
