import type { Metadata } from "next";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CompanyTimeline, type Milestone } from "@/components/company/CompanyTimeline";
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
 * /company, rebuilt 2026-10-07 ("very bland and boring ... add more
 * character"). The page now opens on the client's own 25th-anniversary
 * team photograph and tells the company's story in order: who Airtech is,
 * how it grew, what it stands for, the people, and how to join.
 *
 * Every fact is sourced: the description and milestones from the Master
 * Source of Truth / history page, the mission and vision verbatim from
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

const coreValues = [
  { title: "Integrity", body: "Taking responsibility for what we promise." },
  { title: "Technical excellence", body: "Through proper thinking, planning and implementation." },
  { title: "Reliability", body: "Systems that keep running, and a team that stays accountable for them." },
  { title: "Flexibility", body: "Understanding what each client actually needs." },
  { title: "Responsiveness", body: "A receptive approach to customer needs." },
  { title: "Collaborative teamwork", body: "Open exchange of information and resources with our clients." },
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
      {/* 1 — Photo-led hero: the whole company in one frame. */}
      <section className="relative isolate overflow-hidden bg-(--color-blue-deep)">
        <Image
          src="/images/team/anniversary-team.jpg"
          alt="The Airtech team gathered for the company's 25th anniversary"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[center_60%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(5,29,43,0.92)_0%,rgba(5,29,43,0.78)_42%,rgba(5,29,43,0.25)_75%,rgba(5,29,43,0.1)_100%)]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-(--color-blue-deep)/45 sm:hidden" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-(--color-blue-deep)/80 to-transparent" />
        <Container className="pt-16 pb-36 sm:pt-24 sm:pb-40 lg:pt-28 lg:pb-44">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company" }]} visuallyHidden />
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue-soft)">
              <span aria-hidden="true" className="h-px w-8 bg-(--color-brand-blue-soft)" />
              About Airtech · Est. {siteSettings.establishedYear}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-[18ch] font-display text-display-xl font-semibold leading-[1.04] tracking-[-0.025em] text-balance text-white">
              An engineering company built around one idea:{" "}
              <span className="text-(--color-brand-blue-soft)">reliability matters</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-body-l leading-relaxed text-white/80">
              25 years of engineering the systems Nepal&apos;s hotels, hospitals, banks and factories
              run on, by one team that stays with every building long after handover.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href={"#story" as Route} size="lg">
                Our story
              </ButtonLink>
              <Link
                href="/company/careers"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-(--color-ink)"
              >
                Careers at Airtech <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Stat strip, overlapping the hero's lower edge. */}
      <Container className="relative z-10 -mt-20 sm:-mt-24">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-(--color-line) bg-(--color-line) shadow-[0_30px_60px_-35px_rgba(5,29,43,0.45)] sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((s, i) => (
              <div key={s.label} className={`bg-(--color-paper) px-5 py-6 sm:px-6 sm:py-7 ${i === stats.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}>
                <dd className="font-display text-[2rem] leading-none font-semibold tracking-[-0.02em] text-(--color-brand-blue) tabular-nums">
                  {s.value}
                </dd>
                <dt className="mt-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-(--color-steel)">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      {/* 2 — Who we are */}
      <section id="story" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
                Who we are
              </p>
              <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.018em] text-balance text-(--color-ink)">
                From an HVAC specialist to an integrated MEP partner.
              </h2>
              <p className="mt-6 text-body-l leading-relaxed text-(--color-steel)">
                Airtech is a Nepal-based engineering and MEP company specialising in HVAC, mechanical,
                electrical, PHE, fire-protection and ELV solutions. Established in{" "}
                {siteSettings.establishedYear}, it serves commercial, industrial, healthcare,
                hospitality, pharmaceutical and institutional clients, combining engineering,
                procurement, installation, testing, commissioning and after-sales support under one
                umbrella.
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
              <p className="mt-8 text-small text-(--color-steel)">
                {projects.length} projects in the portfolio ·{" "}
                <Link href="/projects" className="font-medium text-(--color-brand-blue) hover:underline">
                  see the work &rarr;
                </Link>
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-6 grid-rows-[auto_auto] gap-3 sm:gap-4">
                <div className="relative col-span-6 aspect-[16/10] overflow-hidden rounded-[4px] sm:col-span-4 sm:row-span-2 sm:aspect-auto">
                  <Image
                    src="/images/team/team-strategy-meeting.jpg"
                    alt="Airtech's leadership team in a strategy meeting at the Kathmandu office"
                    fill
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 66vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-[4px] sm:col-span-2">
                  <Image
                    src="/images/team/founder-at-work.jpg"
                    alt="Manoj Bhansali, Managing Director, at his desk"
                    fill
                    sizes="(min-width: 1024px) 17vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-[4px] sm:col-span-2">
                  <Image
                    src="/images/team/team-showroom-meeting.jpg"
                    alt="The Airtech team meeting in the showroom"
                    fill
                    sizes="(min-width: 1024px) 17vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 3 — Timeline */}
      <section className="border-y border-(--color-line) bg-band py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
                  Our journey
                </p>
                <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.06] text-balance text-(--color-ink)">
                  25 years, one direction.
                </h2>
              </div>
              <Link href="/company/history" className="text-sm font-medium text-(--color-brand-blue) hover:underline">
                The full history &rarr;
              </Link>
            </div>
          </Reveal>
          <div className="mt-14">
            <CompanyTimeline milestones={milestones} />
          </div>
        </Container>
      </section>

      {/* 4 — Mission: a full-width blue statement band. */}
      <section className="relative isolate overflow-hidden bg-(--color-brand-blue) py-20 text-white sm:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div aria-hidden="true" className="absolute -top-32 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-(--color-brand-blue-soft)/40 blur-[110px]" />
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <p className="flex items-center gap-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white/75">
                <span className="tabular-nums">01</span>
                <span aria-hidden="true" className="h-px w-8 bg-white/60" />
                Our mission
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-[34ch] font-display text-[1.75rem] leading-[1.2] font-semibold tracking-[-0.018em] text-balance sm:text-[2.25rem] lg:text-[2.75rem]">
                Airtech delivers complete, engineered and customised technology solutions that exceed
                expectations, building a reputation for{" "}
                <span className="underline decoration-white/40 decoration-2 underline-offset-[6px]">integrity</span>,{" "}
                <span className="underline decoration-white/40 decoration-2 underline-offset-[6px]">reliability</span>,{" "}
                <span className="underline decoration-white/40 decoration-2 underline-offset-[6px]">responsiveness</span> and{" "}
                <span className="underline decoration-white/40 decoration-2 underline-offset-[6px]">teamwork</span>.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 5 — Vision, alongside the Managing Director. */}
      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <Reveal>
              <figure className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[4px]">
                  <Image
                    src="/images/team/founder-manoj-bhansali.jpg"
                    alt="Manoj Bhansali, Managing Director of Airtech Industries"
                    fill
                    sizes="(min-width: 1024px) 36vw, 100vw"
                    className="object-cover object-[62%_center]"
                  />
                </div>
                <figcaption className="absolute -bottom-6 left-6 rounded-[4px] bg-(--color-paper) px-5 py-4 shadow-[0_20px_40px_-25px_rgba(5,29,43,0.5)] sm:left-8">
                  <p className="font-display text-title font-semibold text-(--color-ink)">Manoj Bhansali</p>
                  <p className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-(--color-brand-blue)">
                    Managing Director
                  </p>
                </figcaption>
                <span aria-hidden="true" className="absolute -top-4 -right-4 -z-10 hidden h-full w-full rounded-[4px] border-2 border-(--color-brand-blue-vivid)/40 lg:block" />
              </figure>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="flex items-center gap-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
                <span className="tabular-nums">02</span>
                <span aria-hidden="true" className="h-px w-8 bg-(--color-brand-blue)" />
                Our vision
              </p>
              <blockquote className="relative mt-8">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-4 -left-2 select-none font-display text-[8rem] leading-[0.8] text-(--color-brand-blue-vivid)/15 sm:-left-6"
                >
                  &ldquo;
                </span>
                <p className="relative font-display text-[1.75rem] leading-[1.2] font-semibold tracking-[-0.018em] text-balance text-(--color-ink) sm:text-[2.25rem] lg:text-[2.75rem]">
                  To be our customers&rsquo;{" "}
                  <span className="text-(--color-brand-blue)">partner for life</span>, earning their loyalty
                  by listening, anticipating and creating value.
                </p>
              </blockquote>
              <Link
                href="/company/leadership"
                className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-brand-blue) hover:underline"
              >
                Meet the leadership <span aria-hidden="true">&rarr;</span>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 6 — Core values: six tiles that fill with blue on hover / focus. */}
      <section className="border-t border-(--color-line) bg-band py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
              <div>
                <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
                  What we value
                </p>
                <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.06] text-balance text-(--color-ink)">
                  Our core values.
                </h2>
              </div>
              <p className="max-w-md text-body leading-relaxed text-(--color-steel) lg:justify-self-end">
                Six commitments that shape how Airtech engineers, installs and supports every system.
              </p>
            </div>
          </Reveal>
          <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v, i) => (
              <li key={v.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div
                    tabIndex={0}
                    className="group relative h-full overflow-hidden rounded-[6px] border border-(--color-line) bg-(--color-paper) p-7 outline-none transition-all duration-500 hover:-translate-y-1 hover:border-(--color-brand-blue) hover:shadow-[0_24px_48px_-28px_rgba(0,124,183,0.6)] focus-visible:border-(--color-brand-blue)"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 origin-bottom scale-y-0 bg-(--color-brand-blue) transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute -right-2 -bottom-6 font-display text-[7rem] leading-none font-bold text-(--color-brand-blue)/[0.07] transition-colors duration-500 group-hover:text-white/15 group-focus-visible:text-white/15"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative">
                      <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-(--color-brand-blue) transition-colors duration-500 group-hover:text-white/80 group-focus-visible:text-white/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-6 font-display text-[1.5rem] leading-tight font-semibold tracking-[-0.01em] text-(--color-ink) transition-colors duration-500 group-hover:text-white group-focus-visible:text-white">
                        {v.title}
                      </h3>
                      <p className="mt-2.5 max-w-[26ch] text-small leading-relaxed text-(--color-steel) transition-colors duration-500 group-hover:text-white/85 group-focus-visible:text-white/85">
                        {v.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 7 — The 25th anniversary, in the client's own photographs. */}
      <section className="relative isolate overflow-hidden bg-(--color-blue-deep) py-20 text-white sm:py-24 lg:py-28">
        <div aria-hidden="true" className="absolute -bottom-40 -left-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-(--color-brand-blue)/35 blur-[120px]" />
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
            <Reveal>
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue-soft)">
                2000 – 2025
              </p>
              <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.06] text-balance">
                25 years of legacy, built together.
              </h2>
              <p className="mt-6 max-w-md text-body-l leading-relaxed text-white/75">
                In 2025 the whole Airtech team came together to mark a quarter-century under the
                banner the company was built on: Reliability Matters.
              </p>
              <div className="mt-9 grid max-w-sm grid-cols-2 gap-6 border-t border-white/15 pt-7">
                <div>
                  <p className="font-display text-[2.25rem] leading-none font-semibold text-(--color-brand-blue-soft)">25</p>
                  <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white/60">Years in business</p>
                </div>
                <div>
                  <p className="font-display text-[2.25rem] leading-none font-semibold text-(--color-brand-blue-soft)">1</p>
                  <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white/60">Team, every system</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { src: "/images/team/anniversary-stage.jpg", alt: "Airtech's leadership on stage under the '25 years of legacy, built together' backdrop", cls: "col-span-2 aspect-[16/9]" },
                  { src: "/images/team/anniversary-md-address.jpg", alt: "The Managing Director addressing the team at the anniversary", cls: "aspect-[4/3]" },
                  { src: "/images/team/anniversary-cake.jpg", alt: "Cutting the 25th-anniversary cake", cls: "aspect-[4/3]" },
                ].map((p) => (
                  <div key={p.src} className={`group relative overflow-hidden rounded-[4px] ${p.cls}`}>
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

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
                sizes="100vw"
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
