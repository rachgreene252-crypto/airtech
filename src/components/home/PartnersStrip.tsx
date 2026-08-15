import { Section } from "@/components/ui/Section";
import { getPartners } from "@/content/certifications";

export function PartnersStrip() {
  const partners = getPartners();
  if (partners.length === 0) return null;

  return (
    <Section className="py-14 sm:py-16">
      <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-(--color-steel)">
        Equipment partners
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-4">
        {partners.map((partner) => (
          <span key={partner.id} className="font-display text-2xl font-semibold text-(--color-ink-soft)">
            {partner.name}
          </span>
        ))}
      </div>
    </Section>
  );
}
