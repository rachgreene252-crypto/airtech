import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { siteSettings } from "@/content/site-settings";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Careers at Airtech Industries: engineers and technicians working on hospitals, pharmaceutical facilities, hotels, telecom infrastructure and industrial sites across Nepal.",
};

// Architecturally separate from the engineering story (spec §10), no
// lifecycle/expertise/projects narrative here, but visually inside the
// same design system: same PageHero, SectionHeader, BluePlaceholder. No
// stock "join our team" hero photo, no perks grid, no fabricated listings.
// 2026-09-16: two real internal photos supplied directly (a product/technical
// review meeting, a strategy session) replace the previous text-only
// treatment for this section, per direct request to use them.
const TEAM_PHOTOS = [
  { src: "/images/team/team-showroom-meeting.jpg", alt: "Airtech's technical team reviewing product specifications" },
  { src: "/images/team/team-strategy-meeting.jpg", alt: "Airtech's team in a strategy and coordination meeting" },
] as const;
const WHY_AIRTECH = [
  {
    title: "Work that's visible",
    body: "Hospitals, pharmaceutical facilities, hotels, telecom infrastructure and industrial sites: engineering quality is directly visible in the result.",
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
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-8 text-center sm:grid-cols-3">
          {WHY_AIRTECH.map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-title font-normal text-(--color-ink)">{item.title}</h3>
              <p className="mt-2 text-small leading-relaxed text-(--color-steel)">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {TEAM_PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="crop-frame relative aspect-[4/3] overflow-hidden border border-(--color-line-strong) text-(--color-brand-blue)"
            >
              <span className="crop-tick-tl" />
              <span className="crop-tick-br" />
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </Section>

      <Section tone="raised">
        <SectionHeader eyebrow="Open positions" heading="Current openings." />
        <div className="mt-10">
          <EmptyState
            title="No open positions listed right now"
            description="If you're an engineer or technician interested in Airtech's work, send your CV and area of interest. We keep it on file for the next relevant opening."
          />
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="How to apply" heading="Send us your CV." />
        <p className="mx-auto mt-6 max-w-xl text-center text-body-l leading-relaxed text-(--color-steel)">
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
