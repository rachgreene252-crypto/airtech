import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { step: "01", title: "Engineering", description: "System design and equipment selection against the project's technical requirement." },
  { step: "02", title: "Procurement", description: "Supply of equipment and materials from established manufacturer relationships." },
  { step: "03", title: "Installation", description: "Coordinated installation across HVAC, electrical, plumbing, fire protection and ELV." },
  { step: "04", title: "Testing", description: "System-level testing against design specification before handover." },
  { step: "05", title: "Commissioning", description: "Commissioning of installed systems for live operation." },
  { step: "06", title: "Support / AMC", description: "Ongoing technical support and Annual Maintenance Contracts after handover." },
];

export function DeliveryApproach() {
  return (
    <Section tone="ink">
      <SectionHeader
        eyebrow="Delivery — 04"
        heading="One team, start to finish."
        description="A single Airtech team carries the project from design through to long-term support — not a handoff between separate contractors at every stage."
        tone="paper"
      />
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-12">
        {steps.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.05}>
            <div className="border-t border-(--color-steel) pt-4">
              <span className="font-mono text-sm text-(--color-signal-soft)">{s.step}</span>
              <h3 className="mt-2 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-(--color-steel-soft) leading-relaxed">{s.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
