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
        <div>
          {team.map((person) => (
            <div key={person.id} className="border-t border-(--color-line) py-8 first:border-t-0">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold">{person.name}</h2>
              <p className="mt-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
                {person.role}
              </p>
              {person.bio && <p className="mt-4 max-w-2xl text-sm text-(--color-steel) leading-relaxed">{person.bio}</p>}
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-(--color-steel)">
          Extended leadership biographies and photography are being finalised for publication.
        </p>
      </Section>
    </>
  );
}
