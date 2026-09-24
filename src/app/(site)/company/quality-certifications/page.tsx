import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCertificationStandards } from "@/content/certifications";

export const metadata: Metadata = { title: "Quality & Certifications" };

export default function QualityCertificationsPage() {
  const standards = getCertificationStandards();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Quality & Certifications" },
        ]}
        eyebrow="Quality"
        heading="Quality management and certification."
        description="Airtech works to documented quality, environmental and occupational health and safety management systems. Certificate letters are published here once confirmed with management."
      />

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="crop-frame relative aspect-[4/3] w-full overflow-hidden border border-(--color-line-strong) text-(--color-brand-blue) lg:sticky lg:top-28">
            <span className="crop-tick-tl" />
            <span className="crop-tick-br" />
            <Image
              src="/images/team/founder-at-work.jpg"
              alt="Airtech's Managing Director reviewing project documentation"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeader
              eyebrow="Certifications"
              heading="ISO management-system certification."
            />
            <div className="mt-10">
              <ul className="border-t border-(--color-line)">
                {standards.map((c) => (
                  <li
                    key={c.id}
                    className="flex flex-col gap-2 border-b border-(--color-line) py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <div>
                      <p className="font-display text-title font-normal text-(--color-ink)">{c.name}</p>
                      <p className="mt-1 text-small text-(--color-steel)">
                        {c.issuingBody}
                        {c.validUntil ? ` · Valid until ${c.validUntil}` : ""}
                      </p>
                    </div>
                    {c.documentUrl ? (
                      <a
                        href={c.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue) hover:underline"
                      >
                        View certificate letter →
                      </a>
                    ) : (
                      <span className="shrink-0 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-steel-soft)">
                        Letter available on request
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-small leading-relaxed text-(--color-steel)">
                Signed certificate letters are issued to clients and consultants on request, and will be
                linked here directly once cleared for publication.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
