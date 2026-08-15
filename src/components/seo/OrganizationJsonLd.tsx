import { siteSettings } from "@/content/site-settings";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.airtech.com.np";

/**
 * Only verified/client-confirmed fields are encoded — no employee counts,
 * project counts, ratings or phone numbers (phone is unresolved, see
 * docs/OPEN_DECISIONS.md #1). Publishing unverified figures as structured
 * data would index misinformation just as surely as printing it on the page.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSettings.companyName,
    alternateName: siteSettings.brandName,
    url: siteUrl,
    email: siteSettings.primaryEmail,
    foundingDate: siteSettings.establishedYear,
    slogan: siteSettings.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSettings.headOffice,
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
  };

  return (
    <script
      type="application/ld+json"
       
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
