import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/types";

export type FeatureVariant = "side" | "overlay" | "side-reversed" | "typographic";

/**
 * A project entry with a real photo — one of four distinct compositions,
 * cycled per project rather than repeating the same image-left/text-right
 * shape for every entry. No hairline rule between entries: separation comes
 * from the layout and scale changing, not a repeated horizontal line.
 */
export function ProjectFeatureRow({
  project,
  industryName,
  index,
  variant,
}: {
  project: Project;
  industryName?: string;
  index: number;
  variant: FeatureVariant;
}) {
  if (!project.heroImage?.src) return null;

  const dark = variant === "overlay";

  const meta = (
    <>
      <p className={cn("font-sans text-label font-medium", dark ? "text-(--color-brand-blue-soft)" : "text-(--color-brand-blue)")}>
        {String(index).padStart(2, "0")} · {industryName ?? project.projectType}
      </p>
      <h3 className={cn("mt-4 font-display text-4xl sm:text-5xl font-semibold leading-[0.98] text-balance", dark && "text-(--color-paper)")}>
        {project.name}
      </h3>
      <p className={cn("mt-3 text-sm", dark ? "text-(--color-paper)/75" : "text-(--color-steel)")}>
        {[project.location, project.airtechRole].filter(Boolean).join(" · ")}
      </p>
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "mt-6 inline-flex items-center gap-1.5 text-sm font-medium hover:gap-2.5 transition-all",
          dark ? "text-(--color-signal-soft)" : "text-(--color-signal)"
        )}
      >
        View case study
        <span aria-hidden="true">→</span>
      </Link>
    </>
  );

  if (variant === "overlay") {
    return (
      <Reveal className="py-6">
        <div className="relative min-h-[68vh] w-full overflow-hidden bg-(--color-ink)">
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/30 to-transparent" />
          <div className="relative z-10 flex h-full max-w-xl flex-col justify-end p-8 sm:p-12 lg:p-16">{meta}</div>
        </div>
      </Reveal>
    );
  }

  if (variant === "typographic") {
    return (
      <Reveal className="grid gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div className="relative order-2 aspect-[3/4] overflow-hidden lg:order-1">
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="order-1 lg:order-2">{meta}</div>
      </Reveal>
    );
  }

  const reversed = variant === "side-reversed";
  return (
    <Reveal className="grid gap-8 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div className={cn("relative min-h-[42vh] overflow-hidden bg-(--color-ink) lg:min-h-[60vh]", reversed && "lg:order-2")}>
        <Image
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className={reversed ? "lg:order-1" : ""}>{meta}</div>
    </Reveal>
  );
}
