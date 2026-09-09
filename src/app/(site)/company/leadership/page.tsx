import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { team } from "@/content/team";

export const metadata: Metadata = { title: "Leadership" };

export default function LeadershipPage() {
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
      <Section>
        <div className="mx-auto max-w-xl">
          {team.map((person) => (
            <div
              key={person.id}
              className="flex flex-col items-center gap-5 border-t border-(--color-line) py-10 text-center first:border-t-0 sm:flex-row sm:items-start sm:gap-8 sm:text-left"
            >
              {person.photo ? (
                <div className="crop-frame relative h-32 w-32 shrink-0 overflow-hidden border border-(--color-line-strong) text-(--color-brand-blue) grayscale-[15%]">
                  <span className="crop-tick-tl" />
                  <span className="crop-tick-br" />
                  <Image
                    src={person.photo.src}
                    alt={person.photo.alt}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-32 w-32 shrink-0 items-center justify-center border border-dashed border-(--color-line-strong) font-mono text-[0.65rem] uppercase tracking-[0.1em] text-(--color-steel-soft)"
                >
                  Photo pending
                </div>
              )}
              <div>
                <h2 className="font-display text-display-m font-normal text-(--color-ink)">{person.name}</h2>
                <p className="mt-2 font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
                  {person.role}
                </p>
                {person.bio && (
                  <p className="mx-auto mt-4 max-w-lg text-small leading-relaxed text-(--color-steel) sm:mx-0">
                    {person.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
          <p className="mt-10 border-t border-(--color-line) pt-8 text-center text-small text-(--color-steel)">
            Extended leadership biographies are being finalised for publication.
          </p>
        </div>
      </Section>
    </>
  );
}
