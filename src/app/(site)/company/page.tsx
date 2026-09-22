import type { Metadata } from "next";
import type { ReactNode } from "react";
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
const valueIcons = {
  integrity: (
    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
  ),
  excellence: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4" />
    </>
  ),
  reliability: <path d="M3 12h4l2-6 3 12 2-6h7" strokeLinejoin="round" />,
  flexibility: (
    <path d="M8 4L4 8l4 4M16 20l4-4-4-4M4 8h11a4 4 0 010 8" strokeLinejoin="round" />
  ),
  responsiveness: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" strokeLinejoin="round" />,
  teamwork: (
    <>
      <circle cx="8.5" cy="9" r="3" />
      <circle cx="16" cy="10.5" r="2.5" />
      <path d="M2.5 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M14.5 20c0-2.4 1.9-4.5 4.5-4.5s5 2.1 5 4.5" />
    </>
  ),
} as const;

const coreValues = [
  { title: "Integrity", body: "Taking responsibility for what we promise.", icon: valueIcons.integrity },
  { title: "Technical excellence", body: "Through proper thinking, planning and implementation.", icon: valueIcons.excellence },
  { title: "Reliability", body: "Systems that keep running, and a team that stays accountable for them.", icon: valueIcons.reliability },
  { title: "Flexibility", body: "Understanding what each client actually needs.", icon: valueIcons.flexibility },
  { title: "Responsiveness", body: "A receptive approach to customer needs.", icon: valueIcons.responsiveness },
  { title: "Collaborative teamwork", body: "Open exchange of information and resources with our clients.", icon: valueIcons.teamwork },
];

const quickStats = [
  { value: `Est. ${siteSettings.establishedYear}`, label: "Founded" },
  { value: "25+ yrs", label: "In operation" },
  { value: `${services.length}`, label: "Engineering disciplines" },
];

function ValueIcon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--color-brand-blue-tint) text-(--color-brand-blue)">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        {children}
      </svg>
    </span>
  );
}

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
                <h1 className="mt-6 max-w-[18ch] font-display text-display-xl font-semibold leading-[1.04] tracking-[-0.018em] text-balance">
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
                  className="object-cover"
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
              className="object-cover grayscale-[10%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-(--color-blue-deep)/80 via-transparent to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-display text-title font-semibold text-white">Manoj Bhansali</p>
              <p className="mt-0.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/70">
                Managing Director
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <div>
              <SectionHeader align="left" eyebrow="Mission" heading="Our mission." />
              <p className="mt-6 text-body-l text-(--color-steel) leading-relaxed">
                To deliver engineered, innovative and customised technology solutions through integrity,
                technical excellence, reliability, flexibility, responsiveness and collaborative
                teamwork. We are committed to understanding our customers&rsquo; needs, applying our
                expertise to every challenge, and continuously improving the way we serve.
              </p>
            </div>
            <div>
              <SectionHeader align="left" eyebrow="Vision" heading="Built on customer focus." />
              <p className="mt-6 text-body-l text-(--color-steel) leading-relaxed">
                Airtech&apos;s corporate vision is &ldquo;Customer for Life.&rdquo; Customer loyalty is
                earned by listening, anticipating requirements and working to create value, with growth,
                longevity and financial success following naturally from that focus.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Core values — was a plain centred header over a flat 3-col text
          list (no visual anchor per item, hence "boring"). Each value now
          gets a meaning-specific icon and its own bordered, hover-lit card
          so the grid reads as six distinct ideas, not one paragraph split
          six ways. */}
      <Section tone="raised">
        <SectionHeader align="left" eyebrow="What we value" heading="Our core values." />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06}>
              <div className="group h-full rounded-sm border border-(--color-line) bg-(--color-paper) p-6 transition-all duration-300 hover:-translate-y-1 hover:border-(--color-brand-blue-soft) hover:shadow-[0_16px_36px_-20px_rgba(0,142,209,0.45)]">
                <ValueIcon>{d.icon}</ValueIcon>
                <h3 className="mt-5 font-display text-xl font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm text-(--color-steel) leading-relaxed">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader align="left" eyebrow="More about Airtech" heading="History, people and credentials." />
        <div className="mt-10 border-t border-(--color-line)">
          {companyPages.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.05}>
              <Link
                href={p.href}
                className="group relative flex flex-col gap-1.5 overflow-hidden border-b border-(--color-line) py-6 pl-5 transition-colors hover:bg-(--color-paper-raised) sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-(--color-brand-blue) transition-transform duration-300 group-hover:scale-y-100"
                />
                <h3 className="font-display text-2xl font-semibold leading-tight group-hover:text-(--color-brand-blue) transition-colors">
                  {p.label}
                </h3>
                <p className="text-sm text-(--color-steel) sm:max-w-md sm:text-right">{p.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
