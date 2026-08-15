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
            <ul className="flex flex-wrap gap-4">
              {certifications.map((c) => (
                <li key={c.id} className="border border-(--color-line-strong) px-5 py-3">
                  <p className="font-display text-lg font-semibold">{c.name}</p>
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
        <p className="mt-6 max-w-2xl text-(--color-steel)">
          Airtech works with established equipment manufacturers — these relationships support Airtech&apos;s
          engineering, not the other way around.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
          {partners.map((p) => (
            <span key={p.id} className="font-display text-2xl font-semibold text-(--color-ink-soft)">
              {p.name}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
