import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { siteSettings } from "@/content/site-settings";

export const metadata: Metadata = {
  title: "Contact",
  description: "Airtech's head office, email, and how to reach the engineering team for a new project or existing-system service request.",
};

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
              <h2 className="font-sans text-label font-medium text-(--color-steel)">
                Head office
              </h2>
              <p className="mt-2 text-lg text-(--color-ink)">{siteSettings.headOffice}</p>
            </div>
            <div>
              <h2 className="font-sans text-label font-medium text-(--color-steel)">Email</h2>
              <a
                href={`mailto:${siteSettings.primaryEmail}`}
                className="mt-2 block text-lg text-(--color-signal) hover:underline"
              >
                {siteSettings.primaryEmail}
              </a>
            </div>
            <div>
              <h2 className="font-sans text-label font-medium text-(--color-steel)">
                Response time
              </h2>
              <p className="mt-2 text-lg text-(--color-ink)">Within one business day for qualified enquiries.</p>
            </div>
          </div>

          <div className="border-t border-(--color-line) pt-10 lg:border-t-0 lg:border-l lg:pl-16 lg:pt-0">
            <h2 className="font-display text-2xl font-semibold">Have a project in mind?</h2>
            <p className="mt-3 max-w-sm text-(--color-steel) leading-relaxed">
              Tell us what you&apos;re building (discipline, project stage, location) and we&apos;ll come
              back with the right engineering contact.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contact/project-enquiry" size="lg">
                Discuss Your Project
              </ButtonLink>
            </div>

            <h2 className="mt-12 font-display text-2xl font-semibold">Existing customer?</h2>
            <p className="mt-3 max-w-sm text-(--color-steel) leading-relaxed">
              For AMC and service requests, see{" "}
              <a href="/service-support" className="text-(--color-signal) hover:underline">
                Service &amp; Support
              </a>{" "}
              or select &ldquo;AMC / Service &amp; Support&rdquo; on the project enquiry form.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
