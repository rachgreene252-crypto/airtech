import Image from "next/image";
import { Container } from "@/components/ui/Container";

/**
 * Section 09 — Trusted By. Real client marks from
 * ASSETS/AIRTECH_client_logos_web_quality (the questionnaire's confirmed
 * "generally fine to display" set — docs/AIRTECH_OPEN_DECISIONS.md B5).
 * Huawei is deliberately excluded — the same flagged-client exclusion
 * already applied in src/content/projects.ts. No count claim ("300+
 * companies") is made; the heading states organisations/geography only,
 * per the brief's own instruction.
 */
const LOGOS = [
  { file: "ncell.png", name: "Ncell" },
  { file: "nepal-telecom.png", name: "Nepal Telecom" },
  { file: "united-telecom-utl.png", name: "United Telecom" },
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
  const track = [...LOGOS, ...LOGOS];

  return (
    <section className="border-t border-(--color-line) bg-(--color-paper-raised) py-16 sm:py-20">
      <Container>
        <p className="text-center font-mono text-xs tracking-[0.18em] uppercase text-(--color-steel)">
          Trusted by organisations across Nepal
        </p>
      </Container>

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-14 sm:gap-20">
          {track.map((logo, i) => (
            <div
              key={`${logo.file}-${i}`}
              className="relative h-9 w-28 shrink-0 sm:h-10 sm:w-32 grayscale opacity-70 transition-opacity hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={`/images/clients/${logo.file}`}
                alt={logo.name}
                fill
                sizes="128px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
