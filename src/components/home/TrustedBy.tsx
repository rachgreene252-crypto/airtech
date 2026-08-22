import Image from "next/image";
import { Container } from "@/components/ui/Container";

/**
 * Real client logos (public/assets/company-logos/), sourced from the
 * AIRTECH_client_logos_web_quality set plus a handful of clearly-named bank
 * logos from company logos/ — Huawei and every unlabelled/unidentifiable
 * numbered logo file were excluded (see docs/AIRTECH_OPEN_DECISIONS.md — the
 * client questionnaire says Huawei must not be publicised; unlabelled files
 * can't be attributed to a real client without guessing). "300+ companies"
 * is not claimed anywhere here — heading matches the brief's verified
 * framing instead of a company-count claim.
 */
const LOGOS = [
  { file: "Ncell.png", name: "Ncell" },
  { file: "Nepal_Telecom.png", name: "Nepal Telecom" },
  { file: "United_Telecom_UTL.png", name: "United Telecom" },
  { file: "Standard_Chartered.svg", name: "Standard Chartered Bank" },
  { file: "Nabil_Bank.png", name: "Nabil Bank" },
  { file: "Himalayan_Bank.png", name: "Himalayan Bank" },
  { file: "NIC_Asia.png", name: "NIC Asia Bank" },
  { file: "Sanima_Bank.png", name: "Sanima Bank" },
  { file: "Citizens_Bank.png", name: "Citizens Bank" },
  { file: "Machhapuchchhre_Bank.png", name: "Machhapuchchhre Bank" },
  { file: "Siddhartha_Bank.png", name: "Siddhartha Bank" },
  { file: "British_Embassy_Kathmandu.png", name: "British Embassy, Kathmandu" },
  { file: "US_Embassy_Nepal.png", name: "US Embassy, Nepal" },
  { file: "Russian_Embassy.png", name: "Russian Embassy" },
  { file: "Saudi_Arabia_Embassy.png", name: "Embassy of Saudi Arabia" },
  { file: "Embassy_of_Switzerland.png", name: "Embassy of Switzerland" },
  { file: "JICA.png", name: "JICA" },
  { file: "GIZ.png", name: "GIZ" },
  { file: "Plan_International.png", name: "Plan International" },
  { file: "Nepal_Electricity_Authority.png", name: "Nepal Electricity Authority" },
  { file: "Data_Hub.png", name: "Data Hub" },
  { file: "Ohm_Data_Center.png", name: "Ohm Data Center" },
  { file: "Cloud_Himalaya.png", name: "Cloud Himalaya" },
  { file: "Kantipur.png", name: "Kantipur" },
  { file: "BIG_Cinemas.png", name: "BIG Cinemas" },
  { file: "F-Cube_Cinemas.png", name: "F-Cube Cinemas" },
  { file: "Jai_Nepal_QFX.png", name: "Jai Nepal QFX" },
  { file: "Lincoln_School.png", name: "Lincoln School" },
  { file: "DAV_School.png", name: "DAV School" },
  { file: "St_Marys_School.png", name: "St. Mary's School" },
  { file: "Rato_Bangala_School.png", name: "Rato Bangala School" },
];

export function TrustedBy() {
  return (
    <section className="border-t border-(--color-line) bg-(--color-paper) py-16 sm:py-20">
      <Container>
        <p className="text-center font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal-soft)">
          Trusted By — 09
        </p>
        <h2 className="mt-4 text-center font-display text-3xl sm:text-4xl font-normal text-(--color-ink) text-balance">
          Trusted by organisations across Nepal.
        </h2>
      </Container>

      <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
          <LogoTrack />
          <LogoTrack aria-hidden />
        </div>
      </div>
    </section>
  );
}

function LogoTrack({ ["aria-hidden"]: ariaHidden }: { ["aria-hidden"]?: boolean }) {
  return (
    <div className="flex items-center" aria-hidden={ariaHidden || undefined}>
      {LOGOS.map((logo, i) => (
        <div
          key={`${logo.file}-${i}`}
          className="flex h-16 w-[150px] shrink-0 items-center justify-center px-6 grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
        >
          <Image
            src={`/assets/company-logos/${logo.file}`}
            alt={logo.name}
            width={120}
            height={48}
            className="h-auto max-h-10 w-auto max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
