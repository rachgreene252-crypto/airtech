# Source Index

Date: 2026-08-16. Every file actually present in `source-material/` as of this date, read in full
(text extraction for `.docx`, `python-pptx` shape/table/chart extraction + direct image inspection
for `.pptx`, page-rendered image inspection for `.pdf` — the brochure PDF has **no extractable text
layer at all**, confirmed via `pdftotext`; every brochure fact below came from viewing rendered
page images, not grep). This supersedes the source list in `docs/IMPLEMENTATION_AUDIT.md` §1, which
predates the `.pptx` being added and mislabeled which file was the completed questionnaire.

## Files present

| # | Filename | Type | Date/version | Authority level (per Master Source of Truth §1) |
|---|---|---|---|---|
| 1 | `AIRTECH_WEBSITE_MASTER_SOURCE_OF_TRUTH_v1.docx` | docx | v1.0, 10 Aug 2026 | Controlling document — consolidates the others, assigns verification status |
| 2 | `AIRTECH WEBSITE REDESIGN.docx` | docx | Completed 10 Aug 2026 | **This is the actual completed Client Discovery Questionnaire** (see correction below) — Level 1 |
| 3 | `Airtech_Client_Discovery_Questionnaire.docx` | docx | — | **Blank template, no answers** (see correction below) — not a content source |
| 4 | `Airtech Brochure 2025.pdf` | pdf, 44 pages, image-only | 2025 | Level 2 — company marketing material |
| 5 | `AIPL PROFILE - 2026.pptx` | pptx, 24 slides | 2026 | New this session — company profile presentation, referred to in conversation as "the 2026 presentation" |
| 6 | `Airtech Nepal Project Quotation.docx` | docx | — | Commercial quotation for *this website project itself* — not a company-fact source |

## Correction to prior audit: questionnaire provenance

`docs/IMPLEMENTATION_AUDIT.md` (previous session) states `Airtech_Client_Discovery_Questionnaire.docx`
was "Completed by Ishika Bhansali (Airtech), 10 Aug 2026." This is incorrect. Full-text extraction shows:

- `Airtech_Client_Discovery_Questionnaire.docx` — every "Answer" field is blank. It is the unused
  blank template.
- `AIRTECH WEBSITE REDESIGN.docx` — carries the actual answers, and is signed at the end:
  *"Person completing questionnaire: Ishika Bhansali / Date: 10 August 2026."* Its internal title
  is itself "AIRTECH WEBSITE REDESIGN / Client Discovery Questionnaire" — the filename is
  misleading, but the content confirms this is the completed questionnaire.

Important nuance the filename mismatch obscures: **this single document mixes two kinds of content.**
Direct, declarative answers (company name, establishment date, address, phone, positioning statement,
target customers, restrictions) read as genuine client input. A second layer of answers is visibly
a consultant/researcher filling gaps on Airtech's behalf — marked inline with `[CONFIRM]`,
`[MANAGEMENT TO SELECT FINAL FIVE]`, `Suggested ranking`, and explicit hedges like *"Rather than
inventing project details that aren't available publicly, I would populate the initial project
database with the following verified examples."* The Master Source of Truth already treats this
correctly in substance (its own verification ledger downgrades exactly these hedged answers), so
no content in `src/content/` needs to change — this is a provenance correction for future citation
accuracy, not a new content problem.

## AIPL PROFILE - 2026.pptx — full ingestion (new this session)

24 slides. Extracted via `python-pptx` (text, tables, embedded chart data) plus direct visual
inspection of the embedded photographs and reference letters (81 media files in the archive).

