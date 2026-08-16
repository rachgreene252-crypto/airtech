# Airtech Implementation Plan (proposed)

Date: 2026-08-16. Nothing in this plan has started. Per the master brief and the standing project
memory gate, **do not begin Phase 1 until `AIRTECH_OPEN_DECISIONS.md`'s client-decision-form items
are resolved** — this plan exists so implementation can start quickly once that happens, not to be
executed now.

## Phase 0 — Unblock (external, not code)

Get from Airtech: the Website Structure & Experience Decision Form answers (or direct answers to
the `CLIENT DECISION REQUIRED` items scattered across `AIRTECH_INFORMATION_ARCHITECTURE.md`,
`AIRTECH_SUPABASE_ARCHITECTURE.md`, `AIRTECH_CMS_SPEC.md`), and a decision on the specific,
high-value approval request from `AIRTECH_CONTENT_AUDIT.md` §2b (publish the 9 reference letters as
case-study evidence — yes/no/redacted) and §2a (publish the turnover chart — yes/no/which years).

## Phase 1 — Infrastructure + Supabase

- Provision the Supabase project (or confirm `xmkegimmzdshnbqbdvxs` is the one to use).
- Create tables/enums per `AIRTECH_SUPABASE_ARCHITECTURE.md`, as SQL migrations (reproducible, not
  ad hoc).
- Create storage buckets, RLS policies.
- Wire env vars (`.env.example` update), confirm Vercel project link.
- **Do not remove Sanity yet** — this phase runs in parallel with the still-live Sanity/local-content
  site, per the freeze-first migration discipline already agreed.

## Phase 2 — CMS (`/admin`)

- Supabase Auth wiring, admin route middleware.
- Build sections per `AIRTECH_CMS_SPEC.md` in order: Projects → Services/Industries → Company →
  Resources → Site Settings → Enquiries.
- Migrate `src/content/*.ts` seed data into Supabase via the new admin (or a one-time seed script) —
  this is the point at which the local content layer becomes redundant.

## Phase 3 — Core design system extensions

- Build the interactive systems-explorer component (experience architecture §2 in the skill file).
- Build the project-lifecycle scroll component (§3).
- Build the turnover-visualization component, wired to real (but initially unpublished/gated) data.
- No visual token changes expected — extends the existing system, per `AIRTECH_DESIGN_SYSTEM.md`.

## Phase 4 — Homepage

- Re-sequence per the decision-form-confirmed order (`AIRTECH_INFORMATION_ARCHITECTURE.md`
  Homepage structure).
- Swap content source from `src/content/` to Supabase queries.

## Phase 5 — Projects (the highest-value phase given this session's findings)

- Re-key existing `src/content/projects.ts` records against the Supabase schema.
- Apply the reference-letter upgrades from `AIRTECH_CONTENT_AUDIT.md` §2b to the matching existing
  projects, **once publication is approved**:

  | Existing `src/content/projects.ts` slug | Upgrade available |
  |---|---|
  | `the-soaltee` | Full scope + value from the Soaltee reference letter |
  | `radisson-hotel-kathmandu` | Full scope + value from the Oriental Hotels/Radisson letter |
  | `nepal-mediciti` | Split into two records (Nepal Mediciti + Ashwins Medical College) once confirmed; Ashwins gets full scope from its letter |

- Add new project records (pending the same approval): Nepal Cancer Hospital & Research Center,
  Tiger Palace Resort, JICA Nepal Office, British Embassy Kathmandu, Grande International Hospital
  full-scope upgrade, Fairfield by Marriott Thamel, Marriott–Naxal.
- Add `city`, `contract_value_npr` (gated), `project_area_sqm`, `reference_letter_on_file` columns'
  worth of data where sourced.
- Do **not** add Parliament Building as a completed case study — it's explicitly ongoing.
- Build location-based filtering if confirmed wanted (`AIRTECH_INFORMATION_ARCHITECTURE.md`).

## Phase 6 — Industries, Expertise

- No structural change expected; re-point data source to Supabase.

## Phase 7 — Company, Resources

- Populate the 25th-anniversary section (photo now available; timeline text stays gated).
- Get at least a company-profile PDF into Resources — highest-value/lowest-effort content gap per
  `AIRTECH_USER_FLOWS.md` Flow 7.

## Phase 8 — Contact/enquiry

- Add the explicit "what are you building" intent step.
- Wire enquiry submissions to the new `enquiries` table (in addition to, or instead of, the current
  webhook — `docs/OPEN_DECISIONS.md` #7 still needs a decision on the actual notification target).

## Phase 9 — SEO / accessibility / performance

- Re-run Lighthouse on a real deployed (CDN) build — the prior 0.411 CLS reading is unconfirmed
  (`docs/FINAL_IMPLEMENTATION_REPORT.md` §14, item 1) and should not be trusted until re-measured
  outside the local/no-sandbox Lighthouse environment.
- Manual screen-reader pass (never done — same report, item 3).

## Phase 10 — QA

- Run the full QA loop from the `airtech-digital-experience` skill (§7): build → playwright
  screenshots → visual critique → fix → responsive → accessibility → performance → repeat, for
  every phase above, not just at the end.

## Phase 11 — Sanity removal

- Only after Phase 2–10 prove the Supabase-backed site works end-to-end: remove `sanity`,
  `next-sanity`, `@sanity/image-url`, `@sanity/vision` dependencies, the `/studio` route, and
  `src/sanity/` entirely. Clean `.env.example` of Sanity-specific vars.

## What this plan deliberately does not schedule yet

- Any date/timeline — no source document or conversation gives a launch deadline.
- Anything from the master brief's "Phase 2" wishlist (HVAC/ROI calculator, BIM/Revit library,
  client portal) — post-launch scope per Master Source of Truth §20.
