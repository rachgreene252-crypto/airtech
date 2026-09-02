"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectListRow } from "./ProjectListRow";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Project, Industry } from "@/content/types";

/**
 * Featured projects lead as a card grid; the rest of the portfolio follows
 * as a compact typographic list so every project detail page has a path in
 * from the index (and matches its sitemap entry). One dropdown (industry)
 * narrows both.
 *
 * Filter state is local (not `useSearchParams`) so the whole list renders on
 * the server and ships in the initial HTML — this keeps the route static and
 * out of a client-only Suspense boundary whose reveal was measuring as CLS
 * ~0.5. Selecting an industry still writes `?industry=` for a shareable link.
 */
export function ProjectsExplorer({ projects, industries }: { projects: Project[]; industries: Industry[] }) {
  const [industryFilter, setIndustryFilter] = useState("");

  function setIndustry(value: string) {
    setIndustryFilter(value);
    const params = new URLSearchParams(window.location.search);
    if (value) params.set("industry", value);
    else params.delete("industry");
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
  }

  const inIndustry = useMemo(
    () => (industryFilter ? projects.filter((p) => p.industrySlug === industryFilter) : projects),
    [projects, industryFilter]
  );
  const featured = useMemo(() => inIndustry.filter((p) => p.featured), [inIndustry]);
  const rest = useMemo(() => inIndustry.filter((p) => !p.featured), [inIndustry]);

  function industryNameFor(project: Project) {
    return industries.find((i) => i.slug === project.industrySlug)?.name;
  }

  return (
    <div>
      <div className="flex justify-center">
        <select
          value={industryFilter}
          onChange={(e) => setIndustry(e.target.value)}
          aria-label="Filter projects by industry"
          className="select-field"
        >
          <option value="">All industries</option>
          {industries.map((i) => (
            <option key={i.slug} value={i.slug}>
              {i.name}
            </option>
          ))}
        </select>
      </div>

      {featured.length === 0 && rest.length === 0 && (
        <div className="mt-16 text-center">
          <EmptyState
            title="No projects in this industry yet"
            description="Try another industry or clear the filter."
          />
        </div>
      )}

      {featured.length > 0 && (
        <div className="mt-10">
          <h2 className="sr-only">Featured projects</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} industryName={industryNameFor(project)} />
            ))}
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div className="mt-16 sm:mt-20">
          <h2 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
            Also in our portfolio
          </h2>
          <div className="mt-4 divide-y divide-(--color-line)">
            {rest.map((project) => (
              <ProjectListRow
                key={project.slug}
                project={project}
                industryName={industryNameFor(project)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
