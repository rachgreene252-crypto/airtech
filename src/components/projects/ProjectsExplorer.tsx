"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Route } from "next";
import { ProjectCard } from "./ProjectCard";
import { ProjectListRow } from "./ProjectListRow";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Project, Industry } from "@/content/types";

/**
 * Featured projects lead as a card grid; the rest of the portfolio follows
 * as a compact typographic list. One dropdown (industry) narrows both.
 *
 * `urlSync` + `initialIndustry` come from ProjectsView (which reads
 * `?industry=` inside a <Suspense> boundary); `setIndustry` then keeps the
 * URL in step so the dropdown and the "browse by sector" links agree.
 * Without `urlSync` it is a self-contained static shell.
 */
export function ProjectsExplorer({
  projects,
  industries,
  initialIndustry = "",
  urlSync = false,
}: {
  projects: Project[];
  industries: Industry[];
  initialIndustry?: string;
  urlSync?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const seed = industries.some((i) => i.slug === initialIndustry) ? initialIndustry : "";
  const [industryFilter, setIndustryFilter] = useState(seed);

  function setIndustry(value: string) {
    setIndustryFilter(value);
    if (urlSync) {
      router.replace((value ? `${pathname}?industry=${value}` : pathname) as Route, { scroll: false });
    } else if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (value) params.set("industry", value);
      else params.delete("industry");
      const qs = params.toString();
      window.history.replaceState(null, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
    }
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

  const activeName = industries.find((i) => i.slug === industryFilter)?.name;

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
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
        {activeName && (
          <p className="text-small text-(--color-steel)">
            Showing {inIndustry.length} {activeName} project{inIndustry.length === 1 ? "" : "s"} ·{" "}
            <button
              type="button"
              onClick={() => setIndustry("")}
              className="font-medium text-(--color-brand-blue) hover:underline"
            >
              Clear
            </button>
          </p>
        )}
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
          <h2 className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
            {featured.length > 0 ? "Also in our portfolio" : "Portfolio"}
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
