import type { Certification, Partner } from "./types";

/**
 * Certification badges appear on the 2025 brochure back cover (UKAS-accredited,
 * URS-certified) but current validity has not been confirmed by management —
 * Master Source of Truth §11 explicitly requires confirmation before use.
 * status: "source_only" keeps these out of live rendering (see the
 * Certifications section component, which only renders "verified" /
 * "client_confirmed" entries) until certificate copies are supplied.
 * See docs/OPEN_DECISIONS.md #2.
 */
export const certifications: Certification[] = [
  { id: "iso-9001", name: "ISO 9001:2015", issuingBody: "URS (UKAS-accredited)", status: "source_only" },
  { id: "iso-14001", name: "ISO 14001:2015", issuingBody: "URS (UKAS-accredited)", status: "source_only" },
  { id: "iso-45001", name: "ISO 45001:2018", issuingBody: "URS (UKAS-accredited)", status: "source_only" },
];

/**
 * Mitsubishi and Midea are the two manufacturer relationships the client
 * questionnaire names directly (§8.6) — the same answer explicitly states the
 * website must not be defined by these brands. relationshipNote is
 * deliberately neutral ("equipment used in Airtech installations") rather
 * than "authorized dealer/distributor" wording, since that specific legal
 * relationship has not been confirmed. See docs/OPEN_DECISIONS.md #10.
 */
export const partners: Partner[] = [
  { id: "mitsubishi-electric", name: "Mitsubishi Electric", relationshipNote: "Equipment used in Airtech installations", status: "client_confirmed" },
  { id: "midea", name: "Midea", relationshipNote: "Equipment used in Airtech installations", status: "client_confirmed" },
];

export function getCertifications() {
  return certifications.filter((c) => c.status === "verified" || c.status === "client_confirmed");
}

export function getPartners() {
  return partners;
}
