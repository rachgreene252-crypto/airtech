import Link from "next/link";
import type { Route } from "next";
import Image from "@/components/ui/Image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ClipReveal } from "@/components/ui/ClipReveal";
import { siteSettings } from "@/content/site-settings";

/**
 * 05 — WHY CLIENTS RETURN (2026-10-29). Replaces ProofBar + WhyAirtech:
 * three dated facts that are client-confirmed (est. 2000, 25+ years, MEP
 * from 2013 — docs/AIRTECH_OPEN_DECISIONS.md #3) beside the team that
 * stands behind them, then three reasons carried by named, published
 * projects rather than derived counts. The logo marquee (TrustedBy)
 * follows directly as the same chapter.
 */
const FACTS = [
  { value: "25+", label: "Years engineering buildings in Nepal" },
  { value: siteSettings.establishedYear, label: "Established" },
  { value: "2013", label: "Integrated MEP operations began" },
];

const REASONS = [
  {
    title: "One team holds every system",
    body: "HVAC, electrical, PHE, fire protection, ELV and BMS designed, installed and commissioned by one accountable team, so nothing falls between contractors.",
  },
  {
    title: "Trusted by international hotel brands",
    body: "Hyatt Regency, Hyatt Centric, Fairfield by Marriott, Hilton, Dusit Princess and The Soaltee.",
    href: "/projects?industry=hospitality#explore",
  },
  {
    title: "Built for buildings that can't stop",
    body: "Hospitals, the Parliament Building and the British Embassy, where systems run around the clock.",
    href: "/projects?industry=healthcare#explore",
  },
];

export function Credibility() {
  return (
    <section aria-labelledby="credibility-heading" className="border-t border-(--color-line) bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <ClipReveal className="relative aspect-[4/3] overflow-hidden rounded-[3px] lg:sticky lg:top-28">
              <Image
                src="/images/team/anniversary-team.jpg"
                alt="The Airtech team gathered for the company's 25th anniversary"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-0 left-0 bg-white px-4 py-2.5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-(--color-ink)">
                The Airtech team · 25 years
              </span>
            </ClipReveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">
                05 · Why clients return
              </p>
              <h2
                id="credibility-heading"
                className="mt-4 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.018em] text-balance text-(--color-ink)"
              >
                Reliability is the whole job.
              </h2>
            </Reveal>

            <dl className="mt-10 grid grid-cols-3 border-y border-(--color-line)">
              {FACTS.map((f) => (
                <div key={f.label} className="border-l border-(--color-line) py-6 pl-4 first:border-l-0 first:pl-0 sm:pl-6">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display text-[2rem] font-semibold leading-none tracking-[-0.03em] text-(--color-brand-blue-vivid) tabular-nums sm:text-[2.75rem]">
                    {f.value}
                  </dd>
                  <dd aria-hidden="true" className="mt-2.5 text-small leading-snug text-(--color-steel)">
                    {f.label}
                  </dd>
                </div>
              ))}
            </dl>

            <ol className="mt-4">
              {REASONS.map((r, i) => (
                <li key={r.title} className="border-b border-(--color-line) py-7">
                  <Reveal delay={i * 0.06}>
                    <div className="flex gap-5">
                      <span aria-hidden="true" className="pt-1 font-mono text-[0.75rem] tabular-nums text-(--color-brand-blue)">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-[1.25rem] font-semibold leading-snug text-(--color-ink)">{r.title}</h3>
                        <p className="mt-2 text-body leading-relaxed text-(--color-steel)">{r.body}</p>
                        {r.href && (
                          <Link
                            href={r.href as Route}
                            className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--color-brand-blue) hover:underline"
                          >
                            See the projects <span aria-hidden="true">&rarr;</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
