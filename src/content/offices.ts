import { siteSettings } from "./site-settings";
import type { VerificationStatus } from "./types";

/**
 * Airtech's offices. One record per office, rendered by the contact page
 * and the homepage "Offices" band, so a new office is a data change, not a
 * redesign.
 *
 * India (2026-10-29): Airtech has opened an office in India, but no address,
 * phone, email, city or launch date has been supplied yet, so every detail
 * field is left undefined rather than guessed. `published: false` keeps the
 * office off the public site until Airtech confirms the details and is ready
 * to announce it. To launch: fill in the fields, set `status:
 * "client_confirmed"` and `published: true`. Any field still undefined
 * simply doesn't render. See docs/AIRTECH_OPEN_DECISIONS.md #32.
 */
export interface Office {
  id: string;
  country: string;
  /** Shown as the office's name, e.g. "Head office". */
  label: string;
  city?: string;
  address?: string;
  email?: string;
  phone?: string;
  /** Link to the office on a map provider (opens in a new tab). */
  mapUrl?: string;
  /** One or two sentences on what the office covers. Must be sourced. */
  regionNote?: string;
  published: boolean;
  status: VerificationStatus;
}

export const offices: Office[] = [
  {
    id: "kathmandu",
    country: "Nepal",
    label: "Head office",
    city: "Kathmandu",
    address: siteSettings.headOffice,
    email: siteSettings.primaryEmail,
    // Phone deliberately omitted — docs/AIRTECH_OPEN_DECISIONS.md #1.
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sharada+Complex+Panchyan+Marg+Thapathali+Kathmandu",
    regionNote: "Engineering, project delivery and service for projects across Nepal.",
    published: true,
    status: "client_confirmed",
  },
  {
    id: "india",
    country: "India",
    label: "India office",
    // city, address, email, phone, mapUrl, regionNote: awaiting Airtech.
    published: false,
    status: "needs_verification",
  },
];

/**
 * Offices visible on the public site. Setting NEXT_PUBLIC_SHOW_UNPUBLISHED_OFFICES=1
 * renders unpublished ones too, for previewing the layout before launch.
 */
export function getPublishedOffices() {
  const preview = process.env.NEXT_PUBLIC_SHOW_UNPUBLISHED_OFFICES === "1";
  return offices.filter((o) => o.published || preview);
}
