import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { industries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Inquire for Services",
  description:
    "Tell Airtech about your HVAC, electrical, PHE, fire-protection, ELV or integrated MEP project. Our engineering team responds within one business day.",
};

export default function ProjectEnquiryPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
          { label: "Inquire for Services" },
        ]}
        eyebrow="Project enquiry"
        heading="Inquire for services."
        description="Tell us what you're building. A member of Airtech's engineering team will respond within one business day."
      />
      <Section>
        <div className="mx-auto max-w-2xl">
          <EnquiryForm industries={industries} />
        </div>
      </Section>
    </>
  );
}
