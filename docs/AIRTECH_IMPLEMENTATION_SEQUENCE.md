# Airtech Implementation Sequence

Date: 2026-08-16. Reconciles two orderings that look like they conflict but aren't actually in
tension once separated by concern:

- **`docs/AIRTECH_IMPLEMENTATION_PLAN.md`** (previous pass) orders by *infrastructure dependency*:
  Supabase must exist before `/admin` can be wired; `/admin` must exist before Sanity can be
  retired.
- **This session's brief §22** orders by *UX-validation priority*: design system → nav → homepage →
  Systems Explorer → project archive → case study → industries → expertise → service & support →
  company/history → resources → enquiry → CMS → QA.

**Resolution:** the frontend experience (brief's §22 order) can be built and visually validated
against the existing local `src/content/` layer — exactly as the whole Phase 1 site already was —
without waiting for Supabase. The Supabase/CMS migration threads in afterward, over the same
finished frontend, without redoing any of it. This is not a compromise between the two plans; it's
the only order that avoids building UI twice.

## Sequence

### Stage 1 — Foundation (no dependency on Supabase)

1. Design-system extensions confirmed in `AIRTECH_DESIGN_SYSTEM.md` — no new tokens, so this is
   mostly validating the new components' visual language against existing tokens before building
   them, not a token-design exercise.
2. Navigation — persistent CTA button, mobile bottom-bar scoping (§3 of the final spec). Small,
   low-risk, do first since every other page benefits from it immediately.

### Stage 2 — Homepage

3. Reorder existing homepage sections per §2 of the final spec.
4. Build `EngineeringSystemsExplorer` (§4) — highest-value new component, and the thing most worth
   validating early since it's the biggest departure from anything currently built.

### Stage 3 — Project system (highest content leverage, per prior session's audit)

5. Extend `ProjectsExplorer`/`ProjectCard` for the finalized filter set (§5) and new card fields.
6. Extend the project case-study template: Documents section, related-industries block (§5).
7. Build `DocumentViewer` + `ReferenceProofCard` (§6) — needed by step 6, build together.
8. **Content pass**, contingent on the publication-approval decisions in
   `docs/AIRTECH_OPEN_DECISIONS.md` §C: apply the reference-letter upgrades to existing projects,
   add new project records, per `docs/AIRTECH_IMPLEMENTATION_PLAN.md` Phase 5's mapping table. This
   still runs against `src/content/projects.ts` at this stage, not Supabase yet.

### Stage 4 — Industries, Expertise

9. Apply the finalized industry-page pattern (§9) — mostly a content/structure confirmation, since
   the existing templates already match closely.
10. Expertise pages — minimal change needed (§2–3 of the page specs).

### Stage 5 — Service & Support, Company/History

11. Build `LifecycleVisualization` as a shared component, wire to both the homepage
    `DeliveryApproach` slot and `/service-support` (§10).
12. Build `Timeline` + `TurnoverChart` for `/company/history` (§7–8), gated behind the publication
    flags from the start — build the real component against real data, ship it unpublished until
    approved.
13. Leadership/Quality & Certifications — wire `ReferenceProofCard`/`DocumentViewer` into
    `/company/quality-certifications` as the primary reference-proof library (§6, §12 of page
    specs).

### Stage 6 — Resources, Enquiry

14. Resources index/detail — category taxonomy + empty states (mostly already correct); prioritize
    getting a company-profile PDF in, per Flow 7.
15. Extend `EnquiryForm` from 5 to 6 steps, add the Service/AMC conditional branch (§12).

### Stage 7 — Supabase + CMS migration (infrastructure-dependency-ordered, per the original plan)

16. Provision Supabase, create schema/migrations per `AIRTECH_SUPABASE_ARCHITECTURE.md` (including
    this pass's additions in §14 of the final spec).
17. Build `/admin` per `AIRTECH_CMS_SPEC.md`.
18. Migrate `src/content/*.ts` data into Supabase; re-point every page built in Stages 1–6 from
    local content to Supabase queries. Because Stages 1–6 already built and validated the full UI
    against the same data shape, this stage is a data-source swap, not a UI rebuild.

### Stage 8 — Sanity removal

19. Only after Stage 7 is fully working end-to-end: remove Sanity dependencies, `/studio`, schema
    files, per `docs/AIRTECH_IMPLEMENTATION_PLAN.md` Phase 11.

### Stage 9 — QA (continuous, not just final)

20. Run the full QA loop (`airtech-digital-experience` skill §7) after every stage above, not only
    at the end — this is a process rule threaded through the whole sequence, not a final checklist
    item. Explicit final passes before considering the site launch-ready: Lighthouse on a real
    deployed build (not local), manual screen-reader pass, full responsive pass across the new
    components specifically (Systems Explorer, document viewer, turnover chart all being new
    interaction patterns that haven't been through this site's existing QA process yet).

## What blocks Stage 1 from starting today

Per the standing gate: the client decision form. Stages 1–6 could technically start against
reasonable defaults, but per the user's explicit instruction earlier in this project ("don't build
anything yet... first get the client to complete the decision form"), that gate still applies here
— this sequence is ready to execute the moment that gate lifts, not a signal to start now.
