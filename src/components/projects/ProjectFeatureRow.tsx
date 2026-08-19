import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/content/types";

/**
 * A large, alternating image band for a project with real photography — the
 * "large project" unit in the index's large/small/large sequence (brief §12).
 * Reuses the alternating-panel language already established by SystemShowcase
 * so the site's editorial vocabulary stays consistent rather than inventing
 * a third pattern.
 */
export function ProjectFeatureRow({
  project,
  industryName,
  index,
  reversed,
}: {
  project: Project;
  industryName?: string;
  index: number;
  reversed?: boolean;
}) {
  if (!project.heroImage?.src) return null;

  return (
    <div className="grid border-t border-(--color-line) first:border-t-0 lg:grid-cols-2">
      <div className={`relative min-h-[42vh] overflow-hidden bg-(--color-ink) ${reversed ? "lg:order-2" : ""}`}>
        <Image
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className={`flex items-center px-6 py-14 sm:px-10 lg:px-16 ${reversed ? "lg:order-1" : ""}`}>
        <Reveal>
          <p className="font-mono text-xs tracking-[0.14em] uppercase text-(--color-signal)">
            {String(index).padStart(2, "0")} — {industryName ?? project.projectType}
          </p>
          <h3 className="mt-4 font-display text-3xl sm:text-4xl font-semibold leading-[0.98] text-balance">
            {project.name}
          </h3>
          <p className="mt-3 text-sm text-(--color-steel)">
            {[project.location, project.airtechRole].filter(Boolean).join(" · ")}
          </p>
          <Link
            href={`/projects/${project.slug}`}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-signal) hover:gap-2.5 transition-all"
          >
            View case study
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
