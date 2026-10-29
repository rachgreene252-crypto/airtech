import Link from "next/link";
import type { Route } from "next";
import Image from "@/components/ui/Image";
import { BluePlaceholder } from "@/components/ui/BluePlaceholder";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/types";

/**
 * The portfolio's one image unit (2026-10-29 redesign): photograph, name,
 * sector and place are a single object — the caption sits inside the frame,
 * never as a separate list beside it. The parent sets the shape (aspect or
 * grid span) through `className`, so a mosaic can vary proportions while
 * every tile keeps the same type, gradient and hover language.
 */
export function ProjectTile({
  project,
  industryName,
  className,
  sizes = "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw",
  priority,
  index,
  size = "md",
}: {
  project: Project;
  industryName?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Optional running number, shown top-left. */
  index?: number;
  size?: "md" | "lg";
}) {
  const place = project.location?.split(",").pop()?.trim();
  return (
    <Link
      href={`/projects/${project.slug}` as Route}
      className={cn(
        "group relative block overflow-hidden rounded-[3px] bg-(--color-blue-deep) text-white outline-offset-4",
        className
      )}
    >
      {project.heroImage?.src ? (
        <Image
          src={project.heroImage.src}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] motion-reduce:transition-none"
        />
      ) : (
        <BluePlaceholder />
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-(--color-blue-deep)/90 via-(--color-blue-deep)/25 to-transparent transition-opacity duration-500 group-hover:opacity-95"
      />
      {index !== undefined && (
        <span
          aria-hidden="true"
          className="absolute left-4 top-4 font-mono text-[0.75rem] tabular-nums tracking-[0.18em] text-white/85 sm:left-5 sm:top-5"
        >
          {String(index).padStart(2, "0")}
        </span>
      )}
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
        <span className="min-w-0">
          <span className="block font-mono text-[0.75rem] uppercase tracking-[0.14em] text-white/80">
            {[industryName ?? project.projectType, place].filter(Boolean).join(" · ")}
            {project.projectStatus === "ongoing" && <span className="ml-2 text-(--color-brand-blue-soft)">Ongoing</span>}
          </span>
          <span
            className={cn(
              "mt-1.5 block font-display font-semibold leading-[1.12] tracking-[-0.012em] text-balance",
              size === "lg" ? "text-[1.5rem] sm:text-[2rem]" : "text-[1.1875rem] sm:text-[1.3125rem]"
            )}
          >
            {project.name}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:border-(--color-brand-blue-vivid) group-hover:bg-(--color-brand-blue-vivid) group-focus-visible:bg-(--color-brand-blue-vivid)"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </span>
    </Link>
  );
}
