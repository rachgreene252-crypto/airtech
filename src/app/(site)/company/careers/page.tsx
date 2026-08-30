import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BluePlaceholder } from "@/components/ui/BluePlaceholder";
import { siteSettings } from "@/content/site-settings";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Careers at Airtech Industries: engineers and technicians working on hospitals, pharmaceutical facilities, hotels, telecom infrastructure and industrial sites across Nepal.",
};

// Architecturally separate from the engineering story (spec §10) — no
// lifecycle/expertise/projects narrative here — but visually inside the
// same design system: same PageHero, SectionHeader, BluePlaceholder. No
// stock "join our team" hero photo, no perks grid, no fabricated listings.
const WHY_AIRTECH = [
  {
    title: "Work that's visible",
    body: "Hospitals, pharmaceutical facilities, hotels, telecom infrastructure and industrial sites — engineering quality is directly visible in the result.",
  },
  {
    title: "Integrated scope",
    body: "Engineering, procurement, execution, testing, commissioning and after-sales support under one roof, not a single narrow trade.",
  },
  {
    title: "Team work",
    body: "Open exchange of information and resources across disciplines and with clients.",
  },
] as const;

export default function CareersPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Careers" },
        ]}
        eyebrow="Careers"
        heading="Engineers who want to work on projects that matter."
        description="Airtech's work spans hospitals, pharmaceutical facilities, hotels, telecom infrastructure and industrial sites: technically demanding environments where engineering quality is directly visible in the result."
      />

      <Section>
        <SectionHeader eyebrow="Why Airtech" heading="What working here is like." />
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
          {WHY_AIRTECH.map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-xl font-semibold text-(--color-ink)">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-steel)">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="raised">
        <SectionHeader eyebrow="Open positions" heading="Current openings." />
        <div className="relative mt-10 aspect-[21/9] w-full overflow-hidden">
          <BluePlaceholder label="No open positions listed right now" />
        </div>
        <p className="mt-6 max-w-xl text-(--color-steel) leading-relaxed">
          No open positions are listed here right now. If you&apos;re an engineer or technician
          interested in Airtech&apos;s work, send your CV and area of interest — we keep it on file
          for the next relevant opening.
        </p>
      </Section>

      <Section>
        <SectionHeader eyebrow="How to apply" heading="Send us your CV." />
        <p className="mt-6 max-w-xl text-(--color-steel) leading-relaxed">
          Email your CV and area of interest to{" "}
          <a href={`mailto:${siteSettings.primaryEmail}`} className="text-(--color-brand-blue) hover:underline">
            {siteSettings.primaryEmail}
          </a>
          .
        </p>
      </Section>
    </>
  );
}
