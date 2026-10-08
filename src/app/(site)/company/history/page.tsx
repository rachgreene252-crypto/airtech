import type { Metadata } from "next";
import Image from "@/components/ui/Image";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

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

const MILESTONE_PHOTOS: Record<string, { src: string; alt: string }> = {
  "2025": { src: "/images/team/anniversary-stage.jpg", alt: "Airtech's leadership on stage at the 25th-anniversary celebration" },
  Today: { src: "/images/team/team-strategy-meeting.jpg", alt: "The Airtech leadership team in a strategy meeting" },
};

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
      {/* Rebuilt 2026-10-07: each milestone is a full row with an oversized
          year, and the anniversary is shown in the client's own 1600px
          event photographs (AIPL PROFILE - 2026.pptx) instead of the 455px
          crop used before. */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <ol className="relative">
            {milestones.map((m, i) => {
              const photo = MILESTONE_PHOTOS[m.year];
              return (
                <li key={m.year} className="grid grid-cols-1 gap-6 border-t border-(--color-line) py-12 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-16">
                  <Reveal>
                    <p className="font-display text-[4.5rem] leading-[0.9] font-semibold tracking-[-0.04em] text-(--color-brand-blue) sm:text-[6rem] lg:text-[7.5rem]">
                      {m.year}
                    </p>
                    <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-(--color-steel-soft)">
                      Milestone {String(i + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
                    </p>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2 className="font-display text-display-m font-semibold leading-[1.1] tracking-[-0.016em] text-(--color-ink)">{m.title}</h2>
                    <p className="mt-4 max-w-xl text-body-l leading-relaxed text-(--color-steel)">{m.body}</p>
                    {photo && (
                      <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[6px]">
                        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-center" />
                      </div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-(--color-blue-deep) text-white">
        <Image
          src="/images/team/anniversary-team.jpg"
          alt="The Airtech Industries team gathered for the company's 25th-anniversary, Reliability Matters, celebration"
          fill
          sizes="(max-width: 767px) 250vw, 100vw"
          className="-z-10 object-cover object-[center_65%]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-(--color-blue-deep) via-(--color-blue-deep)/50 to-transparent" />
        <Container className="flex min-h-[30rem] flex-col justify-end py-14 sm:min-h-[36rem] sm:py-16">
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue-soft)">
            25 years
          </p>
          <h2 className="mt-4 max-w-[20ch] font-display text-display-l font-semibold leading-[1.06] text-balance">
            One team, a quarter century of reliability.
          </h2>
        </Container>
      </section>
    </>
  );
}
