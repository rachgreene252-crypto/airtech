# Airtech Open Decisions (consolidated)

Date: 2026-08-16. This consolidates and supersedes `docs/OPEN_DECISIONS.md` (previous session),
extended with what this session's full ingestion of `AIPL PROFILE - 2026.pptx` and re-verification
of the brochure surfaced. `docs/OPEN_DECISIONS.md` is kept for history, not deleted. Items are
grouped: business/content decisions (unchanged from before unless noted) and new items from this
session, plus the standing architecture/process gate.

---

## A. Standing gate (blocks all implementation)

**The Website Structure & Experience Decision Form has never actually been supplied.** Three
documents named in the master brief are missing from `source-material/` (full detail in
`SOURCE_INDEX.md`): the decisions form itself, the content & asset collection form, and the
"Digital Experience" research document referenced by name inside the Master Source of Truth. Per
the explicit instruction already recorded in project memory, no implementation begins until this is
resolved or the user explicitly says to proceed without it.

## B. Carried over unchanged from `docs/OPEN_DECISIONS.md`

1. **Official phone number** — questionnaire (+977-1-4219999/4101605) vs. 2025 brochure
   (977 1 5319999/5322776/5352599). Re-confirmed both are real, printed numbers this session — still
   unresolved. Do not publish either.
2. **ISO certificate current validity** — badges printed on brochure back cover (9001:2015,
   14001:2015, 45001:2018, URS/UKAS) confirmed present; no certificate documents themselves
   supplied. Still needs collection + validity confirmation.
3. **Team size, engineer count, after-sales staff count, completed-project count** — still
   unconfirmed. New context this session: the 25th-anniversary photo shows ~150–200 people at one
   event, which is *consistent with* but not proof of "300+."
4. **Final five marquee projects** — now a materially easier decision. See item 8 below — the new
   reference-letter evidence gives 9 strongly documented candidates to choose from, beyond the
   original 5 speculative picks.
5. **Client-logo/project-photo publication permission** — unchanged in substance, but the pool of
   real, usable photography is now much larger (`AIRTECH_CONTENT_AUDIT.md` §2c) — makes this
   decision more valuable to get, not less.
6. **Content approver** — still not named anywhere.
7. **WhatsApp/CRM/lead-routing** — still unconfirmed.
8. **Sanity CMS provisioning** — **moot.** Superseded by the Supabase migration decision recorded in
   project memory (`architecture-supabase-migration`). Sanity is being retired, not provisioned
   further.
9. **Awards, professional memberships, partnership/authorization documents** — still not supplied.
10. **OEM/manufacturer relationship wording** — unchanged; the new reference letters add *evidence*
    for the existing neutral framing (confirmed real Mitsubishi Electric City Multi VRF
    installations at JICA, Radisson/Oriental Hotels, British Embassy) but do not change the wording
    policy itself.

## C. New this session

11. **Publish the 9 reference letters as case-study evidence?** (`AIRTECH_CONTENT_AUDIT.md` §2b) —
    the single highest-value new decision. These are real, signed, dated letters from Soaltee,
    Grande International Hospital, Nepal Hospitality & Hotel (Fairfield/Marriott), JICA Nepal,
    Oriental Hotels (Radisson), Ashwins Medical College, Nepal Cancer Hospital, Tiger One (Tiger
    Palace), and British Embassy Kathmandu. **Decision needed:** publish as-is, publish with exact
    NPR contract values redacted, or hold entirely pending direct re-confirmation from each client.
12. **Publish the turnover chart?** (`AIRTECH_CONTENT_AUDIT.md` §2a) — exact FY2019/20–FY2025/26
    figures are now sourced from the `.pptx`'s embedded chart data. **Decision needed:** yes/no, and
    if yes, whether all seven years or a subset.
13. **Nepal Mediciti vs. Ashwins Medical College** — confirm these are two separate clients (strong
    evidence they are, per independent photo + independent reference letter) so the existing
    combined `src/content/projects.ts` record can be split correctly.
14. **Extended landmark-project list** (Tiger Palace, Chandragiri Hills Resort, Dusit Princess,
    Hyatt Centric, Holiday Inn Express, Yak & Yeti, Skyline Mall, HGI Corporate Office, Hotel Hilton
    Naxal, The Terraces Resort & Spa, Nepali Ghar Hotel) — confirm which of these should be added
    to the project database now vs. held for later.
15. **Parliament Building** — explicitly marked "(Ongoing)" in the source. Confirm it should be
    represented as an in-progress project (if shown at all), never as a completed case study.
16. **Location-based project filtering** — not addressed in any source document; now technically
    supportable given city data exists for most projects. Wanted or not?
17. **Admin role count/split** (`AIRTECH_SUPABASE_ARCHITECTURE.md` §6) — single admin vs. role
    split. Not addressed anywhere; default recommendation is single role.
18. **Admin-editable navigation** (`AIRTECH_SUPABASE_ARCHITECTURE.md` §2, `navigation` table) —
    build it or leave nav code-defined? Default recommendation is code-defined (avoid
    over-engineering per master brief §29).
19. **Existing brand guidelines** — confirm whether Airtech has a brand book/logo files/defined
    palette that should take precedence over the design system's own considered token choices
    (`AIRTECH_DESIGN_SYSTEM.md`).
20. **Hilton Kathmandu image** — confirmed an architectural render, not a photo of a completed
    building. Confirm whether it's usable at all, and if so, whether it needs an "artist's
    impression" label.
21. **Service/AMC contact path** — should an existing-client service request use a different,
    faster path than the new-project progressive enquiry flow (`AIRTECH_USER_FLOWS.md` Flow 6)?
    Not addressed anywhere.
