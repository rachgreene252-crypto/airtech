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
        <div className="max-w-2xl border-l border-(--color-line) pl-8 space-y-14">
          {milestones.map((m) => (
            <div key={m.year} className="relative">
              <span className="absolute -left-[41px] top-1 h-2 w-2 rounded-full bg-(--color-signal)" />
              <p className="font-mono text-sm text-(--color-signal)">{m.year}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold">{m.title}</h2>
              <p className="mt-3 text-(--color-steel) leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
