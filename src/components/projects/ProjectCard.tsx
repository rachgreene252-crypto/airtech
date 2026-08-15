import Link from "next/link";
import { TechnicalFrame } from "@/components/ui/TechnicalFrame";
import type { Project } from "@/content/types";

export function ProjectCard({ project, industryName }: { project: Project; industryName?: string }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <TechnicalFrame image={project.heroImage} label={project.name} showCaption={false} />
      <div className="mt-4">
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-(--color-signal)">
          {industryName ?? project.projectType}
        </p>
        <h3 className="mt-1.5 font-display text-xl font-semibold leading-tight group-hover:text-(--color-blueprint) transition-colors">
          {project.name}
        </h3>
        <p className="mt-2 text-sm text-(--color-steel)">
          {[project.location, project.airtechRole].filter(Boolean).join(" · ")}
        </p>
      </div>
    </Link>
  );
}
