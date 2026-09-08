import type { Certification } from "./types";

/**
 * ISO / management-system certifications.
 *
 * The 2025 brochure back cover shows ISO 9001:2015, ISO 14001:2015 and
 * ISO 45001:2018 (URS, UKAS-accredited), but current validity and the
 * certificate letters themselves have not been supplied — Master Source of
 * Truth §11 and docs/AIRTECH_OPEN_DECISIONS.md #2 require confirmation
 * before anything is published.
 *
 * These entries are staged, not live: `getCertifications()` only returns
 * "verified" / "client_confirmed" rows, so nothing renders yet. When Airtech
 * supplies each ISO letter, drop the scan into /public/documents/certifications/,
 * set `documentUrl` to its path, add `validUntil`, and change `status` to
 * "client_confirmed" — the Quality & Certifications page then shows the
 * certificate with a link to the document. Do not change status without the
 * actual letter.
 */
export const certifications: Certification[] = [
  {
    id: "iso-9001",
    name: "ISO 9001:2015",
    issuingBody: "URS (UKAS-accredited)",
    status: "source_only",
    // documentUrl: "/documents/certifications/iso-9001.pdf",
    // validUntil: "",
  },
  {
    id: "iso-14001",
    name: "ISO 14001:2015",
    issuingBody: "URS (UKAS-accredited)",
    status: "source_only",
  },
  {
    id: "iso-45001",
    name: "ISO 45001:2018",
    issuingBody: "URS (UKAS-accredited)",
    status: "source_only",
  },
];

export function getCertifications() {
  return certifications.filter((c) => c.status === "verified" || c.status === "client_confirmed");
}

/**
 * The standards Airtech works to, shown on the Quality page regardless of
 * whether the signed certificate letter has been supplied yet. The standard
 * name + issuing body are source-backed (2025 brochure back cover); the
 * `documentUrl` / `validUntil` gate stays exactly as above — a letter only
 * appears once its scan is dropped into /public/documents/certifications/.
 */
export function getCertificationStandards() {
  return certifications;
}
