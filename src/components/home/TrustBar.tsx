import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A client constellation, not a flat name-wrap: real Airtech clients from
 * the brochure's "valued customers" pages and Master Source of Truth §8,
 * grouped by the sector they're actually in (true, sourced structure) rather
 * than an arbitrary size hierarchy. Text-set rather than fabricated logo
 * graphics — no logo image assets were supplied (docs/IMPLEMENTATION_AUDIT.md
 * §8); questionnaire §8.2 confirms logos are generally clear to display, so
 * text names carry the same status pending final logo asset collection.
 */
const clientSectors = [
  { sector: "Telecom", clients: ["Ncell", "Nepal Telecom", "United Telecom"] },
  { sector: "Banking & Financial", clients: ["Standard Chartered Bank", "Siddhartha Bank"] },
  { sector: "Hospitality", clients: ["Soaltee", "The Dwarika's Hotel", "Hotel Shangri-La"] },
  { sector: "Healthcare", clients: ["Norvic International Hospital", "Nepal Mediciti"] },
  { sector: "Consumer & Industrial", clients: ["Dabur Nepal", "Bottlers Nepal", "Gorkha Brewery", "Surya Nepal"] },
];

export function TrustBar() {
  return (
    <section className="border-b border-(--color-line) bg-(--color-paper-raised) py-16 sm:py-20">
      <Container>
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)">
          25+ years — trusted across sectors
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {clientSectors.map((group, i) => (
            <Reveal key={group.sector} delay={i * 0.05} className="border-t border-(--color-line) pt-5">
              <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-(--color-steel-soft)">
                {group.sector}
              </p>
              <ul className="mt-3 space-y-1.5">
                {group.clients.map((name) => (
                  <li key={name} className="font-display text-lg leading-tight text-(--color-ink-soft)">
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
