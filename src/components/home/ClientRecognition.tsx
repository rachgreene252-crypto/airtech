import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Closing credibility strip — signed client reference letters on file for
 * Oriental Hotels (Radisson), Grande International Hospital, Ashwins
 * Medical College, Nepal Cancer Hospital, Tiger One (Tiger Palace), Nepal
 * Hospitality & Hotel (Marriott/Fairfield), British Embassy Kathmandu,
 * JICA and Soaltee Hotel — source: ASSETS/certificates.
 *
 * IMPORTANT — deliberately restrained treatment: these letters carry exact
 * NPR contract values, and docs/AIRTECH_OPEN_DECISIONS.md #11 gates
 * publishing them as case-study evidence pending a client-by-client
 * publish/redact/hold decision. This strip shows only small thumbnails
 * (illegible as body text at this size, by design — no letter content is
 * transcribed) captioned with the client name alone, and every name here
 * is already public elsewhere on the site (TrustBar/projects.ts). It is
 * intentionally not a full document viewer. Do not add zoom/lightbox or
 * transcribe letter text without resolving that gate first.
 */
const RECOGNITIONS = [
  { file: "oriental-hotels-radisson.jpg", client: "Oriental Hotels / Radisson" },
  { file: "grande-international-hospital.jpg", client: "Grande International Hospital" },
  { file: "soaltee-hotel.jpg", client: "Soaltee Hotel" },
  { file: "tiger-palace-resort.jpg", client: "Tiger Palace Resort" },
  { file: "nepal-hospitality-marriott.jpg", client: "Nepal Hospitality & Hotel" },
  { file: "ashwins-medical-college.jpg", client: "Ashwins Medical College" },
  { file: "nepal-cancer-hospital.jpg", client: "Nepal Cancer Hospital" },
  { file: "british-embassy-kathmandu.jpg", client: "British Embassy Kathmandu" },
  { file: "jica.jpg", client: "JICA" },
] as const;

export function ClientRecognition() {
  return (
    <section className="border-t border-(--color-line) bg-site-texture py-14 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-[0.16em] uppercase text-(--color-brand-blue)">
            Recognised by our clients
          </p>
          <Link
            href="/company/quality-certifications"
            className="text-sm font-medium text-(--color-brand-blue) hover:text-(--color-ink) transition-colors"
          >
            View Our Credentials →
          </Link>
        </div>

        <Reveal className="mt-7">
          <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {RECOGNITIONS.map((item) => (
              <div key={item.file} className="shrink-0 w-[92px] sm:w-[104px]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-(--color-line-strong) bg-white shadow-[0_1px_2px_rgba(37,38,41,0.06)]">
                  <Image
                    src={`/images/recognition/${item.file}`}
                    alt={`Signed reference letter, ${item.client}`}
                    fill
                    sizes="104px"
                    className="object-cover object-top"
                  />
                </div>
                <p className="mt-2 text-[11px] leading-tight text-(--color-steel)">{item.client}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
