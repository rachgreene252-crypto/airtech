import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "Leadership",
  description: "The people behind Airtech Industries' engineering delivery.",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Rebuilt 2026-10-07 (company section "bland and boring"): the MD gets a
// proper portrait feature instead of a 128px thumbnail, the second leader a
// monogram instead of a dashed "photo pending" box, and the page closes on
// the whole team. No bios are invented: none have been supplied.
export default function LeadershipPage() {
  const [lead, ...others] = team;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Leadership" },
        ]}
        eyebrow="Leadership"
        heading="The people behind Airtech's engineering delivery."
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          {lead && (
            <Reveal>
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[6px]">
                  <Image
                    src="/images/team/founder-at-work.jpg"
                    alt={`${lead.name}, ${lead.role} of Airtech Industries`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
                    {lead.role}
                  </p>
                  <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.04] tracking-[-0.02em] text-(--color-ink)">
                    {lead.name}
                  </h2>
                  <span aria-hidden="true" className="mt-5 block h-1 w-14 rounded-full bg-(--color-brand-blue-vivid)" />
                  <p className="mt-6 max-w-md text-body-l leading-relaxed text-(--color-steel)">
                    Leads Airtech Industries, the HVAC specialist founded in 2000 that grew into an
                    integrated MEP engineering partner.
                  </p>
                </div>
              </div>
            </Reveal>
          )}

          {others.length > 0 && (
            <ul className="mt-16 grid grid-cols-1 gap-5 border-t border-(--color-line) pt-12 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((person, i) => (
                <li key={person.id}>
                  <Reveal delay={i * 0.06}>
                    <div className="flex items-center gap-5 rounded-[6px] border border-(--color-line) bg-(--color-paper) p-6">
                      {person.photo ? (
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
                          <Image src={person.photo.src} alt={person.photo.alt} fill sizes="80px" className="object-cover" />
                        </div>
                      ) : (
                        <span
                          aria-hidden="true"
                          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-(--color-brand-blue) font-display text-2xl font-semibold text-white"
                        >
                          {initials(person.name)}
                        </span>
                      )}
                      <div>
                        <h3 className="font-display text-title font-semibold text-(--color-ink)">{person.name}</h3>
                        <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-(--color-brand-blue)">
                          {person.role}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* The wider team */}
      <section className="relative isolate overflow-hidden bg-(--color-blue-deep) text-white">
        <Image
          src="/images/team/anniversary-team.jpg"
          alt="The Airtech team at the company's 25th anniversary"
          fill
          sizes="100vw"
          className="-z-10 object-cover object-[center_65%]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-(--color-blue-deep) via-(--color-blue-deep)/55 to-(--color-blue-deep)/10" />
        <Container className="flex min-h-[28rem] flex-col justify-end py-14 sm:min-h-[34rem] sm:py-16">
          <Reveal>
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue-soft)">
              The wider team
            </p>
            <h2 className="mt-4 max-w-[22ch] font-display text-display-l font-semibold leading-[1.06] text-balance">
              Engineers, supervisors and technicians, one accountable team.
            </h2>
            <div className="mt-8">
              <ButtonLink href="/company/careers" size="lg">
                Join the team
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
