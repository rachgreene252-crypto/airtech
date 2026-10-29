import type { Metadata } from "next";
import type { Route } from "next";
import Image from "@/components/ui/Image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CompanyHero } from "@/components/company/CompanyHero";
import { ScrollWords } from "@/components/company/ScrollWords";
import { ValuesShowcase, type Value } from "@/components/company/ValuesShowcase";
import { AnniversaryParallax } from "@/components/company/AnniversaryParallax";
import { CapabilityGrowth } from "@/components/company/CapabilityGrowth";
import { Offices } from "@/components/layout/Offices";
import { services } from "@/content/services";
import { siteSettings } from "@/content/site-settings";
import { SYSTEM_COLOR, type SystemSlug } from "@/components/engineering/model";

export const metadata: Metadata = {
  title: "About",
  description:
    "Airtech Industries is a Nepal-based engineering and MEP company specialising in HVAC, electrical, PHE, fire-protection and ELV solutions, established in 2000.",
};

/*
 * 2026-10-29: restructured as chapters: who we are, how Airtech grew
 * (capability ledger), mission + vision as one spread, values, the people,
 * where we are (Nepal + India), then more pages and careers.
 *
 * /company, rebuilt again 2026-10-07 ("still very boring and simple"): the
 * page is now a scroll-driven story rather than a stack of static blocks —
 * a "25" that opens onto the whole team, statements that light up word by
 * word, a big interactive values index and a
 * parallax anniversary gallery.
 *
 * Every fact is sourced: description and milestones from the Master Source
 * of Truth / history page, mission and vision verbatim from
 * source-material/CLIENT_LIST_AND_MISSION_2026-10-01.md, and the
 * anniversary photographs from AIPL PROFILE - 2026.pptx (slides 22–23).
 */

const stats = [
  { value: siteSettings.establishedYear, label: "Established" },
  { value: "25+", label: "Years of engineering" },
  { value: "2013", label: "MEP division launched" },
  { value: `${services.length}`, label: "Engineering disciplines" },
];


const coreValues: Value[] = [
  { title: "Integrity", body: "Taking responsibility for what we promise.", image: { src: "/images/team/founder-manoj-bhansali.jpg", alt: "Manoj Bhansali, Managing Director" } },
  { title: "Technical excellence", body: "Through proper thinking, planning and implementation.", image: { src: "/images/team/team-strategy-meeting.jpg", alt: "The leadership team planning a project" } },
  { title: "Reliability", body: "Systems that keep running, and a team that stays accountable for them.", image: { src: "/images/team/anniversary-stage.jpg", alt: "The team under the Reliability Matters banner" } },
  { title: "Flexibility", body: "Understanding what each client actually needs.", image: { src: "/images/team/team-showroom-meeting.jpg", alt: "The team meeting in the showroom" } },
  { title: "Responsiveness", body: "A receptive approach to customer needs.", image: { src: "/images/team/founder-at-work.jpg", alt: "The Managing Director at work" } },
  { title: "Collaborative teamwork", body: "Open exchange of information and resources with our clients.", image: { src: "/images/team/anniversary-cake.jpg", alt: "The team cutting the 25th-anniversary cake" } },
];

const morePages = [
  {
    label: "History",
    href: "/company/history",
    description: "From an HVAC specialist in 2000 to an integrated MEP contractor.",
    image: { src: "/images/team/anniversary-hall.jpg", alt: "The 25th-anniversary celebration hall" },
  },
  {
    label: "Leadership",
    href: "/company/leadership",
    description: "The people behind Airtech's engineering delivery.",
    image: { src: "/images/team/founder-at-work.jpg", alt: "Manoj Bhansali, Managing Director, at work" },
  },
  {
    label: "Quality & Certifications",
    href: "/company/quality-certifications",
    description: "How we hold every installation to standard.",
    image: { src: "/images/team/team-showroom-meeting.jpg", alt: "The Airtech team meeting in the showroom" },
  },
];

