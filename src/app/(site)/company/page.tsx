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
import { HorizontalTimeline, type Milestone } from "@/components/company/HorizontalTimeline";
import { ValuesShowcase, type Value } from "@/components/company/ValuesShowcase";
import { AnniversaryParallax } from "@/components/company/AnniversaryParallax";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { clientCount } from "@/content/clients";
import { siteSettings } from "@/content/site-settings";
import { SYSTEM_COLOR, type SystemSlug } from "@/components/engineering/model";

export const metadata: Metadata = {
  title: "About",
  description:
    "Airtech Industries is a Nepal-based engineering and MEP company specialising in HVAC, electrical, PHE, fire-protection and ELV solutions, established in 2000.",
};

/*
 * /company, rebuilt again 2026-10-07 ("still very boring and simple"): the
 * page is now a scroll-driven story rather than a stack of static blocks —
 * a "25" that opens onto the whole team, statements that light up word by
 * word, a pinned sideways timeline, a big interactive values index and a
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
  { value: `${Math.floor(clientCount / 10) * 10}+`, label: "Clients across Nepal" },
];

const milestones: Milestone[] = [
  {
    year: "2000",
    title: "Founded as an HVAC specialist",
    body: "Airtech is established in Kathmandu with a focus on heating, ventilation and air-conditioning engineering.",
  },
  {
    year: "2013",
    title: "The MEP division",
    body: "Airtech expands beyond HVAC into integrated mechanical, electrical, PHE and ELV engineering.",
  },
  {
    year: "2025",
    title: "25 years: Reliability Matters",
    body: "A company-wide anniversary celebration marks a quarter-century in business.",
    image: { src: "/images/team/anniversary-stage.jpg", alt: "The Airtech team on stage at the 25th-anniversary celebration" },
  },
  {
    year: "Today",
    title: "One integrated engineering partner",
    body: "HVAC, electrical, PHE, fire protection, ELV and BMS, delivered by one team from design to after-sales support.",
    image: { src: "/images/team/team-strategy-meeting.jpg", alt: "The Airtech leadership team in a strategy meeting" },
  },
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
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">Who we are</p>
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
                healthcare, hospitality, pharmaceutical and institutional clients, with {projects.length}{" "}
                projects in its portfolio and over {Math.floor(clientCount / 10) * 10} organisations in its
                client register.
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
                <div className="relative col-span-3 aspect-[4/5] overflow-hidden rounded-[6px]">
                  <Image src="/images/team/team-strategy-meeting.jpg" alt="Airtech's leadership team in a strategy meeting" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-center" />
                </div>
                <div className="col-span-2 flex flex-col gap-3 sm:gap-4">
                  <div className="relative aspect-square overflow-hidden rounded-[6px]">
                    <Image src="/images/team/founder-at-work.jpg" alt="Manoj Bhansali, Managing Director, at his desk" fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover object-center" />
                  </div>
                  <div className="relative flex-1 overflow-hidden rounded-[6px] bg-(--color-brand-blue) p-5 text-white">
                    <p className="font-display text-[2.75rem] leading-none font-bold tracking-[-0.04em]">25+</p>
                    <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/75">Years of engineering in Nepal</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 3 — 25 years, sideways */}
      <div className="border-t border-(--color-line)">
        <HorizontalTimeline milestones={milestones} />
      </div>

      {/* 4 — Mission: a full-width blue statement band that lights up. */}
      <section className="relative isolate overflow-hidden bg-(--color-brand-blue) py-24 text-white sm:py-28 lg:py-36">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div aria-hidden="true" className="absolute -top-32 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-(--color-brand-blue-soft)/40 blur-[110px]" />
        <Container>
          <p className="flex items-center gap-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white/75">
            <span className="tabular-nums">01</span>
            <span aria-hidden="true" className="h-px w-8 bg-white/60" />
            Our mission
          </p>
          <ScrollWords
            dimOpacity={0.28}
            className="mt-8 max-w-[32ch] font-display text-[1.875rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-[2.5rem] lg:text-[3.5rem]"
            parts={[
              "Airtech delivers complete, engineered and customised technology solutions that exceed expectations, building a reputation for",
              { text: "integrity, reliability, responsiveness", className: "underline decoration-white/50 decoration-2 underline-offset-[8px]" },
              "and",
              { text: "teamwork.", className: "underline decoration-white/50 decoration-2 underline-offset-[8px]" },
            ]}
          />
        </Container>
      </section>

      {/* 5 — Vision, alongside the Managing Director. */}
      <section className="py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <figure className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[6px]">
                  <Image
                    src="/images/team/founder-manoj-bhansali.jpg"
                    alt="Manoj Bhansali, Managing Director of Airtech Industries"
                    fill
                    sizes="(min-width: 1024px) 64vw, 190vw"
                    className="object-cover object-[62%_center]"
                  />
                </div>
                <figcaption className="absolute -bottom-6 left-6 rounded-[4px] bg-(--color-paper) px-5 py-4 shadow-[0_20px_40px_-25px_rgba(5,29,43,0.5)] sm:left-8">
                  <p className="font-display text-title font-semibold text-(--color-ink)">Manoj Bhansali</p>
                  <p className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-(--color-brand-blue)">Managing Director</p>
                </figcaption>
              </figure>
            </Reveal>
            <div>
              <p className="flex items-center gap-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
                <span className="tabular-nums">02</span>
                <span aria-hidden="true" className="h-px w-8 bg-(--color-brand-blue)" />
                Our vision
              </p>
              <ScrollWords
                as="blockquote"
                className="mt-8 font-display text-[2rem] leading-[1.12] font-semibold tracking-[-0.025em] text-(--color-ink) sm:text-[2.75rem] lg:text-[3.5rem]"
                parts={[
                  "“To be our customers’",
                  { text: "partner for life,", className: "text-(--color-brand-blue)" },
                  "earning their loyalty by listening, anticipating and creating value.”",
                ]}
              />
              <Link href="/company/leadership" className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-brand-blue) hover:underline">
                Meet the leadership <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 6 — Core values */}
      <section className="border-t border-(--color-line) bg-band py-24 sm:py-28">
        <Container>
          <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">What we value</p>
              <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.04] text-balance text-(--color-ink)">Six commitments, every system.</h2>
            </div>
            <p className="max-w-md text-body leading-relaxed text-(--color-steel) lg:justify-self-end">
              Point at a value to see it. These shape how Airtech engineers, installs and supports
              every building it works on.
            </p>
          </div>
          <ValuesShowcase values={coreValues} />
        </Container>
      </section>

      {/* 7 — The 25th anniversary */}
      <AnniversaryParallax />

      {/* 8 — More about Airtech + careers */}
      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <Reveal>
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
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
                    className="group flex h-full flex-col overflow-hidden rounded-[6px] border border-(--color-line) bg-(--color-paper) transition-all duration-300 hover:-translate-y-1 hover:border-(--color-brand-blue-vivid) hover:shadow-[0_24px_48px_-30px_rgba(0,124,183,0.55)]"
                  >
                    <span className="relative block aspect-[16/10] overflow-hidden">
                      <Image
                        src={p.image.src}
                        alt={p.image.alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    </span>
                    <span className="flex flex-1 items-start justify-between gap-4 p-6">
                      <span>
                        <span className="block font-display text-title font-semibold text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
                          {p.label}
                        </span>
                        <span className="mt-1.5 block text-small leading-relaxed text-(--color-steel)">{p.description}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--color-line) text-(--color-ink) transition-all group-hover:border-(--color-brand-blue-vivid) group-hover:bg-(--color-brand-blue-vivid) group-hover:text-white"
                      >
                        &rarr;
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* Careers panel */}
          <Reveal>
            <div className="relative isolate mt-8 overflow-hidden rounded-[6px] bg-(--color-blue-deep) text-white">
              <Image
                src="/images/team/anniversary-hall.jpg"
                alt=""
                fill
                sizes="(max-width: 767px) 250vw, 100vw"
                className="-z-10 object-cover object-center opacity-30"
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-(--color-blue-deep) via-(--color-blue-deep)/85 to-(--color-blue-deep)/40" />
              <div className="grid grid-cols-1 gap-8 p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-14">
                <div>
                  <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue-soft)">
                    Careers
                  </p>
                  <h2 className="mt-4 max-w-[22ch] font-display text-display-m font-semibold leading-[1.1] text-balance">
                    Engineer the buildings Nepal runs on.
                  </h2>
                  <p className="mt-4 max-w-lg text-body leading-relaxed text-white/75">
                    Engineers and technicians who want hospitals, hotels and data centres on their
                    record. Send your CV to{" "}
                    <a href={`mailto:${siteSettings.careersEmail}`} className="font-medium text-white underline underline-offset-4 hover:text-(--color-brand-blue-soft)">
                      {siteSettings.careersEmail}
                    </a>
                    .
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/company/careers" size="lg">
                    View careers
                  </ButtonLink>
                  <a
                    href={`mailto:${siteSettings.careersEmail}?subject=${encodeURIComponent("Job application")}`}
                    className="inline-flex items-center rounded-full border border-white/40 px-7 py-3.5 text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-(--color-ink)"
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
