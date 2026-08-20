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
      <div className="mt-8 flex flex-wrap gap-x-16 gap-y-8">
        {partners.map((partner) => (
          <div key={partner.id}>
            <p className="font-display text-2xl font-semibold text-(--color-ink)">{partner.name}</p>
            <p className="mt-1 text-sm text-(--color-steel)">{partner.relationshipNote}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
