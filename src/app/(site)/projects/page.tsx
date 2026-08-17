import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
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

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        eyebrow="Portfolio"
        heading="Selected work."
        description="A representative cross-section of Airtech's engineering scope. Case-study depth is being expanded project by project as documentation and client permissions are confirmed."
      />
      <Section>
        <Suspense fallback={null}>
          <ProjectsExplorer projects={projects} industries={industries} services={services} />
        </Suspense>
      </Section>
      <div className="lg:hidden h-[68px]" aria-hidden="true" />
      <StickyEnquiryBar />
    </>
  );
}
