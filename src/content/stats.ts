import type { VerificationStatus } from "./types";

/**
 * Homepage proof-bar figures. "25+ years" / "Est. 2000" / "MEP since 2013"
 * are the Master Source of Truth's confirmed company figures (also used in
 * Opening.tsx's eyebrow). Team size is deliberately included but gated:
 * docs/AIRTECH_OPEN_DECISIONS.md marks "300+" as needs_verification (the
 * 25th-anniversary photo is "consistent with but not proof of" that figure)
 * — getProofStats() filters it out until management confirms, so the live
 * proof bar renders only the three confirmed figures rather than a bare,
 * unverified headcount claim.
 */
export interface ProofStat {
  id: string;
  value: string;
  label: string;
  status: VerificationStatus;
}

export const proofStats: ProofStat[] = [
  { id: "years", value: "25+", label: "Years of engineering experience", status: "client_confirmed" },
  { id: "established", value: "2000", label: "Established in Nepal", status: "client_confirmed" },
  { id: "mep-since", value: "2013", label: "MEP operations commenced", status: "client_confirmed" },
  { id: "team-size", value: "300+", label: "Dedicated team members", status: "needs_verification" },
];

export function getProofStats() {
  return proofStats.filter((s) => s.status === "verified" || s.status === "client_confirmed");
}
