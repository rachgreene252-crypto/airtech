# Airtech Content Audit

Date: 2026-08-16. Every factual claim below is traceable to a specific source file (see
`SOURCE_INDEX.md`). Organized per the master brief's §08 categories. This supersedes the content
sections of `docs/IMPLEMENTATION_AUDIT.md` and extends `docs/OPEN_DECISIONS.md` with what the newly
ingested `AIPL PROFILE - 2026.pptx` and a re-verified brochure add.

---

## 1. VERIFIED / SAFE TO USE

| Fact | Source |
|---|---|
| Official name: Airtech Industries Pvt. Ltd. | `AIRTECH WEBSITE REDESIGN.docx` §1.1 |
| Established 2000; Airtech MEP division commenced 2013 | `AIRTECH WEBSITE REDESIGN.docx` §1.2, corroborated by Master Source of Truth §2 |
| 25+ years of experience (derived from 2000 establishment, today 2026) | Master Source of Truth §11 verification ledger — "strongly supported" |
| Head office: 1st Floor, Sharada Complex, Panchyan Marg, Thapathali, Kathmandu, Nepal | `AIRTECH WEBSITE REDESIGN.docx` §1.3 |
| Tagline: "Reliability Matters" | Brochure back cover (p. 44) AND the 25th-anniversary event stage backdrop in `AIPL PROFILE - 2026.pptx` slide 22 — independently corroborated across two source documents |
| Positioning statement: shift from "HVAC company with MEP services" to "established engineering and integrated MEP partner with deep HVAC expertise" | `AIRTECH WEBSITE REDESIGN.docx` §20.6, verbatim — this is a direct client-approved instruction, not an inference |
| Primary email: info@airtech.com.np | `AIRTECH WEBSITE REDESIGN.docx` §1.3/§15.1, brochure back cover |
| Website: airtech.com.np | `AIRTECH WEBSITE REDESIGN.docx` §1 header |
| Core service taxonomy: HVAC, integrated MEP, Electrical, Plumbing & Public Health, Fire Protection & Fire Alarm, ELV/Security/IT, BMS, Service & Support, Engineering/Advisory | Master Source of Truth §5, corroborated by `AIPL PROFILE - 2026.pptx` slides 3–4 |
| Target customer list (developers, owners, contractors, architects/consultants, hospitals, hotels, pharma/labs, banks, corporate, industrial, telecom, data centres, education, embassies/INGOs) | `AIRTECH WEBSITE REDESIGN.docx` §3.1, Master Source of Truth §4 |
| Small residential/individual projects explicitly not a priority | `AIRTECH WEBSITE REDESIGN.docx` §3.6 |
| Mission (4 pillars) and Values (4 pillars) statements | `AIPL PROFILE - 2026.pptx` slides 2, 5 — direct company material, safe to use verbatim |
| ISO 9001:2015, 14001:2015, 45001:2018 badges (URS-certified, UKAS-accredited) printed on 2025 brochure back cover | Brochure p. 44 (viewed directly) — printed claim is verified as *printed*; current validity still needs a certificate-copy check before treating as a live claim (see §7) |

## 2. SOURCE-SUPPORTED / PUBLICATION APPROVAL REQUIRED

This is the category the new `.pptx` ingestion changed the most.

### 2a. Turnover figures (NEW — exact data now sourced)

