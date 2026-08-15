import { Container } from "@/components/ui/Container";

/**
 * Text-set client roster rather than fabricated logo graphics (no logo image
 * assets were supplied — see docs/IMPLEMENTATION_AUDIT.md §8). Names drawn
 * from the brochure's "valued customers" pages and Master Source of Truth §8;
 * questionnaire §8.2 confirms logos are generally clear to display, so
 * text names here carry the same status pending final logo asset collection.
 */
const clients = [
  "Ncell",
  "Nepal Telecom",
  "United Telecom",
  "Standard Chartered Bank",
  "Siddhartha Bank",
  "Soaltee",
  "The Dwarika's Hotel",
  "Hotel Shangri-La",
  "Norvic International Hospital",
  "Nepal Mediciti",
  "Dabur Nepal",
  "Bottlers Nepal",
  "Gorkha Brewery",
  "Surya Nepal",
];

export function TrustBar() {
  return (
    <section className="border-b border-(--color-line) bg-(--color-paper-raised) py-10">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
          <p className="shrink-0 font-mono text-[11px] tracking-[0.14em] uppercase text-(--color-steel)">
            25+ years · trusted across sectors
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            {clients.map((name) => (
              <span key={name} className="text-sm text-(--color-ink-soft) whitespace-nowrap">
                {name}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
