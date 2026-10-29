import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import Image from "@/components/ui/Image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StickyEnquiryBar } from "@/components/ui/StickyEnquiryBar";
import { Offices } from "@/components/layout/Offices";
import { SYSTEM_COLOR } from "@/components/engineering/model";
import { siteSettings } from "@/content/site-settings";

export const metadata: Metadata = {
  title: "Service & Support",
  description:
    "Airtech's after-sales service, Annual Maintenance Contracts (AMC) and technical support for HVAC and MEP systems already in operation.",
};

const SERVICE_ENQUIRY = "/contact/project-enquiry?need=amc-service" as Route;

/*
 * Every service statement below comes from the Master Source of Truth §5
 * ("Service & Technical Support") and the site's existing coverage list:
 * AMC, after-sales service, rapid response and spares, technical support,
 * manufacturer-trained engineers. No response times, uptime figures or
 * guarantees are stated; none have been supplied.
 */
const LINES = [
  {
    no: "01",
    title: "Annual Maintenance Contracts",
    lead: "Scheduled maintenance of the systems in your building, under one annual contract with the team that knows them.",
    includes: [
      "HVAC service and maintenance",
      "Sewage and water treatment plant maintenance",
      "Hot water and hydro-pneumatic system service",
      "Access control and CCTV maintenance",
    ],
    cta: "Ask about an AMC",
  },
  {
    no: "02",
    title: "After-sales service & spares",
    lead: "When something needs attention, a trained technical team responds, with spares support.",
    includes: ["After-sales service", "Rapid response and spares", "General troubleshooting"],
    cta: "Raise a service call",
  },
  {
    no: "03",
    title: "Technical support",
    lead: "Engineers trained at manufacturer centres support the design, selection and installation needs of major customer applications.",
    includes: ["Technical support for installed systems", "Equipment selection and design input", "Manufacturer-trained engineers"],
    cta: "Talk to an engineer",
  },
];

// The systems an AMC covers, each tagged with its discipline's drawing colour.
const SYSTEMS = [
  { name: "Air-conditioning and ventilation", discipline: "HVAC", slug: "hvac" as const, href: "/expertise/hvac" },
  { name: "Sewage and water treatment plants", discipline: "PHE", slug: "plumbing-public-health" as const, href: "/expertise/plumbing-public-health" },
  { name: "Hot water and hydro-pneumatic systems", discipline: "PHE", slug: "plumbing-public-health" as const, href: "/expertise/plumbing-public-health" },
  { name: "Access control and CCTV", discipline: "ELV", slug: "elv-security" as const, href: "/expertise/elv-security" },
];

const PLANT = [
  { src: "/images/projects/golyan-tower-5.jpg", alt: "Rooftop outdoor units and fire-fighting pipework at Golyan Tower", caption: "Rooftop plant · Golyan Tower", cls: "col-span-2 row-span-2" },
  { src: "/images/projects/mit-college-2.jpg", alt: "VRF outdoor units on the roof of MIT College", caption: "Outdoor units · MIT College", cls: "" },
  { src: "/images/projects/mit-college-4.jpg", alt: "A ceiling cassette unit and cable tray at MIT College", caption: "Indoor units · MIT College", cls: "" },
];

const STEPS = [
  { title: "Tell us the system and the issue", body: "Use the service form or email the engineering team: the building, the system, and what you're seeing." },
  { title: "An engineer gets in touch", body: "Airtech's technical team reviews the request and contacts you to plan the visit." },
  { title: "Trained technicians carry out the work", body: "Service, repair or maintenance by the team that installs and commissions these systems." },
];

const TRAINING = ["Germany", "Japan", "Italy", "Malaysia", "China", "India"];

/**
 * Service & Support (2026-10-29 rebuild): a service desk, not a brochure
 * page. Photo-led opening with the two actions people come here for, then
 * three service lines, the systems maintained, how a request works, the
 * training behind the team, and where to reach it.
 */
