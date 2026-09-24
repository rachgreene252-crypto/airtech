import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StickyEnquiryBar } from "@/components/ui/StickyEnquiryBar";
import { ProjectsView } from "@/components/projects/ProjectsView";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { HospitalitySpotlight } from "@/components/projects/HospitalitySpotlight";
import { projects, getProjectsByIndustry } from "@/content/projects";
import { industries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Airtech's project portfolio, led by hotel and resort work, across healthcare, banking, aviation, industrial and institutional environments.",
};

// A large editorial opening, then the hospitality spotlight (the client's
// hospitality-focus pass), then the filterable portfolio. `?industry=`
// deep-links straight into a filtered view — industries link here rather
// than to a parallel directory.
export default function ProjectsPage() {
  return (
    <>
      <div className="relative overflow-hidden pt-8 pb-14 sm:pb-16 lg:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[24rem] w-[34rem] -translate-x-1/2 rounded-full bg-(--color-brand-blue-soft)/20 blur-[110px]"
        />
        <Container className="relative flex flex-col items-center text-center">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
            className="[&_ol]:justify-center"
            visuallyHidden
          />
          <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
            Projects
          </p>
          <h1 className="mt-5 max-w-[16ch] font-display text-display-xl font-semibold leading-[1.05] tracking-[-0.018em] text-balance">
            Buildings, systems, engineering.
          </h1>
          <span aria-hidden="true" className="mt-5 h-1 w-16 rounded-full bg-(--color-brand-blue-vivid)" />
          <p className="mt-6 max-w-[42rem] text-body-l text-(--color-steel) leading-relaxed">
            Selected work across hospitality, healthcare, banking, aviation, industry
            and institutional buildings, delivered by one engineering team.
          </p>
        </Container>
      </div>

      <Suspense
        fallback={
          <>
            <HospitalitySpotlight projects={getProjectsByIndustry("hospitality")} />
            <Container className="pt-14 sm:pt-16 lg:pt-20">
              <p className="mb-8 text-center font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-(--color-steel-soft)">
                The rest of the portfolio
              </p>
              <ProjectsExplorer
                projects={projects.filter((p) => p.industrySlug !== "hospitality")}
                industries={industries}
              />
            </Container>
          </>
        }
      >
        <ProjectsView
          spotlight={<HospitalitySpotlight projects={getProjectsByIndustry("hospitality")} />}
          projects={projects}
          industries={industries}
        />
      </Suspense>

      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeader eyebrow="Browse by industry" heading="Explore by sector." />
        {/* Redesigned 2026-09-24 ("looks really bad") — a bare text grid
            became tile cards: index, sector name, live project count and a
            hover arrow, so each sector reads as a clickable destination. */}
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {industries.map((industry, i) => {
            const count = getProjectsByIndustry(industry.slug).length;
            return (
              <Link
                key={industry.slug}
                href={`/projects?industry=${industry.slug}` as Route}
                className="group relative flex min-h-[9.5rem] flex-col justify-between overflow-hidden rounded-[6px] border border-(--color-line) bg-(--color-paper-raised) p-5 transition-all duration-300 hover:-translate-y-1 hover:border-(--color-brand-blue-vivid) hover:shadow-[0_18px_40px_-20px_rgba(0,124,183,0.45)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-(--color-brand-blue-vivid) transition-transform duration-300 group-hover:scale-x-100"
                />
                <span className="flex items-center justify-between font-mono text-[0.8125rem] tracking-[0.14em] text-(--color-steel-soft)">
                  {String(i + 1).padStart(2, "0")}
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-(--color-line) text-(--color-ink) transition-all duration-300 group-hover:border-(--color-brand-blue-vivid) group-hover:bg-(--color-brand-blue-vivid) group-hover:text-white"
                  >
                    &rarr;
                  </span>
                </span>
                <span>
                  <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-(--color-ink) text-balance transition-colors group-hover:text-(--color-brand-blue)">
                    {industry.name}
                  </h3>
                  {count > 0 && (
                    <span className="mt-1.5 block text-small text-(--color-steel)">
                      {count} {count === 1 ? "project" : "projects"}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </Container>

      <div className="lg:hidden h-[68px]" aria-hidden="true" />
      <StickyEnquiryBar />
    </>
  );
}