`AIPL PROFILE - 2026.pptx` slide 6 contains an embedded chart with exact figures (extracted
programmatically from the chart's underlying data, not estimated from the visual):

| Fiscal Year | Turnover (NPR millions) |
|---|---|
| 2019/20 | 1,100.81 |
| 2020/21 | 950.88 |
| 2021/22 | 1,231.44 |
| 2022/23 | 1,166.78 |
| 2023/24 | 1,582.11 |
| 2024/25 | 1,490.76 |
| 2025/26 | 1,626.27 |

This resolves the gap flagged in `.claude/skills/airtech-digital-experience/SKILL.md` (written
earlier this session before the pptx was ingested) — the data **is** sourced now. It remains gated:
this is commercially sensitive financial data; do not publish without explicit current management
sign-off, regardless of how confident the source citation is.

### 2b. Nine real, signed, dated client reference letters (NEW)

`AIPL PROFILE - 2026.pptx` slides 19–21 ("Appreciation Certificates") embed photographed scans of
nine "To Whom It May Concern" letters. Full transcription (dates, scope, values) — this is by far
the strongest project-proof material in any source document, far exceeding the brochure's bare
photo captions:

| Client | Date | Confirmed scope | Value/size stated |
|---|---|---|---|
| Soaltee Hotel Limited | 18 Aug 2014 | MEP (HVAC & Fire Fighting, Electrical, Plumbing) — Himalayan Wing Renovation | NRs 73,500,000 (excl. VAT) total; Phase 1 ~NRs 2.2 crore |
| Grande International Hospital | 15 Jul 2013 | Electro-mechanical works (HVAC, medical gas piping, modular OT, water treatment/RO, pumping, sewage treatment, medical waste segregation) for a 200-bed hospital, Dhapasi, Kathmandu — delivered jointly with Technical Associates Services Pvt. Ltd. | Not stated |
| Nepal Hospitality & Hotel (P) Ltd. | 18 Mar 2018 | Full MEP — Fairfield by Marriott, Thamel (complete); also then-ongoing MEP (chillers, heat pumps, MFUs) at Marriott–Naxal | Not stated |
| JICA Nepal Office | 24 Jan 2017 | HVAC — supply, installation, testing & commissioning of Mitsubishi Electric City Multi VRF, ~200 kW | ~200 kW capacity |
| Oriental Hotels Ltd. (owners of Radisson Hotel Kathmandu) | 29 Mar 2015 | MEP for VIP suite & corporate office, turnkey; Mitsubishi Electric City Multi HVAC | ~NRs 12,000,000; 4-month duration |
| Ashwins Medical College and Hospital Pvt. Ltd. | 26 Feb 2018 | Full MEP — HVAC (chiller/VRF for entire hospital), Electrical (11kV substation, HT/LT panels, capacitor banks, DG sync, UPS), Plumbing (hot water heat pump, STP, drainage), Fire Fighting (pumps, hydrants, sprinklers) | Not stated |
| Nepal Cancer Hospital & Research Center | 26 Aug 2018 | Full MEP (all total) — supply, delivery, installation, testing & commissioning | NRs 10,77,43,829.23 (excl. VAT), ≈NRs 10.77 crore |
| Tiger One Pvt. Ltd. (Tiger Palace Resort & Casino, Bhairahawa) | 04 Dec 2019 | Electrical, HVAC (VRF, air-cooled chillers), Fire Fighting, Plumbing & Sanitary, Swimming Pool Works — hotel guest rooms, restaurants, spa, casino, banquet | ~16,245 sqm total area; ≈NRs 82 crore |
| British Embassy Kathmandu | 17 Jun 2013 | HVAC — design, supply, installation, testing & commissioning, Mitsubishi Electric City Multi VRF, for new Visa Consular Building | Not stated |

**Status: source-supported / publication approval required.** These are private business
correspondence — a named signatory, an employer, and in several cases exact contract values. That
Airtech included them in an internal-facing company profile presentation does not by itself mean
management has cleared them for public website use. Recommend treating this as a single, specific
approval request to management: "may we publish these as client testimonials/case-study evidence,
with or without the exact NPR figures redacted?" rather than assuming yes.

**This directly upgrades several existing `src/content/projects.ts` entries** from "name + location
only" (`source_only`, empty scope fields) to genuinely documented case studies once approved — see
the mapping table in `AIRTECH_IMPLEMENTATION_PLAN.md`. It also surfaces one real client not
currently in `src/content/projects.ts` at all: **Nepal Cancer Hospital & Research Center**.

It also **resolves part of an existing ambiguity**: `docs/OPEN_DECISIONS.md` #4 lumps "Nepal
Mediciti/Ashwin's" together as one uncertain healthcare project. The reference letters show these
are **two separate, independently confirmed clients** — Nepal Mediciti (photographed building,
`AIPL PROFILE - 2026.pptx` slide 8) and Ashwins Medical College and Hospital (full scope letter,
2018). `src/content/projects.ts`'s combined `nepal-mediciti` entry (`name: "Nepal Mediciti /
Ashwin's Medical College & Hospital"`) should likely be split into two project records once this
is confirmed with Airtech.

### 2c. Real project & team photography (correction to prior audit)

`docs/FINAL_IMPLEMENTATION_REPORT.md` §8 concluded no real, individually-usable photography exists.
This is **not accurate** on re-verification:

- The brochure's "Our Landmark Projects" pages (39–43) are a clean, individually captioned photo
  grid — not flattened composites — and crop cleanly from page-rendered images. Confirmed for
  pp. 39–40 this session (6 + 6 buildings, real photos except the Hilton Kathmandu image which is
  an architectural render, not a completed-building photo — flag accordingly if used).
  Pages 41–43 not yet reviewed; same extraction method will work.
- `AIPL PROFILE - 2026.pptx` embeds 81 media files, including a genuine high-resolution photograph
  of the Nepal Mediciti building (slide 8) and a genuine, large (~150–200 person) photograph from
  the 25th-anniversary team celebration (slide 22/23), with "AIRTECH RELIABILITY MATTERS" event
  branding visible.

**Status: source-supported / publication approval required.** These are real, high-quality, usable
images — a materially different asset situation than "no real photography." Publication still needs
the same per-client photography permission already gated in `docs/OPEN_DECISIONS.md` #5.

### 2d. Extended landmark project list (NEW names)

`AIPL PROFILE - 2026.pptx` slides 8–11, "Our Landmark Projects" (name + location only, no scope —
per the master brief's own rule, *"a project name is not a case study"*):

Laxmi Motors KD Plant (Parasi), NCELL Iconic Building (Kathmandu), Nepal Mediciti Hospital
(Lalitpur), CAAN Office Building (Kathmandu), Tiger Palace Resort (Bhairahawa), Radisson Hotel
(Kathmandu), Soaltee Crowne Plaza (Kathmandu), Chandragiri Hills Resort (Kathmandu), Dusit Princess
(Kathmandu), Hotel Hyatt Centric (Kathmandu), Holiday Inn Express (Kathmandu), Hotel Yak & Yeti
(Kathmandu), Skyline Mall (Birgunj), HGI Corporate Office (Kathmandu), **Parliament Building,
Kathmandu — explicitly marked "(Ongoing)" in the source** (do not present as a completed project),
Hotel Hilton (Naxal).

Plus two new names from the brochure's landmark-projects pages: The Terraces Resort & Spa
(Kathmandu), Nepali Ghar Hotel (Kathmandu).

Cross-referencing against `src/content/projects.ts`'s 13 existing entries: **already present**
— Ncell, Sipradi Trading, Norvic International Hospital, The Soaltee, Radisson Hotel Kathmandu,
Universal College of Medical Sciences, Shanker Group Corporate Office, CAAN, Laxmi Motor
Corporation (as "Laxmi Motor Corporation" — the pptx names it "Laxmi Motors KD Plant, Parasi,"
worth reconciling as the same client). **Not yet in the codebase**: Tiger Palace Resort (now
independently confirmed via a full reference letter, §2b), Chandragiri Hills Resort, Dusit
Princess, Hyatt Centric, Holiday Inn Express, Yak & Yeti, Skyline Mall, HGI Corporate Office,
Parliament Building (ongoing — do not add as a completed case study), Hotel Hilton Naxal, The
Terraces Resort & Spa, Nepali Ghar Hotel, Nepal Cancer Hospital & Research Center, JICA Nepal
Office, British Embassy Kathmandu, Grande International Hospital, Ashwins Medical College and
Hospital, Fairfield by Marriott Thamel, Marriott–Naxal.

### 2e. Extended client lists by sector (NEW)

`AIPL PROFILE - 2026.pptx` slides 12–18 list clients by sector. Largest is Hospitals (slides 13–14,
~25 named hospitals/medical colleges across Nepal — Kathmandu, Dharan, Butwal, Pokhara, Chitwan,
Lalitpur, Birtamode, Birgunj, Biratnagar, Lahan, Palpa). Also: Movie Theatres/Auditoriums/Studios
(F-Cube Cinema, BIG Cinema, Jai Nepal Cinema–QFX, several named auditorium halls), Telecom & Data
Centres (title only, logos as images — not yet individually catalogued), Embassy & INGOs (Russian
Embassy named directly; others as logos), Pharmaceuticals & Laboratories and Banks & Financial
Institutions (titles present but slide 15's body text appears to be a copy/paste error in the
source itself — it repeats "Grande International Hospital" and "National Trauma Centre" under the
"Banks & Financial Institutions" heading, which is clearly wrong; do not carry this error forward).

**Status: source_only**, pending the same logo/name publication-permission gate as
`docs/OPEN_DECISIONS.md` #5.

## 3. CONFLICTING INFORMATION

| Conflict | Detail | Status |
|---|---|---|
| Phone numbers | Questionnaire (`AIRTECH WEBSITE REDESIGN.docx`): +977-1-4219999 / 4101605. 2025 brochure back cover: 977 1 5319999 / 5322776 / 5352599. Re-confirmed by direct page view this session — both numbers are real and printed, just different. | Unresolved — do not publish either as primary |
| Employee/team count | `AIRTECH WEBSITE REDESIGN.docx` §9.2 says "the current [old] website states 300+ dedicated team members" — this is a claim about what the *old* site says, not a fresh HR confirmation. Master Source of Truth §11 explicitly separates this from "300+ engineers" (a different, unconfirmed, higher-risk claim) and says team count needs "a quick current confirmation." The 25th-anniversary photo (`AIPL PROFILE - 2026.pptx` slide 22) shows roughly 150–200 people, which is a plausible partial subset (event attendance, not necessarily full headcount incl. field techs) — visually consistent with, but not proof of, 300+. | needs_verification |
| "Nepal Mediciti/Ashwin's" as one project vs. two | See §2b — the reference letters show these are two separate hospitals with independent documentation. | Resolved by new evidence — recommend splitting the `src/content/projects.ts` record, pending Airtech confirmation of the two clients' identities |

## 4. MISSING INFORMATION

- Exact current employee count, engineer count, after-sales technical staff count, completed-project
  count (all previously flagged, still unresolved — see `AIRTECH_OPEN_DECISIONS.md`).
- Current ISO certificate copies/validity dates (badges are printed on the 2025 brochure; no
  certificate documents themselves were supplied).
- Final selection of marquee/featured projects — now a materially easier decision given the reference
  letters, but still a management call, not one to make unilaterally.
- Team names/bios/photos beyond MD (Manoj Bhansali) and "Senior Management – Ashok Ji" (per
  `AIRTECH WEBSITE REDESIGN.docx` §10.1) — the 25th-anniversary group photo has real faces but no
  names attached to any of them.
- The three source documents listed as missing in `SOURCE_INDEX.md` (Digital Experience research
  doc, Website Decisions Form, Content & Asset Collection Form).
- Brochure pages 41–43 (landmark projects continued) and 1, 3–38 not yet individually reviewed for
  additional content this session — worth a follow-up pass before final content lock, since pages
  39–40 alone surfaced two new project names not previously known.

## 5. HISTORICAL INFORMATION

- Older ISO wording (9001:2008 / 14001:2004) that may appear in outdated web caches — per Master
  Source of Truth §11, do not publish.
- "Nepal's first mobile service van" (2015 claim) — per Master Source of Truth §11, needs
  verification, currently unconfirmed.

## 6. DO NOT PUBLISH

- "Largest and most preferred MEP company in Nepal" and similar superlatives — explicit
  `do_not_publish` per Master Source of Truth §11/§19 and the client's own restriction
  (`AIRTECH WEBSITE REDESIGN.docx` §18.1: "unverified claims regarding market leadership... should
  not be published without management approval").
- "Up to 45% electricity savings" / "up to 67% power saving" — generic unverified performance claims
  (brochure), explicitly flagged in Master Source of Truth §7.
- Huawei Technologies Nepal — appears in the brochure's landmark-projects photo grid but the client
  questionnaire explicitly says this client should not be publicized (`AIRTECH WEBSITE
  REDESIGN.docx` §6.7). The newer, higher-authority source wins.
- "300+ engineers" — Master Source of Truth §11 explicitly flags this as research-blueprint wording
  that conflicts with the questionnaire; do not use even though "300+ team members" is closer to
  usable.
- Any exact reference-letter contract value (NRs 73.5M, NRs 10.77 crore, NRs 82 crore, NRs 12M, etc.)
  published without explicit management sign-off — these are real numbers from real letters, which
  makes them *more* sensitive to publish without permission, not less.

## 7. NEEDS CLIENT CONFIRMATION

Consolidated in `AIRTECH_OPEN_DECISIONS.md` — the turnover-figures approval, the nine reference
letters' publication approval (as a single decision request, see §2b), current phone number,
current ISO certificate validity, exact team/engineer/project counts, final marquee project
selection (now with much stronger source material to select from), per-client logo/photo
permission, and the three missing source documents.
