import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/types";

export type FeatureVariant = "side" | "side-reversed" | "overlay";

/**
 * A project entry with a real photo — the image sits in a bounded 4:3 frame
 * (not a viewport-height block) so a list of these stays compact and
 * predictable. `side` / `side-reversed` alternate which side the photo is on.
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
      <p
        className={cn(
          "font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em]",
          dark ? "text-(--color-brand-blue-soft)" : "text-(--color-brand-blue)"
        )}
      >
        {String(index).padStart(2, "0")} · {industryName ?? project.projectType}
      </p>
      <h3
        className={cn(
          "mt-4 font-display text-display-m font-normal leading-[1.1] tracking-[-0.012em] text-balance",
          dark && "text-(--color-paper)"
        )}
      >
        {project.name}
      </h3>
      {project.location && (
        <p className={cn("mt-2 text-small", dark ? "text-(--color-paper)/75" : "text-(--color-steel)")}>
          {project.location}
        </p>
      )}
      <Link
        href={`/projects/${project.slug}` as Route}
        className={cn(
          "mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-all hover:gap-2.5",
          dark ? "text-(--color-brand-blue-soft)" : "text-(--color-brand-blue)"
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
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-(--color-ink)">
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/30 to-transparent" />
          <div className="relative z-10 flex h-full max-w-xl flex-col justify-end p-8 sm:p-12">{meta}</div>
        </div>
      </Reveal>
    );
  }

  const reversed = variant === "side-reversed";
  return (
    <Reveal className="grid gap-8 py-10 sm:py-12 lg:grid-cols-2 lg:items-center lg:gap-14">
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-[4px] bg-(--color-ink)",
          reversed && "lg:order-2"
        )}
      >
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
