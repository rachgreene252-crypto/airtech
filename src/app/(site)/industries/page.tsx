import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { StickyEnquiryBar } from "@/components/ui/StickyEnquiryBar";
import { industries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Sectors Airtech engineers for: healthcare, hospitality, pharmaceuticals, industrial, corporate, telecom/data centres, banking, auditoriums, embassies/INGOs and education.",
};

// A sector atlas, not a grid of boxes: large typographic rows, each carrying
// the industry's real operational-challenge line as its own specification
// text — same editorial index pattern as /expertise and /projects.
export default function IndustriesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        eyebrow="Sectors"
        heading="Designed around what each sector actually needs."
        description="Healthcare, pharmaceuticals, hospitality, industrial and telecom environments each carry distinct operational demands. Airtech designs to the requirement, not a generic template."
      />
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {industries.map((industry, i) => (
          <Reveal key={industry.slug} delay={i * 0.03}>
            <Link
              href={`/industries/${industry.slug}`}
              className="group grid gap-3 border-t border-(--color-line) py-10 transition-colors hover:bg-(--color-paper-raised) sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8 sm:py-12"
            >
              <div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[0.98] group-hover:text-(--color-signal) transition-colors text-balance">
                  {industry.name}
                </h2>
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-(--color-steel) leading-relaxed">
                  {industry.overview}
                </p>
                {industry.operationalChallenges.length > 0 && (
                  <p className="mt-4 font-mono text-[11px] tracking-[0.06em] uppercase text-(--color-steel-soft)">
                    {industry.operationalChallenges[0]}
                  </p>
                )}
              </div>
              <span
                aria-hidden="true"
                className="hidden shrink-0 self-center text-2xl text-(--color-signal) transition-transform group-hover:translate-x-1.5 sm:block"
              >
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="lg:hidden h-[68px]" aria-hidden="true" />
      <StickyEnquiryBar />
    </>
  );
}
