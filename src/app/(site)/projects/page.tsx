import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StickyEnquiryBar } from "@/components/ui/StickyEnquiryBar";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { projects } from "@/content/projects";
import { industries } from "@/content/industries";

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
      <div className="pt-8 pb-14 sm:pb-16 lg:pb-20">
        <Container className="flex flex-col items-center text-center">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
            className="[&_ol]:justify-center"
          />
          <p className="mt-10 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
            Projects
          </p>
          <h1 className="mt-5 max-w-[16ch] font-display text-display-xl font-normal leading-[1.05] tracking-[-0.014em] text-balance">
            Buildings, systems, engineering.
          </h1>
          <p className="mt-6 max-w-[42rem] text-body-l text-(--color-steel) leading-relaxed">
            Selected work across hospitality, healthcare, banking, aviation, industry
            and institutional buildings — delivered by one engineering team.
          </p>
        </Container>
      </div>
      <Container>
        <ProjectsExplorer projects={projects} industries={industries} />
      </Container>

      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeader eyebrow="Browse by industry" heading="Explore by sector." />
        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group block border-t border-(--color-line) pt-4"
            >
              <h3 className="font-display text-lg font-semibold leading-snug text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
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
