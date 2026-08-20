import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const companyPages = [
  { label: "History", href: "/company/history", description: "How Airtech grew from an HVAC specialist into an integrated MEP contractor." },
  { label: "Leadership", href: "/company/leadership", description: "The people behind Airtech's engineering delivery." },
  { label: "Quality & Certifications", href: "/company/quality-certifications", description: "Management system certification and equipment partners." },
  { label: "Careers", href: "/company/careers", description: "Engineers who want to work on projects that matter." },
] as const;

export const metadata: Metadata = {
  title: "About",
  description:
    "Airtech Industries is a Nepal-based engineering and MEP company specialising in HVAC, electrical, plumbing and fire-protection solutions.",
};

const drivers = [
  { title: "Result-oriented approach", body: "An efficient, can-do attitude on every project." },
  { title: "Integrity", body: "Taking responsibility for what we promise." },
  { title: "Excellence", body: "Through proper thinking, planning and implementation." },
  { title: "Flexibility", body: "Understanding what each client actually needs." },
  { title: "Responsiveness", body: "A receptive approach to customer needs." },
  { title: "Team work", body: "Open exchange of information and resources with our clients." },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Company" }]}
        eyebrow="About Airtech"
        heading="An engineering company built around one idea: reliability matters."
        description="Airtech is a Nepal-based engineering and MEP company specialising in HVAC, mechanical, electrical, plumbing and fire-protection solutions. Established in 2000, the company has grown from an HVAC specialist into a comprehensive MEP solutions provider serving commercial, industrial, healthcare, hospitality, pharmaceutical and institutional sectors — combining engineering, procurement, installation, testing, commissioning and after-sales support under one umbrella."
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionHeader eyebrow="Mission" heading="Customer for life." />
            <p className="mt-6 text-(--color-steel) leading-relaxed">
              Airtech strives to meet the needs of its customers by providing complete, engineered,
              innovative and customised technology solutions that constantly exceed expectations. The
              mission is to build a reputation for integrity, excellence, reliability, flexibility,
              responsiveness, innovative service and team work.
            </p>
          </div>
          <div>
            <SectionHeader eyebrow="Vision" heading="Built on customer focus." />
            <p className="mt-6 text-(--color-steel) leading-relaxed">
              Airtech&apos;s corporate vision is &ldquo;Customer for Life.&rdquo; Customer loyalty is
              earned by listening, anticipating requirements and working to create value — with growth,
              longevity and financial success following naturally from that focus.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <SectionHeader eyebrow="What drives us" heading="Our drivers." />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
          {drivers.map((d) => (
            <div key={d.title}>
              <h3 className="font-display text-xl font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm text-(--color-steel) leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="More about Airtech" heading="History, people and credentials." />
        <div className="mt-10 border-t border-(--color-line)">
          {companyPages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex flex-col gap-1.5 border-b border-(--color-line) py-6 transition-colors hover:bg-(--color-paper-raised) sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <h3 className="font-display text-2xl font-semibold leading-tight group-hover:text-(--color-blueprint) transition-colors">
                {p.label}
              </h3>
              <p className="text-sm text-(--color-steel) sm:max-w-md sm:text-right">{p.description}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
