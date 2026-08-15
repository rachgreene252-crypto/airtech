# Airtech Website — Implementation Audit

Date: 2026-08-15
Prepared before any application code was written, per the master implementation brief.

## 1. What already exists

The working directory contained **no application code whatsoever** prior to this session:

- No `package.json`, no framework, no `node_modules`
- No git repository (initialized fresh in this session)
- No CMS, database, or environment configuration
- No image/asset pipeline
- No routing of any kind

The directory contained only five source documents:

| File | Role |
|---|---|
| `AIRTECH_WEBSITE_MASTER_SOURCE_OF_TRUTH_v1.docx` | **Controlling document.** Synthesizes the other three sources, resolves contradictions, assigns verification status to every claim. |
| `Airtech_Client_Discovery_Questionnaire.docx` | Completed by Ishika Bhansali (Airtech), 10 Aug 2026. Primary authority on business facts, positioning, permissions. |
| `AIRTECH WEBSITE REDESIGN.docx` | The same questionnaire, filled in with researched/recommended answers — read as strategic/UX research, not as company fact, per source hierarchy. |
| `Airtech Brochure 2025.pdf` (44 pages) | 2025 marketing brochure. Source for service descriptions, sector proof points, client/project name lists, ISO certification badges, landmark project photography. |
| `Airtech Nepal Project Quotation.docx` | Commercial quotation for the redesign project itself (NPR 1,25,000 "Complete Digital Experience" package). Confirms scope: content structuring + design + development + CMS + SEO + performance + QA + deployment, one-time fee, hosting/CMS third-party costs billed separately. Signals Vercel as the likely deployment target. |

There is no `AIRTECH_WEBSITE_CLIENT_WEBSITE_DECISIONS_FORM_v1.docx` or `AIRTECH NEPAL 2026 DIGITAL EXPERIENCE.docx` in the directory — the closest equivalents present are the Master Source of Truth (which already functions as the decisions document) and the Redesign research questionnaire (which functions as the digital-experience research document). All four available documents were read in full before writing any code.

## 2. What can be reused

Nothing from prior code — there is none. From the source documents:

- **Company facts and positioning** (Section 2–7 of the Master Source of Truth) are reusable directly as verified/client-confirmed copy.
- **Brochure service-capability lists** (HVAC, Electrical, Plumbing, Fire Protection, ELV, BMS) are reusable as the basis for the Expertise taxonomy — cross-checked against the questionnaire, which confirms the same list.
- **Brochure "Landmark Projects" photography** (pages 39–43): ~25 real building photographs (Hilton Kathmandu, Dusit Princess, Soaltee, Radisson, Norvic International Hospital, Grande International Hospital, Sipradi Trading, Huawei Technologies Nepal, CAAN, etc.) with client name and location captions. This is the strongest available visual asset pool and should seed the initial Projects content, marked `source_only` pending full case-study detail and publication permission.
- **Client/sector logo lists** (hotels, pharma, hospitals, banks/corporate, telecom, industrial, embassies/INGOs) — usable as trust-bar content once deduplicated; questionnaire states logos are generally clear to display, but this is `client_confirmed` at a general level only, not per named brand contract.
- **ISO certification badges** printed on brochure back cover (ISO 9001:2015, 14001:2015, 45001:2018, UKAS-accredited, URS-certified) — `source_only`, needs current certificate copies before publishing as a live claim.

## 3. What must be removed

Not applicable — no prior build exists to remove from. Content-wise, the following brochure material must **not** carry forward into the new site without further verification or must be excluded outright:

- Managing Director's letter claim: "the largest and the most preferred MEP company in Nepal" — explicit superlative, `do_not_publish` per Master Source of Truth §11 and §19.
- "Up to 45% electricity savings" (hospitals) / "up to 67% power saving" (VRF) — generic performance claims without project-specific evidence, `do_not_publish` as blanket claims.
- "Nepal's first mobile service van" (2015) — `needs_verification`.
- Older ISO wording (9001:2008 / 14001:2004) that may appear in outdated web caches — `historical`, do not publish.
- The 2025 brochure phone numbers (977 1 5319999 / 5322776 / 5352599) directly conflict with the questionnaire's numbers (+977-1-4219999 / 4101605). **Neither is published pending management confirmation** (see `OPEN_DECISIONS.md`).

## 4. What must be built

Everything. Full Next.js App Router application, design system, content schemas, CMS, all page templates, enquiry flow, SEO, accessibility, performance work — per the master brief's 40-section specification.

## 5. Dependencies already installed

None. `node_modules` did not exist.

## 6. Missing dependencies (to be installed during scaffolding)

- `next`, `react`, `react-dom` (App Router, TypeScript)
- `typescript`, `@types/react`, `@types/node`
- `tailwindcss` + PostCSS toolchain
- `framer-motion`
- `sanity` (CMS studio) + `next-sanity` + `@sanity/image-url` (headless CMS, per master brief §07 — no existing CMS to weigh against, so Sanity is adopted directly)
- `zod` (form/schema validation for the enquiry flow)
- ESLint/Prettier tooling

## 7. CMS status

No CMS exists. Per the master brief, Sanity is adopted as there is no existing simpler architecture to preserve. A live Sanity project (project ID, dataset, API tokens) must be provisioned by the user/Airtech — this cannot be created by the agent without account credentials. The Studio schema and query layer will be built against environment variables so the project can be connected later without code changes. Logged in `OPEN_DECISIONS.md`.

## 8. Asset status

- No logo files, brand guidelines, or high-resolution originals are present.
- The only usable imagery is the 44-page brochure PDF (raster, print-resolution, embedded in a PDF — not extracted as individual web-optimized files). Landmark project photos will need to be extracted and re-optimized (AVIF/WebP) for actual use; this audit does not fabricate that extraction pipeline output — see Open Decisions for asset collection status.
- Team, leadership, and certification photography: none supplied. Questionnaire says team photos "will provide" — not yet received.

## 9. Routing status

N/A — no routes exist yet. Information architecture defined in `docs/CONTENT_MODEL.md` per Master Source of Truth §13.

## 10. Performance risks

- Brochure-sourced imagery is print-resolution and will need conversion/compression before use — using it unconverted would blow the Lighthouse >90 target.
- No hero video assets exist, which is good — avoids the biggest common performance trap named in the brief.
- Sanity's CDN image pipeline (`@sanity/image-url`) will be used for all CMS-driven images to get responsive/format-negotiated delivery for free.

## 11. Accessibility risks

- None yet realized (no code). Design tokens and component library will be built with WCAG 2.2 AA contrast and focus states from the start rather than retrofitted.

## 12. SEO risks

- Company facts carry real verification gaps (team size, project count, exact certifications) — publishing them prematurely as structured data (e.g., `Organization` schema `numberOfEmployees`) would create indexed misinformation. SEO implementation will only encode `verified`/`client_confirmed` fields.
- Phone number conflict must not leak into `LocalBusiness` structured data or `sameAs`/contact metadata until resolved.

---

Next steps per the mandated development order: content schemas → design tokens → navigation/shell → homepage → project listing → project case study → service templates → industry templates → company/resources/support → contact/enquiry → content population → SEO → accessibility → performance → responsive QA → visual QA → final audit.
