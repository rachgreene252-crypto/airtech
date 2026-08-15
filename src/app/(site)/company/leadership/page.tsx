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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((person) => (
            <div key={person.id} className="crop-frame border border-(--color-line) p-6">
              <h2 className="font-display text-xl font-semibold">{person.name}</h2>
              <p className="mt-1 font-mono text-xs tracking-[0.06em] uppercase text-(--color-signal)">
                {person.role}
              </p>
              {person.bio && <p className="mt-4 text-sm text-(--color-steel) leading-relaxed">{person.bio}</p>}
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-(--color-steel-soft)">
          Extended leadership biographies and photography are being finalised for publication.
        </p>
      </Section>
    </>
  );
}
