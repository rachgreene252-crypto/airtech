import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";
import { siteSettings } from "@/content/site-settings";

const companyPages = [
  { label: "History", href: "/company/history", description: "How Airtech grew from an HVAC specialist into an integrated MEP contractor." },
  { label: "Leadership", href: "/company/leadership", description: "The people behind Airtech's engineering delivery." },
  { label: "Quality & Certifications", href: "/company/quality-certifications", description: "Management-system certification." },
  { label: "Careers", href: "/company/careers", description: "Engineers who want to work on projects that matter." },
] as const;

export const metadata: Metadata = {
  title: "About",
  description:
    "Airtech Industries is a Nepal-based engineering and MEP company specialising in HVAC, electrical, PHE, fire-protection and ELV solutions.",
};

// Small hand-drawn line icons, one per value — each picked to mean the
// word next to it (a pulse for "reliability," a shield for "integrity"),
// not a decorative stand-in.
const coreValues = [
  { title: "Integrity", body: "Taking responsibility for what we promise." },
  { title: "Technical excellence", body: "Through proper thinking, planning and implementation." },
  { title: "Reliability", body: "Systems that keep running, and a team that stays accountable for them." },
  { title: "Flexibility", body: "Understanding what each client actually needs." },
  { title: "Responsiveness", body: "A receptive approach to customer needs." },
  { title: "Collaborative teamwork", body: "Open exchange of information and resources with our clients." },
];

const quickStats = [
  { value: `Est. ${siteSettings.establishedYear}`, label: "Founded" },
  { value: "25+ yrs", label: "In operation" },
  { value: `${services.length}`, label: "Engineering disciplines" },
];

