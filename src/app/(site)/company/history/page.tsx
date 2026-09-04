import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "History",
  description: "How Airtech grew from an HVAC specialist in 2000 into an integrated MEP engineering contractor.",
};

const milestones = [
  {
    year: "2000",
    title: "Established",
    body: "Airtech was established with a focus on Heating, Ventilation and Air Conditioning (HVAC) engineering solutions in Nepal.",
  },
  {
    year: "2013",
    title: "MEP division launched",
    body: "Airtech expanded beyond HVAC, launching its MEP division to provide integrated mechanical, electrical and plumbing solutions.",
  },
  {
    year: "Today",
    title: "Integrated engineering contractor",
    body: "Airtech operates as a comprehensive engineering and MEP contractor, with capabilities spanning HVAC, electrical, plumbing, fire protection, ventilation, water systems and security systems.",
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "History" },
        ]}
        eyebrow="Since 2000"
        heading="From HVAC specialist to integrated engineering partner."
      />
      <Section>
        <ol className="mx-auto max-w-xl space-y-11 border-l border-(--color-line-strong) pl-8">
          {milestones.map((m) => (
            <li key={m.year} className="relative">
              <span className="absolute -left-[2.55rem] top-1.5 h-2 w-2 rounded-full bg-(--color-brand-blue)" />
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
                {m.year}
              </p>
              <h2 className="mt-2 font-display text-title font-normal text-(--color-ink)">{m.title}</h2>
              <p className="mt-2.5 text-body leading-relaxed text-(--color-steel)">{m.body}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