export default function CompanyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company" }]} visuallyHidden />
      <CompanyHero stats={stats} careersHref={"/company/careers" as Route} />

      {/* 2 — Who we are: a statement that lights up as it scrolls. */}
      <section id="story" className="scroll-mt-24 py-24 sm:py-28 lg:py-36">
        <Container>
          <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">Who we are</p>
          <ScrollWords
            className="mt-6 max-w-[30ch] font-display text-[2rem] leading-[1.12] font-semibold tracking-[-0.025em] text-(--color-ink) sm:text-[2.75rem] lg:text-[3.75rem]"
            parts={[
              "Since 2000, Airtech has grown from an",
              { text: "HVAC specialist", className: "text-(--color-brand-blue)" },
              "into an",
              { text: "integrated MEP partner", className: "text-(--color-brand-blue)" },
              "— engineering, procurement, installation, commissioning and after-sales, under one roof.",
            ]}
          />
          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
            <Reveal>
              <p className="max-w-lg text-body-l leading-relaxed text-(--color-steel)">
                Airtech is a Nepal-based engineering and MEP company serving commercial, industrial,
                healthcare, hospitality, pharmaceutical and institutional clients, delivering every
                system a building needs through one accountable engineering team.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Engineering disciplines">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/expertise/${s.slug}` as Route}
                      className="inline-flex items-center gap-2 rounded-full border border-(--color-line-strong) px-3.5 py-1.5 text-sm font-medium text-(--color-ink) transition-colors hover:border-(--color-brand-blue-vivid) hover:text-(--color-brand-blue)"
                    >
                      <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: SYSTEM_COLOR[s.slug as SystemSlug] }} />
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-5 gap-3 sm:gap-4">
                <figure className="relative col-span-3 aspect-[4/5] overflow-hidden rounded-[3px]">
                  <Image src="/images/team/team-strategy-meeting.jpg" alt="Airtech's leadership team in a strategy meeting" fill sizes="(min-width: 1024px) 34vw, 60vw" className="object-cover object-center" />
                </figure>
                <figure className="relative col-span-2 mt-12 aspect-[3/4] overflow-hidden rounded-[3px]">
                  <Image src="/images/team/team-showroom-meeting.jpg" alt="Airtech engineers in a project meeting" fill sizes="(min-width: 1024px) 22vw, 40vw" className="object-cover object-center" />
                </figure>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 3 — How Airtech grew: capability evolution ledger. */}
      <CapabilityGrowth />

      {/* 4 — Why we exist: mission and vision as one spread (they were two
          full-height sections saying similar things). Verbatim from
          source-material/CLIENT_LIST_AND_MISSION_2026-10-01.md. */}
      <section aria-labelledby="purpose-heading" className="border-t border-(--color-line) bg-(--color-paper-raised) py-20 sm:py-24 lg:py-28">
        <Container>
          <h2 id="purpose-heading" className="sr-only">Mission and vision</h2>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="flex items-center gap-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">
                <span aria-hidden="true" className="h-px w-8 bg-(--color-brand-blue)" />
                Our mission
              </p>
              <ScrollWords
                className="mt-6 font-display text-[1.75rem] leading-[1.18] font-semibold tracking-[-0.02em] text-(--color-ink) sm:text-[2.25rem] lg:text-[2.75rem]"
                parts={[
                  "Airtech delivers complete, engineered and customised technology solutions that exceed expectations, building a reputation for",
                  { text: "integrity, reliability, responsiveness", className: "text-(--color-brand-blue)" },
                  "and",
                  { text: "teamwork.", className: "text-(--color-brand-blue)" },
                ]}
              />
            </div>
            <figure className="lg:col-span-5">
              <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-end gap-5">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[3px]">
                  <Image
                    src="/images/team/founder-manoj-bhansali.jpg"
                    alt="Manoj Bhansali, Managing Director of Airtech Industries"
                    fill
                    sizes="(min-width: 1024px) 18vw, 45vw"
                    className="object-cover object-[62%_center]"
                  />
                </div>
                <div>
                  <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">Our vision</p>
                  <blockquote className="mt-4 font-display text-[1.375rem] leading-[1.25] font-semibold tracking-[-0.012em] text-(--color-ink)">
                    &ldquo;To be our customers&rsquo; partner for life, earning their loyalty by listening, anticipating and creating value.&rdquo;
                  </blockquote>
                </div>
              </div>
              <figcaption className="mt-5 border-t border-(--color-line-strong) pt-4">
                <span className="block font-display text-[1.125rem] font-semibold text-(--color-ink)">Manoj Bhansali</span>
                <span className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-(--color-steel)">Managing Director</span>
                <Link href="/company/leadership" className="ml-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--color-brand-blue) hover:underline">
                  Leadership <span aria-hidden="true">&rarr;</span>
                </Link>
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* 5 — Core values (heading required by the client) */}
      <section className="border-t border-(--color-line) bg-band py-24 sm:py-28">
        <Container>
          <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">What we value</p>
              <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.04] text-balance text-(--color-ink)">Our core values.</h2>
            </div>
            <p className="max-w-md text-body leading-relaxed text-(--color-steel) lg:justify-self-end">
              Point at a value to see it. These shape how Airtech engineers, installs and supports
              every building it works on.
            </p>
          </div>
          <ValuesShowcase values={coreValues} />
        </Container>
      </section>

      {/* 6 — The people, at 25 */}
      <AnniversaryParallax />

      {/* 7 — Where we are: Nepal and India, from src/content/offices.ts. */}
      <section aria-labelledby="offices-heading" className="border-t border-(--color-line) bg-(--color-paper-raised) py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">Where we are</p>
            <h2 id="offices-heading" className="mt-4 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.018em] text-balance text-(--color-ink)">
              Kathmandu, and now Kolkata.
            </h2>
            <p className="mt-5 text-body-l leading-relaxed text-(--color-steel)">
              The head office in Kathmandu, and Airtech M&amp;E India LLP in Salt Lake City, Kolkata.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Offices />
          </div>
        </Container>
      </section>

      {/* 8 — More about Airtech + careers */}
      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <Reveal>
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
              More about Airtech
            </p>
            <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.06] text-balance text-(--color-ink)">
              History, people and standards.
            </h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {morePages.map((p, i) => (
              <li key={p.href}>
                <Reveal delay={i * 0.06} className="h-full">
                  <Link
                    href={p.href as Route}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-[3px] bg-(--color-blue-deep) text-white"
                  >
                    <Image
                      src={p.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.045] motion-reduce:transition-none"
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-(--color-blue-deep)/90 via-(--color-blue-deep)/25 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                      <span>
                        <span className="block font-display text-[1.375rem] font-semibold leading-tight">{p.label}</span>
                        <span className="mt-1 block text-small leading-relaxed text-white/80">{p.description}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 transition-colors group-hover:border-(--color-brand-blue-vivid) group-hover:bg-(--color-brand-blue-vivid)"
                      >
                        &rarr;
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* Careers panel. 2026-10-29: light photo-and-text split instead of
              a dark photo wash. */}
          <Reveal>
            <div className="mt-8 grid overflow-hidden rounded-[3px] border border-(--color-line) bg-(--color-paper-raised) lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto">
                <Image
                  src="/images/team/anniversary-hall.jpg"
                  alt="The Airtech team gathered in the anniversary hall"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-8 sm:p-12 lg:p-14">
                <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">
                  Careers
                </p>
                <h2 className="mt-4 max-w-[22ch] font-display text-display-m font-semibold leading-[1.1] text-balance text-(--color-ink)">
                  Engineer the buildings Nepal runs on.
                </h2>
                <p className="mt-4 max-w-lg text-body leading-relaxed text-(--color-steel)">
                  Engineers and technicians who want hospitals, hotels and data centres on their
                  record. Send your CV to{" "}
                  <a href={`mailto:${siteSettings.careersEmail}`} className="font-medium text-(--color-brand-blue) underline underline-offset-4">
                    {siteSettings.careersEmail}
                  </a>
                  .
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/company/careers" size="lg">
                    View careers
                  </ButtonLink>
                  <a
                    href={`mailto:${siteSettings.careersEmail}?subject=${encodeURIComponent("Job application")}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-(--color-line-strong) px-7 py-3.5 text-base font-medium text-(--color-ink) transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
                  >
                    Email your CV
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
