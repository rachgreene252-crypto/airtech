import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { industries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Discuss Your Project",
  description:
    "Tell Airtech about your HVAC, electrical, plumbing, fire-protection or integrated MEP project — our engineering team responds within one business day.",
};

export default function ProjectEnquiryPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
          { label: "Discuss Your Project" },
        ]}
        eyebrow="Project enquiry"
        heading="Discuss your project."
        description="Tell us what you're building. A member of Airtech's engineering team will respond within one business day."
      />
      <Section>
        <div className="max-w-2xl">
          <EnquiryForm industries={industries} />
        </div>
      </Section>
    </>
  );
}
