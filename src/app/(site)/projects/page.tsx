import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StickyEnquiryBar } from "@/components/ui/StickyEnquiryBar";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { projects } from "@/content/projects";
import { industries } from "@/content/industries";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Airtech's project portfolio across healthcare, hospitality, pharmaceuticals, industrial, corporate, telecom and institutional environments.",
};

// Projects get their own opening composition (brief: "Projects = visual
// portfolio," distinct from the generic PageHero used elsewhere), and no
// filterable-grid first impression — a large editorial statement, then the
// portfolio itself.
export default function ProjectsPage() {
  return (
    <>
      <div className="bg-(--color-paper) pt-8 pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
          <p className="mt-10 font-mono text-xs tracking-[0.2em] uppercase text-(--color-signal)">
            Projects
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-[0.92] text-balance">
            Buildings.
            <br />
            Systems.
            <br />
            Engineering.
          </h1>
        </Container>
      </div>
      <Container>
        <Suspense fallback={null}>
          <ProjectsExplorer projects={projects} industries={industries} services={services} />
        </Suspense>
      </Container>
      <div className="lg:hidden h-[68px]" aria-hidden="true" />
      <StickyEnquiryBar />
    </>
  );
}
