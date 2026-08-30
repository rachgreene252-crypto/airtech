import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { BluePlaceholder } from "@/components/ui/BluePlaceholder";

/**
 * The single card unit for the Projects grid — same rounded, image-led,
 * hover-reveal treatment as the homepage's FeaturedProjects carousel, so a
 * project always renders as this one shape whether or not real photography
 * exists yet (TechnicalFrame's placeholder fills the same aspect box rather
 * than the grid falling back to a different, text-only layout).
 */
export function ProjectCard({ project, industryName }: { project: Project; industryName?: string }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block overflow-hidden rounded-3xl aspect-[4/3]"
    >
      {project.heroImage?.src ? (
        <>
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/15 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />
        </>
      ) : (
        // Shared BluePlaceholder fallback — same treatment as TechnicalFrame
        // now that both use the blue placeholder system (spec §3.5). No
        // label here: the card's own bottom text block already names the
        // project.
        <BluePlaceholder />
      )}

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-6 text-center">
        <p className="font-sans text-label font-medium text-(--color-brand-blue-soft)">
          {industryName ?? project.projectType}
        </p>
        <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold leading-tight text-(--color-paper)">
          {project.name}
        </h3>
        {project.location && <p className="mt-1 text-sm text-(--color-paper)/75">{project.location}</p>}
        <span className="mt-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-xs font-medium text-(--color-paper) opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View project
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
