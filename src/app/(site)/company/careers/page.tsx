import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { siteSettings } from "@/content/site-settings";

export const metadata: Metadata = { title: "Careers" };

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
        <p className="max-w-xl text-(--color-steel) leading-relaxed">
          Current openings are not listed here yet. If you&apos;re an engineer or technician interested in
          Airtech&apos;s work, send your CV and area of interest to{" "}
          <a href={`mailto:${siteSettings.primaryEmail}`} className="text-(--color-signal) hover:underline">
            {siteSettings.primaryEmail}
          </a>
          .
        </p>
      </Section>
    </>
  );
}
