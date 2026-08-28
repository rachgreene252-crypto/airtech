"use client";

import { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ProjectCard } from "./ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Project, Industry } from "@/content/types";

/**
 * Featured projects only, front and center — not the full 25-project
 * catalog. One dropdown (industry) narrows within that featured set. Card
 * text is centered rather than left-aligned, matching the centered filter
 * above it.
 */
export function ProjectsExplorer({ projects, industries }: { projects: Project[]; industries: Industry[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const industryFilter = searchParams.get("industry") ?? "";

  const featuredProjects = useMemo(() => projects.filter((p) => p.featured), [projects]);

  const filtered = useMemo(() => {
    if (!industryFilter) return featuredProjects;
    return featuredProjects.filter((p) => p.industrySlug === industryFilter);
  }, [featuredProjects, industryFilter]);

  function industryNameFor(project: Project) {
    return industries.find((i) => i.slug === project.industrySlug)?.name;
  }

  // replace (not push): filter changes shouldn't each add a browser-history
  // entry — the back button should return to wherever the visitor came from.
  function setIndustry(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("industry", value);
    else params.delete("industry");
    const qs = params.toString();
    router.replace((qs ? `${pathname}?${qs}` : pathname) as never, { scroll: false });
  }

  return (
    <div>
      <div className="flex justify-center">
        <select
          value={industryFilter}
          onChange={(e) => setIndustry(e.target.value)}
          aria-label="Filter projects by industry"
          className="border border-(--color-line-strong) bg-(--color-paper-raised) px-5 py-2.5 text-sm font-medium text-(--color-ink) focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-signal)"
        >
          <option value="">All industries</option>
          {industries.map((i) => (
            <option key={i.slug} value={i.slug}>
              {i.name}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 text-center">
          <EmptyState title="No featured projects in this industry yet" description="Try another industry or clear the filter." />
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} industryName={industryNameFor(project)} />
          ))}
        </div>
      )}
    </div>
  );
}
