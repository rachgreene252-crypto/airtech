import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "History",
  description: "How Airtech grew from an HVAC specialist in 2000 into an integrated MEP engineering contractor.",
};

const milestones = [
  {
    year: "2000",
    title: "Established",
    body: "Airtech was established with a focus on Heating, Ventilation and Air Conditioning (HVAC) engineering solutions in Nepal.",
  },
  {
    year: "2013",
    title: "MEP division launched",
    body: "Airtech expanded beyond HVAC, launching its MEP division to provide integrated mechanical, electrical, PHE and ELV solutions.",
  },
  {
    year: "2025",
    title: "25 years: Reliability Matters",
    body: "Airtech marked 25 years in business with a company-wide anniversary celebration, reaffirming the reliability the brand was built on.",
  },
  {
    year: "Today",
    title: "Integrated engineering contractor",
    body: "Airtech operates as a comprehensive engineering and MEP contractor, with capabilities spanning HVAC, electrical, PHE, fire protection, ELV, ventilation and water systems.",
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "History" },
        ]}
        eyebrow="Since 2000"
        heading="From HVAC specialist to integrated engineering partner."
      />
      <Section>
        <ol className="mx-auto max-w-xl space-y-11 border-l border-(--color-line-strong) pl-8">
          {milestones.map((m) => (
            <li key={m.year} className="relative">
              <span className="absolute -left-[2.55rem] top-1.5 h-2 w-2 rounded-full bg-(--color-brand-blue)" />
              <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
                {m.year}
              </p>
              <h2 className="mt-2 font-display text-title font-normal text-(--color-ink)">{m.title}</h2>
              <p className="mt-2.5 text-body leading-relaxed text-(--color-steel)">{m.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 25th-anniversary team photograph — real photography from the
          "AIRTECH RELIABILITY MATTERS" event, supplied directly for
          publication (2026-09-09). The source file is only 455x303 — capped
          at max-w-lg rather than the section's usual max-w-4xl so it renders
          near its native resolution instead of visibly upscaled, per "all
          high quality images only." */}
      <Section tone="raised">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
            25 years
          </p>
          <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.08] tracking-[-0.016em] text-(--color-ink) text-balance">
            One team, a quarter century of reliability.
          </h2>
        </div>
        <div className="crop-frame relative mx-auto mt-10 aspect-[3/2] w-full max-w-lg overflow-hidden border border-(--color-line-strong) text-(--color-brand-blue)">
          <span className="crop-tick-tl" />
          <span className="crop-tick-br" />
          <Image
            src="/images/team/team-25th-anniversary.jpg"
            alt="The Airtech Industries team gathered for the company's 25th-anniversary, Reliability Matters, celebration"
            fill
            sizes="(min-width: 1024px) 512px, 100vw"
            className="object-cover"
          />
        </div>
        <p className="mx-auto mt-4 max-w-lg text-center text-small text-(--color-steel)">
          The Airtech team at the company&rsquo;s 25th-anniversary, &ldquo;Reliability Matters&rdquo;
          celebration.
        </p>
      </Section>
    </>
  );
}
