import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { getCertifications, getPartners } from "@/content/certifications";

export const metadata: Metadata = { title: "Quality & Certifications" };

export default function QualityCertificationsPage() {
  const certifications = getCertifications();
  const partners = getPartners();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Quality & Certifications" },
        ]}
        eyebrow="Quality"
        heading="Quality management and equipment partners."
      />

      <Section>
        <SectionHeader eyebrow="Certifications" heading="Management system certification." />
        <div className="mt-10">
          {certifications.length > 0 ? (
            <ul className="flex flex-wrap justify-center gap-4">
              {certifications.map((c) => (
                <li key={c.id} className="border border-(--color-line-strong) px-5 py-3 text-center">
                  <p className="font-display text-body-l font-normal">{c.name}</p>
                  <p className="text-xs text-(--color-steel)">{c.issuingBody}</p>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Certificate documentation pending"
              description="Current ISO certification copies are being confirmed with management before publication."
            />
          )}
        </div>
      </Section>

      <Section tone="raised">
        <SectionHeader eyebrow="Equipment partners" heading="Manufacturer relationships." />
        <p className="mx-auto mt-6 max-w-2xl text-center text-body-l leading-relaxed text-(--color-steel)">
          Airtech works with established equipment manufacturers. These relationships support Airtech&apos;s
          engineering, not the other way around.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-x-12 gap-y-4">
          {partners.map((p) => (
            <span key={p.id} className="font-display text-display-m font-normal text-(--color-ink-soft)">
              {p.name}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
