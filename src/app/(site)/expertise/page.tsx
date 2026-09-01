import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Airtech's engineering disciplines: HVAC, Electrical, Plumbing & Public Health, Fire Protection, ELV/Security, BMS/Systems Integration and Engineering/Advisory.",
};

const FACTS = [
  { value: "07", label: "Engineering disciplines, coordinated as one" },
  { value: "01", label: "Practice — not a chain of sub-contractors" },
  { value: "EST. 2000", label: "Delivering integrated MEP in Nepal" },
];

// An engineering index, not the homepage repeated (brief §08): a centered
// editorial opening, then large numbered discipline rows — sheet reference,
// name, scope line — that light up on interaction rather than a grid of boxes.
export default function ExpertisePage() {
  return (
    <>
      <section className="border-b border-(--color-line) bg-site-texture pt-8 pb-16 sm:pt-12 sm:pb-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Expertise" }]}
              className="[&_ol]:justify-center"
            />
            <p className="mt-9 font-sans text-label font-medium tracking-[0.01em] text-(--color-brand-blue)">
              Engineering disciplines
            </p>
            <h1 className="mt-4 font-display text-display-l font-semibold leading-[1.03] tracking-[-0.018em] text-balance">
              Every discipline a complex building needs, under one team.
            </h1>
            <p className="mx-auto mt-6 max-w-[44rem] text-lg text-(--color-steel) leading-relaxed">
              Airtech coordinates HVAC, electrical, plumbing, fire protection, ELV and
              building-systems integration as a single engineering practice — so responsibility
              for how systems work together never falls between contractors.
            </p>
          </div>

          <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-1 border-l border-t border-(--color-line-strong) sm:grid-cols-3">
            {FACTS.map((fact) => (
              <div
                key={fact.value}
                className="border-b border-r border-(--color-line-strong) px-6 py-6 text-center"
              >
                <dt className="font-display text-3xl font-semibold text-(--color-ink)">
                  {fact.value}
                </dt>
                <dd className="mt-2 text-small leading-relaxed text-(--color-steel)">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container>
       <div className="mx-auto max-w-6xl">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.04}>
            <Link
              href={`/expertise/${service.slug}`}
              className="group relative block overflow-hidden border-t border-(--color-line) transition-colors last:border-b hover:bg-(--color-paper-raised)"
            >
              {/* Sheet-reference watermark — always faint, stronger on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none font-display text-[6rem] font-semibold leading-none text-(--color-brand-blue)/[0.045] transition-colors duration-300 group-hover:text-(--color-brand-blue)/[0.1] sm:text-[9rem]"
              >
                {service.disciplineCode}
              </span>

              <div className="relative grid items-baseline gap-x-8 gap-y-4 py-9 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:py-11 lg:py-12">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-(--color-steel-soft)">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex min-w-[3.25rem] items-center justify-center border border-(--color-line-strong) px-2.5 py-1 font-mono text-xs font-semibold text-(--color-brand-blue) transition-colors group-hover:border-(--color-brand-blue)">
                    {service.disciplineCode}
                  </span>
                </div>

                <div className="relative z-10">
                  <h2 className="font-display text-3xl font-semibold leading-[1.0] tracking-[-0.015em] text-balance transition-colors group-hover:text-(--color-brand-blue) sm:text-4xl lg:text-[2.75rem]">
                    {service.name}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-(--color-steel) sm:text-base">
                    {service.homeSummary}
                  </p>
                  {service.subServices.length > 0 && (
                    <p className="mt-4 font-sans text-label text-(--color-steel-soft)">
                      {service.subServices.slice(0, 5).join("  ·  ")}
                    </p>
                  )}
                </div>

                <span className="relative z-10 hidden items-center gap-2 self-center font-sans text-label font-medium text-(--color-brand-blue) sm:flex">
                  <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[8rem] group-hover:opacity-100">
                    View discipline
                  </span>
                  <span aria-hidden="true" className="text-xl transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
       </div>
      </Container>
    </>
  );
}
