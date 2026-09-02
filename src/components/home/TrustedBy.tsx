import { Container } from "@/components/ui/Container";

/**
 * Section 07 — Trusted By. A continuous logo marquee. The supplied marks are
 * a mix of transparent logos and full-colour brand tiles, so every one is
 * dropped into an identical white chip — the wall reads as one system rather
 * than a row of mismatched cut-outs. Two tracks scroll in opposite
 * directions; both pause on hover so a visitor can read a mark; the global
 * prefers-reduced-motion rule stops them entirely.
 *
 * Huawei is deliberately excluded (as in src/content/projects.ts). No count
 * claim is made. Per-logo publication permission is still an open item
 * (docs/AIRTECH_OPEN_DECISIONS.md B5).
 */
const ROW_A = [
  { file: "standard-chartered.webp", name: "Standard Chartered" },
  { file: "nabil-bank.webp", name: "Nabil Bank" },
  { file: "himalayan-bank.webp", name: "Himalayan Bank" },
  { file: "nic-asia.webp", name: "NIC Asia Bank" },
  { file: "everest-bank.webp", name: "Everest Bank" },
  { file: "nepal-investment-bank.webp", name: "Nepal Investment Bank" },
  { file: "nmb-bank.webp", name: "NMB Bank" },
  { file: "prabhu-bank.webp", name: "Prabhu Bank" },
  { file: "siddhartha-bank.webp", name: "Siddhartha Bank" },
  { file: "sanima-bank.webp", name: "Sanima Bank" },
  { file: "citizens-bank.webp", name: "Citizens Bank" },
  { file: "bank-of-kathmandu.webp", name: "Bank of Kathmandu" },
  { file: "prime-commercial-bank.webp", name: "Prime Commercial Bank" },
  { file: "agricultural-development-bank.webp", name: "Agricultural Development Bank" },
];

const ROW_B = [
  { file: "ncell.png", name: "Ncell" },
  { file: "nepal-telecom.png", name: "Nepal Telecom" },
  { file: "quest-pharmaceuticals.webp", name: "Quest Pharmaceuticals" },
  { file: "ohm-pharma.webp", name: "Ohm Pharma" },
  { file: "alive-pharmaceutical.webp", name: "Alive Pharmaceutical" },
  { file: "time-pharmaceuticals.webp", name: "Time Pharmaceuticals" },
  { file: "vijayadeep-laboratories.webp", name: "Vijayadeep Laboratories" },
  { file: "us-embassy-nepal.png", name: "US Embassy, Nepal" },
  { file: "british-embassy-kathmandu.png", name: "British Embassy, Kathmandu" },
  { file: "embassy-of-switzerland.png", name: "Embassy of Switzerland" },
  { file: "jica.png", name: "JICA" },
  { file: "giz.png", name: "GIZ" },
  { file: "rato-bangala-school.png", name: "Rato Bangala School" },
  { file: "lincoln-school.png", name: "Lincoln School" },
];

function Marquee({
  items,
  reverse = false,
}: {
  items: { file: string; name: string }[];
  reverse?: boolean;
}) {
  const track = [...items, ...items];
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <ul
        className={`flex w-max items-stretch gap-4 animate-marquee ${
          reverse ? "[animation-direction:reverse]" : ""
        } group-hover:[animation-play-state:paused]`}
      >
        {track.map((logo, i) => (
          <li
            key={`${logo.file}-${i}`}
            className="flex h-24 w-44 shrink-0 items-center justify-center border border-(--color-line) bg-white p-5"
          >
            {/* Mixed asset set (transparent logos + colour tiles), so a plain
                contained <img> in a uniform chip — see file note. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/clients/${logo.file}`}
              alt={logo.name}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

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
          <p className="mx-auto mt-5 max-w-lg text-body-l leading-relaxed text-(--color-steel)">
            Banks, hospitals, hospitality groups, telecoms, pharmaceutical
            plants, embassies and institutions.
          </p>
        </div>
      </Container>

      <div className="mt-12 flex flex-col gap-4 sm:mt-14">
        <Marquee items={ROW_A} />
        <Marquee items={ROW_B} reverse />
      </div>
    </section>
  );
}
