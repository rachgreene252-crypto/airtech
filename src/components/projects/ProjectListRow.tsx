import Link from "next/link";
import type { Project } from "@/content/types";

/**
 * A compact, typography-led row for a project without real photography — the
 * "small project" unit in the index's sequence, and the shared unit for the
 * related-projects widget on the detail template. Deliberately no image
 * placeholder: an honest text row reads as intentional editorial index
 * design, where a "photography pending" pattern-fill would read as broken.
 * No border rule — separation comes from vertical whitespace, not a
 * repeated horizontal line down the page.
 */
export function ProjectListRow({ project, industryName }: { project: Project; industryName?: string }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-1.5 py-6 transition-colors hover:bg-(--color-paper-raised) sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-2 sm:py-8"
    >
      <div>
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
          {industryName ?? project.projectType}
        </p>
        <h3 className="mt-1 font-display text-xl sm:text-2xl font-semibold leading-tight group-hover:text-(--color-signal) transition-colors">
          {project.name}
        </h3>
      </div>
      {project.location && (
        <p className="shrink-0 text-sm text-(--color-steel)">{project.location}</p>
      )}
    </Link>
  );
}