export default function ServiceSupportPage() {
  return (
    <>
      {/* 1 — Opening: the promise beside the plant it keeps running. */}
      <section className="pt-8 sm:pt-12">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service & Support" }]} visuallyHidden />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-6 lg:pb-6">
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">
                Service &amp; Support
              </p>
              <h1 className="mt-5 font-display text-display-2xl font-semibold leading-[1.02] tracking-[-0.026em] text-balance text-(--color-ink)">
                Systems that keep running, long after handover.
              </h1>
              <p className="mt-6 max-w-xl text-body-l leading-relaxed text-(--color-steel)">
                A trained technical team supports the systems Airtech installs through Annual Maintenance
                Contracts, scheduled service and rapid response.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <ButtonLink href={SERVICE_ENQUIRY} size="lg">
                  Request a service visit
                </ButtonLink>
                <a
                  href={`mailto:${siteSettings.primaryEmail}?subject=${encodeURIComponent("AMC enquiry")}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-(--color-line-strong) px-7 py-3.5 text-base font-medium text-(--color-ink) transition-colors hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
                >
                  Email about an AMC
                </a>
              </div>
            </div>
            <figure className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                <Image
                  src="/images/process/fire-pump-room.jpg"
                  alt="A fire-fighting pump room: sprinkler and hydrant pumps, a diesel fire pump, valves and gauges"
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2.5 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-(--color-steel)">
                A fire-fighting pump room · Airtech site
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* 2 — Three service lines, read across like a ledger. */}
      <section aria-labelledby="lines-heading" className="mt-16 border-t border-(--color-line-strong) sm:mt-20">
        <Container>
          <h2 id="lines-heading" className="sr-only">Support Airtech provides</h2>
          <div className="grid lg:grid-cols-3 lg:divide-x lg:divide-(--color-line-strong)">
            {LINES.map((l, i) => (
              <Reveal key={l.no} delay={i * 0.06} className="h-full">
                <article className="flex h-full flex-col border-b border-(--color-line-strong) py-12 lg:border-b-0 lg:px-10 lg:py-16 lg:first:pl-0 lg:last:pr-0">
                  <span aria-hidden="true" className="font-display text-[3.5rem] font-bold leading-none tracking-[-0.04em] text-(--color-brand-blue-vivid)">
                    {l.no}
                  </span>
                  <h3 className="mt-6 font-display text-[1.625rem] font-semibold leading-tight text-(--color-ink)">{l.title}</h3>
                  <p className="mt-3 text-body leading-relaxed text-(--color-steel)">{l.lead}</p>
                  <ul className="mt-6 border-t border-(--color-line)">
                    {l.includes.map((x) => (
                      <li key={x} className="flex items-center gap-3 border-b border-(--color-line) py-2.5 text-body text-(--color-ink-soft)">
                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-brand-blue-vivid)" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <Link href={SERVICE_ENQUIRY} className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-6 text-sm font-semibold text-(--color-brand-blue) hover:underline">
                    {l.cta} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 3 — Systems maintained, beside the plant itself. */}
      <section aria-labelledby="systems-heading" className="border-t border-(--color-line-strong) bg-(--color-paper-raised) py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">Coverage</p>
              <h2 id="systems-heading" className="mt-4 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.018em] text-balance text-(--color-ink)">
                The systems we keep running.
              </h2>
              <ul className="mt-10 border-t border-(--color-ink)">
                {SYSTEMS.map((s) => (
                  <li key={s.name} className="border-b border-(--color-line-strong)">
                    <Link href={s.href as Route} className="group flex min-h-16 items-center gap-4 py-3">
                      <span aria-hidden="true" className="h-8 w-1 shrink-0 rounded-full" style={{ background: SYSTEM_COLOR[s.slug] }} />
                      <span className="flex-1 text-body-l font-medium text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">{s.name}</span>
                      <span className="font-mono text-[0.75rem] font-semibold tracking-[0.1em]" style={{ color: SYSTEM_COLOR[s.slug] }}>
                        {s.discipline}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-small leading-relaxed text-(--color-steel)">
                Plus general technical support and troubleshooting across the systems Airtech installs.
              </p>
            </div>
            <div className="grid grid-cols-2 auto-rows-[10rem] gap-3 sm:auto-rows-[13rem] lg:col-span-7">
              {PLANT.map((p) => (
                <figure key={p.src} className={`relative overflow-hidden rounded-[3px] ${p.cls}`}>
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 40vw, 50vw" className="object-cover" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-white">
                    {p.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 4 — How a service request works. */}
      <section aria-labelledby="steps-heading" className="py-20 sm:py-24">
        <Container>
          <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">How it works</p>
          <h2 id="steps-heading" className="mt-4 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.018em] text-(--color-ink)">
            From your request to a working system.
          </h2>
          <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            <span aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-(--color-line-strong) md:block" />
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-(--color-brand-blue-vivid) font-mono text-[0.875rem] font-semibold text-white ring-8 ring-(--color-paper)">
                  {i + 1}
                </span>
                <h3 className="mt-6 font-display text-[1.375rem] font-semibold leading-snug text-(--color-ink)">{s.title}</h3>
                <p className="mt-2 max-w-sm text-body leading-relaxed text-(--color-steel)">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 5 — The training behind the team. */}
      <section aria-label="Training" className="border-y border-(--color-line-strong) bg-white py-14">
        <Container className="grid items-center gap-6 lg:grid-cols-12">
          <p className="max-w-sm text-body-l font-medium leading-snug text-(--color-ink) lg:col-span-4">
            Service engineers trained at manufacturer training centres in
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 lg:col-span-8">
            {TRAINING.map((t) => (
              <li key={t} className="font-display text-[1.75rem] font-semibold tracking-[-0.02em] text-(--color-brand-blue-vivid) sm:text-[2.25rem]">
                {t}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 6 — Reach the team. */}
      <section aria-labelledby="reach-heading" className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">Existing customer?</p>
            <h2 id="reach-heading" className="mt-4 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.018em] text-balance text-(--color-ink)">
              Request an AMC or raise a service call.
            </h2>
            <p className="mt-5 text-body-l leading-relaxed text-(--color-steel)">
              The service form opens with &ldquo;AMC / Service &amp; Support&rdquo; already selected.
            </p>
            <div className="mt-8">
              <ButtonLink href={SERVICE_ENQUIRY} size="lg">
                Open the service form
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Offices tone="raised" />
          </div>
        </Container>
      </section>

      <div className="lg:hidden h-[68px]" aria-hidden="true" />
      <StickyEnquiryBar />
    </>
  );
}
