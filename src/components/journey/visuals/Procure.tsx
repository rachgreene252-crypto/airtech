import { partners } from "@/content/certifications";

/**
 * Journey step 3 — Procure. A short strip of equipment-partner marks under
 * "Trusted equipment partners" — no "authorised dealer/distributor" wording
 * (docs/AIRTECH_OPEN_DECISIONS.md #10). No partner logo assets have been
 * supplied yet, so partners render as clean text chips rather than
 * BluePlaceholder image boxes.
 */
export function Procure({ active: _active }: { active: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-start justify-center gap-4 px-2" aria-hidden="true">
      <p className="font-sans text-(--text-label) font-medium text-(--color-brand-blue-soft)">
        Trusted equipment partners
      </p>
      <div className="flex flex-wrap gap-3">
        {partners.map((partner) => (
          <span
            key={partner.id}
            className="border border-(--color-brand-blue-soft)/50 px-4 py-2 font-display text-lg text-(--color-brand-blue)"
          >
            {partner.name}
          </span>
        ))}
      </div>
    </div>
  );
}
