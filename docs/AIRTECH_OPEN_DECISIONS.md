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
    split. Not addressed anywhere; default recommendation is single role. The RLS mechanism this
    depends on is no longer blocking either choice: `20260922000000_admin_rls_hardening.sql`
    replaced every policy's bare `to authenticated using (true)` with a `public.admins` allow-list
    check, so admin-ness is no longer inferred from "has a session at all" — the still-open part is
    purely business (how many admins, whether a content-editor-vs-full-admin split is wanted), not
    technical; a split just needs the `admins.role` check constraint extended, no RLS rewrite.
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

## D. Homepage signature sections (2026-09-29)

Raised while building 01 The Building / 02 Project Radar / 03 The Airtech Method.
Nothing below was filled in with invented data; each is left visibly incomplete.

22. **Project locations for MIT College, Golyan Tower, Club NOVA, Kavya Resort** — no
    location in any source, so the Project Radar does not plot them (it says "4 further
    projects have no published location yet").
23. **Site-level coordinates** — the radar plots at city level only (sources give city or
    district, never an address). Confirm whether Airtech wants/permits building-level pins.
24. **Per-project scope** — most entries still read "Featured in Airtech's project
    portfolio" and list HVAC only. The radar and case studies will show real scope the
    moment it is supplied per project (questionnaire 6.4 already asks for this).
25. **Healthcare client cities** — hollow rings on the radar are cities from the profile
    deck's hospital client list (slides 13-14), shown as clients, not case studies. Confirm
    they may be shown, and whether any should become full projects.
26. **Building drawing** — the axonometric is a *typical* building (labelled "not to scale"),
    not any Airtech project. If Airtech has a real project whose services layout could be
    shown instead, that would be stronger proof.

## E. Client changelist re-check (2026-10-01)

Source: `source-material/CLIENT_LIST_AND_MISSION_2026-10-01.md`.

27. **Huawei** — the earlier exclusion (questionnaire) is superseded for *naming*: the client's own
    lists name Huawei, so it now appears in the client register and in Electrical ("Data-centre
    electrical works, including the Huawei NT data centre"). Still no Huawei photo, logo or case
    study. Confirm with the client that naming is fine.
28. **Client register spellings** — a few names were normalised to the organisations' own
    spelling (Machhapuchchhre Bank, Mahalaxmi Bikas Bank, LI-BIRD, CIWEC, BP Koirala Institute of
    Health Sciences). "WFO" and "World Claim" are kept verbatim but look like typos (WFP?) — confirm.
29. **Banks & Corporate split** — the client's single list is split across the site's
    banking-financial and corporate-commercial sectors (banks + insurers vs. the rest).

## F. Redesign brief (2026-10-29)

Applied from the client's "Premium redesign & refinement brief". Everything below is
implemented as stated; these are the points that still need the client's confirmation.

30. **Hyatt Centric photograph** — the project is now published as Hyatt Centric (works list +
    profile deck both say so; the deck's "Hyatt Centric" image is the same building). The photo
    itself still shows "HYATT PLACE" signage. Confirm the property was rebranded (or supply a
    current photo) so the image and the name agree. Old URL `/projects/hyatt-place-kathmandu`
    308-redirects.
31. **Club NOVA category** — moved out of Corporate & Commercial to Auditoriums, Halls,
    Theatres & Studios. Basis: the record's own type ("Entertainment venue") and its photos
    (stage, dance floor, bar). No source document states a category. Confirm, or name the
    right one.
32. **India office** — `src/content/offices.ts` has an unpublished India record with every
    detail blank. Needed before launch: city, street address, office email, phone (if any),
    map link, one sourced line on what the office covers, and the go-ahead to announce. Set
    `published: true` to show it on the contact page and the homepage close. Preview locally with
    `NEXT_PUBLIC_SHOW_UNPUBLISHED_OFFICES=1`.
33. **Withdrawn projects** — Aloft Kathmandu Thamel and Marwadi Parishad are marked
    `do_not_publish` (records kept, off every page, URLs redirect). Aloft is also out of the
    client register. Confirm whether Aloft should stay in the internal works list only.
34. **Corporate Offices vs Commercial Buildings** — now split, per the client's sector list.
    Corporate Offices (slug `corporate-commercial`, kept for old links): MetLife in The Plaza,
    Sipradi, Shanker Group, HGI, CAAN Office Building, Cedar Gate. Commercial Buildings
    (`commercial-buildings`): Golyan Tower, Skyline Mall, New Airport Commercial Office & Parking,
    Central Business Park. Parliament Building moved to Educational & Institutional Facilities
    (a seat of government, neither an office nor a commercial building). Classification is by
    building type from each record's name/photos; confirm, especially Golyan Tower and CAAN.
35. **"Soaltee Crowne Plaza"** — the brief uses this name; every source calls the project
    "The Soaltee" (Soaltee Hotel Limited reference letter). Kept as "The Soaltee" pending
    confirmation.
36. **New Drive photos (2026-10-29, "Photos to add")** — Cedar Gate, Central Business Park and
    Jagdamba Steels are now projects (names and scope from the works list; no locations claimed
    except Jagdamba, Birgunj). The Jagdamba image was cropped to remove a burned-in video caption.
    Central Business Park was 660px and is 2x-resampled. "Installation" (a fire-fighting pump room,
    project unnamed) illustrates Testing & Commissioning in How We Deliver. **Ramada Hotel** is in
    no written source and its photo is 275px wide, so it appears only as an index thumbnail and on
    its own page; please supply a larger photo, its location and Airtech's scope.
