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
      <div className="pt-8 pb-14 sm:pb-16 lg:pb-20">
        <Container className="flex flex-col items-center text-center">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
            className="[&_ol]:justify-center"
          />
          <p className="mt-10 font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
            Projects
          </p>
          <h1 className="mt-5 max-w-[16ch] font-display text-display-xl font-normal leading-[1.05] tracking-[-0.014em] text-balance">
            Buildings, systems, engineering.
          </h1>
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
              <p className="mb-8 text-center font-mono text-[0.75rem] uppercase tracking-[0.14em] text-(--color-steel-soft)">
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
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-8 text-left sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/projects?industry=${industry.slug}` as Route}
              className="group block border-t border-(--color-line) pt-4"
            >
              <h3 className="font-display text-body-l font-normal leading-snug text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
                {industry.name}
              </h3>
            </Link>
          ))}
        </div>
      </Container>

      <div className="lg:hidden h-[68px]" aria-hidden="true" />
      <StickyEnquiryBar />
    </>
  );
}
