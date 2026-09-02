import { Container } from "@/components/ui/Container";

/**
 * Section 07 — Trusted By. A typographic client index rather than a logo
 * marquee: the supplied logo assets are upscaled/cropped screenshots that
 * render with hard boxes and halo artefacts (see the previous version's file
 * note), per-logo publication permission is still an open item
 * (docs/AIRTECH_OPEN_DECISIONS.md B5), and a clean set-in-Fraunces list
 * reads as more considered than a strip of mismatched marks. Grouped by
 * sector so the breadth is legible. Huawei is deliberately excluded, as in
 * src/content/projects.ts. No count claim is made.
 *
 * When Airtech supplies official vector/transparent logo assets, this can
 * return to a mark-based treatment.
 */
const CLIENT_GROUPS = [
  {
    sector: "Banking & finance",
    clients: [
      "Standard Chartered",
      "Nabil Bank",
      "Himalayan Bank",
      "NIC Asia",
      "Everest Bank",
      "Nepal Investment Bank",
      "NMB Bank",
      "Prabhu Bank",
      "Siddhartha Bank",
      "Sanima Bank",
      "Citizens Bank",
      "Bank of Kathmandu",
    ],
  },
  {
    sector: "Pharmaceuticals & laboratories",
    clients: [
      "Quest Pharmaceuticals",
      "Ohm Pharma",
      "Alive Pharmaceutical",
      "Time Pharmaceuticals",
      "Vijayadeep Laboratories",
      "Arya Pharmalab",
    ],
  },
  {
    sector: "Institutional & other",
    clients: ["Rato Bangala School", "Magnus", "Panas", "Simca"],
  },
];

export function TrustedBy() {
  return (
    <section className="border-t border-(--color-line) py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
            Trusted by
          </p>
          <h2 className="mt-5 font-display text-display-l font-normal leading-[1.08] tracking-[-0.012em] text-(--color-ink) text-balance">
            Organisations across Nepal rely on Airtech.
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-x-12 gap-y-12 sm:grid-cols-3">
          {CLIENT_GROUPS.map((group) => (
            <div key={group.sector}>
              <h3 className="border-b border-(--color-line) pb-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-steel-soft)">
                {group.sector}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.clients.map((client) => (
                  <li
                    key={client}
                    className="font-display text-body font-normal leading-snug text-(--color-ink-soft)"
                  >
                    {client}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
