import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { siteSettings } from "@/content/site-settings";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Airtech's head office, email, careers contact, and how to reach the engineering team for a new project or existing-system service request.",
};

const EMAILS = [
  {
    label: "General & project enquiries",
    email: siteSettings.primaryEmail,
    note: "New projects, tenders, consultant queries and service requests.",
  },
  {
    label: "Careers",
    email: siteSettings.careersEmail,
    note: "Send your CV and the discipline you'd like to work in.",
  },
];

// Minimal per brief §14 — office info, email, project-enquiry CTA. No phone
// number (still unresolved between conflicting source documents, see
// docs/AIRTECH_OPEN_DECISIONS.md #1) and no WhatsApp (unconfirmed, #7) —
// neither is published until confirmed. No map — no address coordinates
// have been supplied to plot one honestly.
export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Get in touch"
        heading="Reach the engineering team."
      />
      <Section>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div className="space-y-10">
            <div>
              <h2 className="font-sans text-label font-medium text-(--color-steel)">Head office</h2>
              <p className="mt-2 text-lg text-(--color-ink)">{siteSettings.headOffice}</p>
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {EMAILS.map((item) => (
                <li key={item.email}>
                  <a
                    href={`mailto:${item.email}`}
                    className="group block h-full border border-(--color-line) bg-(--color-paper-raised) p-5 transition-colors hover:border-(--color-brand-blue-vivid)"
                  >
                    <span className="font-sans text-label font-medium text-(--color-steel)">{item.label}</span>
                    <span className="mt-2 block text-lg font-medium text-(--color-brand-blue) group-hover:underline">
                      {item.email}
                    </span>
                    <span className="mt-2 block text-small leading-relaxed text-(--color-steel)">{item.note}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div>
              <h2 className="font-sans text-label font-medium text-(--color-steel)">Response time</h2>
              <p className="mt-2 text-lg text-(--color-ink)">Within one business day for qualified enquiries.</p>
            </div>
          </div>

          <div className="border-t border-(--color-line) pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <h2 className="font-display text-2xl font-semibold">Have a project in mind?</h2>
            <p className="mt-3 max-w-sm leading-relaxed text-(--color-steel)">
              Tell us what you&apos;re building (discipline, project stage, location) and we&apos;ll come
              back with the right engineering contact.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contact/project-enquiry" size="lg">
                Inquire for Services
              </ButtonLink>
            </div>

            <h2 className="mt-12 font-display text-2xl font-semibold">Existing customer?</h2>
            <p className="mt-3 max-w-sm leading-relaxed text-(--color-steel)">
              For AMC and service requests, see{" "}
              <Link href="/service-support" className="text-(--color-brand-blue) hover:underline">
                Service &amp; Support
              </Link>{" "}
              or select &ldquo;AMC / Service &amp; Support&rdquo; on the enquiry form.
            </p>

            <h2 className="mt-12 font-display text-2xl font-semibold">Want to work with us?</h2>
            <p className="mt-3 max-w-sm leading-relaxed text-(--color-steel)">
              Email your CV to{" "}
              <a href={`mailto:${siteSettings.careersEmail}`} className="text-(--color-brand-blue) hover:underline">
                {siteSettings.careersEmail}
              </a>{" "}
              or read more on{" "}
              <Link href="/company/careers" className="text-(--color-brand-blue) hover:underline">
                Careers
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
