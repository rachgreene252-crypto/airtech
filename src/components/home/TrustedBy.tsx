import { Container } from "@/components/ui/Container";

/**
 * Section 09 — Trusted By. Real client marks, sourced exclusively from
 * the supplied ASSETS/company logos folder — clean, original brand assets
 * (the questionnaire's confirmed "generally fine to display" set —
 * docs/AIRTECH_OPEN_DECISIONS.md B5). Huawei is deliberately excluded — the
 * same flagged-client exclusion already applied in src/content/projects.ts.
 *
 * The wider ASSETS/AIRTECH_client_logos_web_quality set (embassies, telecom,
 * JICA/GIZ/Plan International, data centres, cinemas, most schools) is not
 * used here: per that folder's own README, those marks were upscaled/cropped
 * from reference screenshots rather than sourced as real assets, and render
 * with visible dithering/halo artefacts around every mark — reading as a
 * hard box/border around the logo. They should only return once Airtech or
 * the respective organisation supplies an official SVG/transparent asset.
 *
 * No count claim ("300+ companies") is made; the heading states
 * organisations/geography only. This is a high-visibility credibility
 * section — large logos, a bolder centered heading, `<img>` (not
 * next/image) so each mark keeps its natural aspect ratio at a normalized
 * height rather than being forced into a uniform box.
 * A dedicated /assets/trusted logos/ folder wasn't supplied yet — this list
 * is a plain array specifically so dropping new files in later is a
 * one-line addition per logo, per the brief's own suggested structure.
 * Per the premium-reconception brief's strict requirements for this
 * section: the background is pure white (not the site's warm-ivory paper
 * tone used elsewhere), and logos stay full colour at all times — no
 * grayscale/opacity-gated "colour on hover" treatment, which the brief
 * explicitly forbids.
 */
const trustedLogos = [
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
  { file: "rato-bangala-school.png", name: "Rato Bangala School" },
] as const;

export function TrustedBy() {
  const track = [...trustedLogos, ...trustedLogos];

  return (
    <section className="border-t border-(--color-line) bg-(--color-white) py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-label font-medium text-(--color-brand-blue)">
            Trusted by
          </p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] text-(--color-ink) text-balance">
            Trusted by organisations across Nepal.
          </h2>
        </div>
      </Container>

      <div className="relative mt-16 overflow-hidden sm:mt-20 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-20 sm:gap-32">
          {track.map((logo, i) => (
            // Normalized-height, natural-aspect-ratio logo marks, always full
            // colour per the brief — see file header for why next/image's
            // fixed width+height box isn't used here.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${logo.file}-${i}`}
              src={`/images/clients/${logo.file}`}
              alt={logo.name}
              decoding="async"
              className="h-20 w-auto shrink-0 transition-transform duration-200 hover:scale-105 sm:h-28"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