export default function CompanyPage() {
  return (
    <>
      {/* Rebuilt 2026-09-16 — the shared PageHero is hard-centred, which
          was the single biggest contributor to "too center aligned...
          boring and unorganized" on this specific page (client feedback).
          This page gets its own asymmetric hero instead: copy + a real
          stat row on the left, a photo with an ambient blue glow on the
          right, so the page opens with a face and a fact, not just a
          centred paragraph. */}
      <section className="relative overflow-hidden border-b border-(--color-line) bg-soft-glow pt-10 pb-20 sm:pt-14 sm:pb-24">
        <div
          aria-hidden="true"
          className="absolute -right-24 top-16 h-[26rem] w-[26rem] rounded-full bg-(--color-brand-blue-soft)/25 blur-[100px]"
        />
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company" }]} visuallyHidden />
          <div className="mt-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue)" />
                  <p className="text-label font-semibold uppercase tracking-[0.16em] text-(--color-brand-blue)">
                    About Airtech
                  </p>
                </div>
                <h1 className="mt-6 max-w-[20ch] font-display text-display-l font-semibold leading-[1.04] tracking-[-0.018em] text-balance">
                  An engineering company built around one idea:{" "}
                  <span className="text-(--color-brand-blue)">reliability matters</span>.
                </h1>
                <span aria-hidden="true" className="mt-5 block h-1 w-16 rounded-full bg-(--color-brand-blue-vivid)" />
                <p className="mt-7 max-w-[42rem] text-body-l text-(--color-steel) leading-relaxed">
                  Airtech is a Nepal-based engineering and MEP company specialising in HVAC,
                  mechanical, electrical, PHE, fire-protection and ELV solutions. Established in{" "}
                  {siteSettings.establishedYear}, the company has grown from an HVAC specialist into a
                  comprehensive MEP solutions provider serving commercial, industrial, healthcare,
                  hospitality, pharmaceutical and institutional sectors, combining engineering,
                  procurement, installation, testing, commissioning and after-sales support under one
                  umbrella.
                </p>
                <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-(--color-line) pt-8">
                  {quickStats.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="font-display text-2xl font-bold text-(--color-brand-blue)">{s.value}</dd>
                      <p className="mt-1 text-xs uppercase tracking-[0.1em] text-(--color-steel)">{s.label}</p>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="crop-frame relative aspect-[4/5] w-full max-w-md overflow-hidden border border-(--color-line-strong) text-(--color-brand-blue) lg:ml-auto">
                <span className="crop-tick-tl" />
                <span className="crop-tick-br" />
                <Image
                  src="/images/team/team-strategy-meeting.jpg"
                  alt="The Airtech leadership team in a strategy meeting at the Kathmandu office"
                  fill
                  sizes="(min-width: 1024px) 32vw, 90vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Mission/Vision was two paragraphs side by side with no visual
          anchor — the plainest "texty" section on the site. Grounded now in
          a real portrait of the MD rather than left as bare text; an
          asymmetric split (photo + stacked statements), not a card. */}
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="crop-frame relative aspect-[4/5] w-full overflow-hidden border border-(--color-line-strong) text-(--color-brand-blue) lg:sticky lg:top-28">
            <span className="crop-tick-tl" />
            <span className="crop-tick-br" />
            <Image
              src="/images/team/founder-manoj-bhansali.jpg"
              alt="Manoj Bhansali, Managing Director of Airtech Industries"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center grayscale-[10%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-(--color-blue-deep)/80 via-transparent to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-display text-title font-semibold text-white">Manoj Bhansali</p>
              <p className="mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/70">
                Managing Director
              </p>
            </div>
          </div>
          {/* 2026-10-01: the client shortened both statements and asked for
              the design around them to be "slightly more striking" — each
              is now set as a display-size statement (not body copy under a
              heading), the mission's four value words picked out in blue,
              the vision as a pull quote behind an oversized quote mark. Text verbatim from
              source-material/CLIENT_LIST_AND_MISSION_2026-10-01.md. */}
          <div className="flex flex-col justify-center gap-14 lg:gap-20">
            <Reveal>
              <p className="flex items-center gap-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
                <span className="tabular-nums">01</span>
                <span aria-hidden="true" className="h-px w-8 bg-(--color-brand-blue)" />
                Our mission
              </p>
              <p className="mt-6 font-display text-display-m font-semibold leading-[1.18] tracking-[-0.014em] text-balance text-(--color-ink)">
                Airtech delivers complete, engineered and customised technology solutions that exceed
                expectations, building a reputation for{" "}
                <span className="text-(--color-brand-blue)">integrity</span>,{" "}
                <span className="text-(--color-brand-blue)">reliability</span>,{" "}
                <span className="text-(--color-brand-blue)">responsiveness</span> and{" "}
                <span className="text-(--color-brand-blue)">teamwork</span>.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="flex items-center gap-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
                <span className="tabular-nums">02</span>
                <span aria-hidden="true" className="h-px w-8 bg-(--color-brand-blue)" />
                Our vision
              </p>
              <blockquote className="relative mt-6">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-10 right-0 select-none font-display text-[9rem] leading-none text-(--color-brand-blue-vivid)/15"
                >
                  &rdquo;
                </span>
                <p className="relative font-display text-display-m font-semibold leading-[1.18] tracking-[-0.014em] text-balance text-(--color-ink)">
                  &ldquo;To be our customers&rsquo;{" "}
                  <span className="text-(--color-brand-blue)">partner for life</span>, earning their
                  loyalty by listening, anticipating and creating value.&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Core values — rebuilt 2026-09-28 ("looks very AI made"): the
          icon-in-a-circle cards with hover lift were the generic template
          pattern. Now an editorial two-column layout: heading on the left,
          six numbered values on hairlines on the right. */}
      <Section tone="raised">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
              What we value
            </p>
            <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.08] text-balance text-(--color-ink)">
              Our core values.
            </h2>
            <p className="mt-5 max-w-sm text-body leading-relaxed text-(--color-steel)">
              Six commitments that shape how Airtech engineers, installs and supports every system.
            </p>
          </div>
          <ol className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
            {coreValues.map((d, i) => (
              <li key={d.title} className="border-t border-(--color-line-strong)">
                <Reveal delay={i * 0.05} className="flex gap-5 py-6">
                  <span className="pt-1 font-mono text-[0.6875rem] font-medium tracking-[0.14em] text-(--color-brand-blue)">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-title font-semibold leading-snug text-(--color-ink)">{d.title}</h3>
                    <p className="mt-1.5 text-small leading-relaxed text-(--color-steel)">{d.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <SectionHeader align="left" eyebrow="More about Airtech" heading="History, people and credentials." />
        <div className="mt-10 border-t border-(--color-line)">
          {companyPages.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.05}>
              <Link
                href={p.href}
                className="group relative grid grid-cols-1 gap-1 overflow-hidden border-b border-(--color-line) py-5 pl-5 pr-2 transition-colors hover:bg-(--color-paper-raised) sm:grid-cols-[16rem_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-(--color-brand-blue) transition-transform duration-300 group-hover:scale-y-100"
                />
                <h3 className="font-display text-title font-semibold leading-tight group-hover:text-(--color-brand-blue) transition-colors">
                  {p.label}
                </h3>
                <p className="text-sm text-(--color-steel)">{p.description}</p>
                <span
                  aria-hidden="true"
                  className="hidden text-(--color-brand-blue) transition-transform duration-300 group-hover:translate-x-1 sm:block"
                >
                  &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
