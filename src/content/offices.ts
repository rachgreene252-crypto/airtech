import { siteSettings } from "./site-settings";
import type { VerificationStatus } from "./types";

/**
 * Airtech's offices. One record per office, rendered by the contact page
 * and the homepage "Offices" band, so a new office is a data change, not a
 * redesign.
 *
 * India (2026-10-29): Airtech M&E India LLP, Kolkata, published with the
 * details the client supplied. A future office is one more record here;
 * `published: false` keeps one off the site until it is ready. Fields left
 * undefined simply don't render.
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
    // Supplied by the client 2026-10-29 (WhatsApp), with the go-ahead to
    // publish.
    id: "india",
    country: "India",
    label: "Airtech M&E India LLP",
    city: "Kolkata",
    address: "Unit No. 306, Merlin Matrix, DN-10, Salt Lake City, Sector V, Kolkata 700091, West Bengal, India",
    email: "info@airtech.com.in",
    phone: "+91 33 46410853",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Merlin+Matrix+DN-10+Sector+V+Salt+Lake+Kolkata+700091",
    published: true,
    status: "client_confirmed",
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
