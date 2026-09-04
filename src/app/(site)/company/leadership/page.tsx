import type { Metadata } from "next";
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
              className="border-t border-(--color-line) py-8 text-center first:border-t-0"
            >
              <h2 className="font-display text-display-m font-normal text-(--color-ink)">{person.name}</h2>
              <p className="mt-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
                {person.role}
              </p>
              {person.bio && (
                <p className="mx-auto mt-4 max-w-lg text-small leading-relaxed text-(--color-steel)">
                  {person.bio}
                </p>
              )}
            </div>
          ))}
          <p className="mt-10 border-t border-(--color-line) pt-8 text-center text-small text-(--color-steel)">
            Extended leadership biographies and photography are being finalised for publication.
          </p>
        </div>
      </Section>
    </>
  );
}
