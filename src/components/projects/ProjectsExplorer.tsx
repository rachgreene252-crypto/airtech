"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Route } from "next";
import { ProjectCard } from "./ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
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
  allProjects,
}: {
  projects: Project[];
  /** Full portfolio, for chip counts — `projects` omits hospitality on the unfiltered view. */
  allProjects?: Project[];
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
  const countSource = allProjects ?? projects;
  const chips = useMemo(
    () =>
      industries
        .map((i) => ({ slug: i.slug, name: i.name, count: countSource.filter((p) => p.industrySlug === i.slug).length }))
        .filter((c) => c.count > 0 || c.slug === industryFilter),
    [industries, countSource, industryFilter]
  );

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        {/* Chips replaced the <select> 2026-09-29: sectors and their live
            counts are visible at a glance and one tap filters. Sectors
            with no published work get no chip (no dead-end filter); the
            "Explore by sector" tiles below still list them. */}
        <div
          role="group"
          aria-label="Filter projects by industry"
          className="-mx-5 flex w-[calc(100%+2.5rem)] gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:w-auto sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
        >
          {[{ slug: "", name: "All", count: countSource.length }, ...chips].map((chip) => {
            const active = industryFilter === chip.slug;
            return (
              <button
                key={chip.slug || "all"}
                type="button"
                onClick={() => setIndustry(chip.slug)}
                aria-pressed={active}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-(--color-brand-blue-vivid) bg-(--color-brand-blue-vivid) text-white"
                    : "border-(--color-line-strong) bg-(--color-paper) text-(--color-ink-soft) hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
                )}
              >
                {chip.name}
                <span className={cn("font-mono text-[0.6875rem] tabular-nums", active ? "text-white/80" : "text-(--color-steel-soft)")}>
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>
        {activeName && inIndustry.length > 0 && (
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
            title={activeName ? `${activeName} case studies on request` : "No projects in this industry yet"}
            description="Detailed case studies for this sector aren't published yet. Tell us about your project and we'll share relevant references."
          />
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact/project-enquiry">Inquire for Services</ButtonLink>
            <button
              type="button"
              onClick={() => setIndustry("")}
              className="text-sm font-medium text-(--color-brand-blue) hover:underline"
            >
              View all projects
            </button>
          </div>
        </div>
      )}

      {inIndustry.length > 0 && (
        <div className="mt-10">
          <h2 className="sr-only">Projects</h2>
          {/* One continuous card grid, featured projects first (2026-09-28:
              every project as a block, no separate text list). */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
            {[...featured, ...rest].map((project) => (
              <ProjectCard key={project.slug} project={project} industryName={industryNameFor(project)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
