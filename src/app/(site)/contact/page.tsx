import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { industries } from "@/content/industries";
import { siteSettings } from "@/content/site-settings";

export const metadata: Metadata = {
  title: "Discuss Your Project",
  description:
    "Tell Airtech about your HVAC, electrical, plumbing, fire-protection or integrated MEP project — our engineering team responds within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Get in touch"
        heading="Discuss your project."
        description="Tell us what you're building. A member of Airtech's engineering team will respond within one business day."
      />
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
          <EnquiryForm industries={industries} />
          <aside className="lg:pl-10 lg:border-l border-(--color-line) space-y-8">
            <div>
              <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-(--color-steel)">
                Head office
              </h2>
              <p className="mt-2 text-(--color-ink)">{siteSettings.headOffice}</p>
            </div>
            <div>
              <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-(--color-steel)">Email</h2>
              <a
                href={`mailto:${siteSettings.primaryEmail}`}
                className="mt-2 block text-(--color-blueprint) hover:underline"
              >
                {siteSettings.primaryEmail}
              </a>
            </div>
            <div>
              <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-(--color-steel)">
                Response time
              </h2>
              <p className="mt-2 text-(--color-ink)">Within one business day for qualified enquiries.</p>
            </div>
            <div>
              <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-(--color-steel)">
                Existing customer?
              </h2>
              <p className="mt-2 text-(--color-steel)">
                For AMC and service requests, select &ldquo;AMC / Service &amp; Support&rdquo; in the form —
                see our{" "}
                <a href="/service-support" className="text-(--color-blueprint) hover:underline">
                  Service &amp; Support
                </a>{" "}
                page for details.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
