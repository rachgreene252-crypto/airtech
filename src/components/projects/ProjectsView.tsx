"use client";

import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProjectsExplorer } from "./ProjectsExplorer";
import type { Project, Industry } from "@/content/types";

/**
 * Client shell for the Projects portfolio. Reads `?industry=`: the
 * hospitality spotlight only shows on the unfiltered view (it would just
 * repeat the filtered list otherwise); the explorer always shows and stays
 * in sync with the URL. Must sit inside a <Suspense> boundary
 * (useSearchParams).
 */
export function ProjectsView({
  spotlight,
  projects,
  industries,
}: {
  spotlight: ReactNode;
  projects: Project[];
  industries: Industry[];
}) {
  const industry = useSearchParams().get("industry") ?? "";
  const filtered = industries.some((i) => i.slug === industry);

  // On the unfiltered view the hospitality spotlight already leads with the
  // hotel/resort work, so the explorer below drops hospitality to avoid
  // showing the same projects twice in one scroll. Filtering to hospitality
  // hides the spotlight and brings them back into the explorer.
  const explorerProjects = filtered
    ? projects
    : projects.filter((p) => p.industrySlug !== "hospitality");

  return (
    <>
      {!filtered && spotlight}
      <Container className="pt-14 sm:pt-16 lg:pt-20">
        {!filtered && (
          <p className="mb-8 text-center font-mono text-[0.75rem] uppercase tracking-[0.14em] text-(--color-steel-soft)">
            The rest of the portfolio
          </p>
        )}
        <ProjectsExplorer
          key={industry}
          projects={explorerProjects}
          industries={industries}
          initialIndustry={industry}
          urlSync
        />
      </Container>
    </>
  );
}
