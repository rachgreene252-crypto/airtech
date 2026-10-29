import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StickyEnquiryBar } from "@/components/ui/StickyEnquiryBar";
import { FeaturedShowcase, FEATURED_SLUGS } from "@/components/projects/FeaturedShowcase";
import { Suspense } from "react";
import { IndustryExplorer, IndustryExplorerFromUrl } from "@/components/projects/IndustryExplorer";
import { NotableProjects } from "@/components/projects/NotableProjects";
import { ClientRegister } from "@/components/projects/ClientRegister";
import { projects } from "@/content/projects";
import { industries } from "@/content/industries";
import { clientGroups } from "@/content/clients";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Airtech's project portfolio, led by hotel and resort work, across healthcare, banking, aviation, industrial and institutional environments.",
};

/**
 * Projects (2026-10-29 redesign). Four steps from the strongest proof to
 * the full record, instead of one long scroll of cards and names:
 *   1. Featured — six signature hotels, an editorial mosaic
 *   2. Explore by industry — pick a sector, the mosaic swaps in place
 *   3. Notable Projects — searchable, filterable index of the rest
 *   4. Client register — every organisation, by sector
 * `?industry=` still deep-links into step 2.
 */
export default function ProjectsPage() {
  const clientsBySector = Object.fromEntries(clientGroups.map((g) => [g.industrySlug, g.clients]));
  // Hospitality already leads twice above (featured, then the explorer's
  // default sector), so the index opens on the other sectors.
  const notable = projects
    .filter((p) => !FEATURED_SLUGS.includes(p.slug))
    .sort((a, b) => Number(a.industrySlug === "hospitality") - Number(b.industrySlug === "hospitality"));

  return (
    <>
      <div className="pt-8 pb-4 sm:pb-6">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects" }]} visuallyHidden />
          <div className="grid gap-6 border-b border-(--color-line-strong) pb-10 lg:grid-cols-12 lg:items-end lg:pb-14">
            <div className="lg:col-span-8">
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">
                Projects
              </p>
              <h1 className="mt-5 max-w-[18ch] font-display text-display-2xl font-semibold leading-[1.02] tracking-[-0.026em] text-balance text-(--color-ink)">
                The work is the proof.
              </h1>
            </div>
            <p className="max-w-md text-body-l leading-relaxed text-(--color-steel) lg:col-span-4">
              Hotels, hospitals, offices, factories and institutions across Nepal, each engineered and
              delivered by one integrated MEP team.
            </p>
          </div>
        </Container>
      </div>

      <FeaturedShowcase priority />
      <Suspense fallback={<IndustryExplorer industries={industries} projects={projects} clientsBySector={clientsBySector} pushBack={FEATURED_SLUGS} />}>
        <IndustryExplorerFromUrl industries={industries} projects={projects} clientsBySector={clientsBySector} pushBack={FEATURED_SLUGS} />
      </Suspense>
      <NotableProjects projects={notable} industries={industries} />
      <Container>
        <ClientRegister />
      </Container>

      <div className="lg:hidden h-[68px]" aria-hidden="true" />
      <StickyEnquiryBar />
    </>
  );
}