| Slide(s) | Content | Status |
|---|---|---|
| 1 | Cover | — |
| 2 | Mission (4 pillars: Integrity & Excellence, Reliability & Flexibility, Innovative Services & Teamwork, Responsive Services) | source_only |
| 3–4 | MEP expertise + services list (matches existing `src/content/services.ts` taxonomy closely) | source_only, consistent with existing content |
| 5 | Values (Customer Satisfaction, Quality Assurance, Expertise & Professionalism, Environmental Responsibility) | source_only |
| 6 | **Embedded chart, exact data**: yearly turnover FY2019/20–FY2025/26, NPR millions (see `AIRTECH_CONTENT_AUDIT.md` — gated, publication approval required) | source-supported / publication approval required |
| 7 | Single full-slide image (not yet characterized in detail) | source_only |
| 8–11 | "Our Landmark Projects" — 16 named projects with locations (full list in content audit) | source_only, several now corroborated by the reference letters below |
| 12–18 | "Our Clients" by sector: Pharmaceuticals & Laboratories, Hospitals (2 slides, ~25 names), Banks & Financial Institutions, Movie Theatres/Auditoriums/Studios, Telecom & Data Centres, Embassy & INGOs | source_only |
| 19–21 | **"Appreciation Certificates" — 9 real, dated, signed client reference letters**, embedded as photographed scans. Full transcription in `AIRTECH_CONTENT_AUDIT.md` §1. This is the single strongest piece of verifiable project evidence found in any source document. | source-supported / publication approval required (private correspondence, named individuals, some contract values) |
| 22–23 | "AIRTECH TEAM & 25th ANNIVERSARY CELEBRATION" — real photographs, stage backdrop reads "AIRTECH RELIABILITY MATTERS," visually consistent with a 2000+25=2025 anniversary | source_only (photos usable; no anniversary narrative text supplied) |
| 24 | Thank you / closing | — |

## Brochure 2025.pdf — re-verification this session

The prior session's claim that no real, individually-usable project photography exists is **not
accurate**. The brochure has no text layer (confirmed via `pdftotext`), but its "Our Landmark
Projects" section (pp. 39–43) is a clean grid of full-resolution, individually captioned
photographs — not flattened composites, and directly croppable. Viewed via page-rendered images:

- p. 39: Hotel Hilton Kathmandu (render, not a photo — flag as such if used), Dusit Princess
  Kathmandu, The Soaltee Kathmandu, Chandragiri Hills Resort Kathmandu, The Terraces Resort & Spa
  Kathmandu (**new name, not yet in `src/content/projects.ts`**), Radisson Hotel Kathmandu
- p. 40: Universal College of Medical Sciences Bhairahawa, Tiger Palace Resort Bhairahawa, Nepali
  Ghar Hotel Kathmandu (**new**), Sipradi Trading Kathmandu, Norvic International Hospital
  Kathmandu, Shanker Group Corporate Office Kathmandu
- Pages 41–43 not yet individually reviewed this session — same treatment (page-render + crop) will
  work; do this before final asset collection.
- p. 44 (back cover): ISO 9001:2015 / 14001:2015 / 45001:2018 badges (URS-certified, UKAS-accredited),
  confirms the brochure's phone numbers (977 1 5319999 / 5322776 / 5352599) and document reference
  code `AIPL/MEP/2025/01`.

This changes the asset-status conclusion in `docs/FINAL_IMPLEMENTATION_REPORT.md` §8 ("no real
photography") — see `AIRTECH_CONTENT_AUDIT.md` for the corrected status.

## Still missing (per the master brief's expected document set)

Per the brief's §04 expected source list, these are **not present** in `source-material/` and were
not fabricated or assumed:

1. `AIRTECH NEPAL 2026 DIGITAL EXPERIENCE.docx` — referenced *by name* inside
   `AIRTECH_WEBSITE_MASTER_SOURCE_OF_TRUTH_v1.docx` §1 as "Source 3," but no such file exists in
   the repo. Either it was absorbed into the Master Source of Truth during its own drafting and
   never saved separately, or it was never actually supplied. Treat any Master Source of Truth
   content attributed to "research/blueprint" as **secondary**, not independently verifiable,
   until this file is confirmed to exist and supplied.
2. `AIRTECH_WEBSITE_CLIENT_WEBSITE_DECISIONS_FORM_v1.docx` — not present. This blocks the IA/UX
   decisions covered in `AIRTECH_INFORMATION_ARCHITECTURE.md` (marked `CLIENT DECISION REQUIRED`
   throughout).
3. `AIRTECH_CLIENT_CONTENT_AND_ASSET_COLLECTION_FORM_v1.docx` — not present. This blocks final
   asset/permission collection (client logos, certifications, remaining brochure crops, remaining
   pptx appreciation-letter publication approval).

Per the brief's own instruction ("If one is missing from the repository: STOP and report it. Do
not fabricate the missing content"): reported here, not fabricated, and this does not block the
planning phases below since enough sourced material exists to design against.
