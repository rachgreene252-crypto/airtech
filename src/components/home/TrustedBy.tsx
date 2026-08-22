import { Container } from "@/components/ui/Container";

/**
 * Section 09 — Trusted By. Real client marks from the supplied
 * ASSETS/AIRTECH_client_logos_web_quality and ASSETS/company logos folders
 * (the questionnaire's confirmed "generally fine to display" set —
 * docs/AIRTECH_OPEN_DECISIONS.md B5). Huawei is deliberately excluded — the
 * same flagged-client exclusion already applied in src/content/projects.ts.
 * No count claim ("300+ companies") is made; the heading states
 * organisations/geography only. Per the 2026-08-22 visual-correction brief
 * this is a high-visibility credibility section — larger logos, a bolder
 * heading, `<img>` (not next/image) so each mark keeps its natural aspect
 * ratio at a normalized height rather than being forced into a uniform box.
 * A dedicated /assets/trusted logos/ folder wasn't supplied yet — this list
 * is a plain array specifically so dropping new files in later is a
 * one-line addition per logo, per the brief's own suggested structure.
 */
const trustedLogos = [
  { file: "ncell.png", name: "Ncell" },
  { file: "nepal-telecom.png", name: "Nepal Telecom" },
  { file: "united-telecom-utl.png", name: "United Telecom" },
  { file: "standard-chartered.webp", name: "Standard Chartered Bank" },
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
  { file: "prime-commercial-bank.webp", name: "Prime Commercial Bank" },
  { file: "century-bank.webp", name: "Century Bank" },
  { file: "civil-bank.webp", name: "Civil Bank" },
  { file: "bank-of-kathmandu.webp", name: "Bank of Kathmandu" },
  { file: "laxmi-sunrise-bank.webp", name: "Laxmi Sunrise Bank" },
  { file: "agricultural-development-bank.webp", name: "Agricultural Development Bank" },
  { file: "us-embassy-nepal.png", name: "U.S. Embassy Nepal" },
  { file: "british-embassy-kathmandu.png", name: "British Embassy Kathmandu" },
  { file: "embassy-of-switzerland.png", name: "Embassy of Switzerland" },
  { file: "russian-embassy.png", name: "Russian Embassy" },
  { file: "saudi-arabia-embassy.png", name: "Embassy of Saudi Arabia" },
  { file: "jica.png", name: "JICA" },
  { file: "giz.png", name: "GIZ" },
  { file: "plan-international.png", name: "Plan International" },
  { file: "nepal-electricity-authority.png", name: "Nepal Electricity Authority" },
  { file: "data-hub.png", name: "Data Hub" },
  { file: "ohm-data-center.png", name: "Ohm Data Center" },
  { file: "cloud-himalaya.png", name: "Cloud Himalaya" },
  { file: "quest-pharmaceuticals.webp", name: "Quest Pharmaceuticals" },
  { file: "ohm-pharma.webp", name: "Ohm Pharma" },
  { file: "alive-pharmaceutical.webp", name: "Alive Pharmaceutical" },
  { file: "time-pharmaceuticals.webp", name: "Time Pharmaceuticals" },
  { file: "vijayadeep-laboratories.webp", name: "Vijayadeep Laboratories" },
  { file: "arya-pharmalab.webp", name: "Arya Pharmalab" },
  { file: "magnus.webp", name: "Magnus" },
  { file: "npl.webp", name: "NPL" },
  { file: "k-lab.webp", name: "K Lab" },
  { file: "panas.webp", name: "Panas" },
  { file: "simca.webp", name: "Simca" },
  { file: "florid.webp", name: "Florid" },
  { file: "djpl.webp", name: "DJPL" },
  { file: "big-cinemas.png", name: "BIG Cinemas" },
  { file: "f-cube-cinemas.png", name: "F-Cube Cinemas" },
  { file: "jai-nepal-qfx.png", name: "Jai Nepal QFX" },
  { file: "kantipur.png", name: "Kantipur" },
  { file: "lincoln-school.png", name: "Lincoln School" },
  { file: "dav-school.png", name: "DAV School" },
  { file: "rato-bangala-school.png", name: "Rato Bangala School" },
  { file: "st-marys-school.png", name: "St. Mary's School" },
] as const;

export function TrustedBy() {
  const track = [...trustedLogos, ...trustedLogos];

  return (
    <section className="border-t border-(--color-line) bg-(--color-paper-raised) py-20 sm:py-24">
      <Container>
        <div className="flex items-center justify-center gap-4">
          <span aria-hidden="true" className="hidden h-px w-16 bg-(--color-line-strong) sm:block" />
          <p className="text-center font-mono text-sm sm:text-base tracking-[0.18em] uppercase text-(--color-ink)">
            Trusted by organisations across Nepal
          </p>
          <span aria-hidden="true" className="hidden h-px w-16 bg-(--color-line-strong) sm:block" />
        </div>
      </Container>

      <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-16 sm:gap-24">
          {track.map((logo, i) => (
            // Normalized-height, natural-aspect-ratio logo marks — see file header for
            // why next/image's fixed width+height box isn't used here.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${logo.file}-${i}`}
              src={`/images/clients/${logo.file}`}
              alt={logo.name}
              decoding="async"
              className="h-12 w-auto shrink-0 sm:h-16 grayscale opacity-75 transition-opacity hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
