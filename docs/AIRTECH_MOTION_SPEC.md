# Airtech Motion Spec

Date: 2026-08-16. Governing rule, from `.claude/skills/airtech-digital-experience/SKILL.md` §3:
motion explains **systems → engineering → projects → proof**, never decorates. Every tier below
must be traceable to one of those four jobs. Implementation stays Framer Motion (already in use);
no new animation library.

## Tiers

### Micro (< 150ms)

Hover/focus state changes only — link underline, button fill, card border color shift, tag
highlight. No `transform` beyond a 1–2px shift at most (avoid the CLS risk already identified and
fixed once in `docs/FINAL_IMPLEMENTATION_REPORT.md` §13 — do not reintroduce transform-driven
movement on anything that could still be entering/leaving the viewport).

### Small (150–250ms)

- Dropdown nav open/close.
- Filter-chip add/remove.
- Enquiry-flow step transitions (slide + fade, must not block input — the next step's fields should
  be interactive the moment the transition starts, not only after it completes).
- Document viewer open/close (fade + slight scale from the trigger element, standard modal
  pattern).

### Medium (250–400ms)

- Engineering Systems Explorer zone expand/collapse and overlay panel slide-in. This is the one
  interaction on the site allowed a genuinely "designed" motion signature (per
  `AIRTECH_FINAL_EXPERIENCE_SPEC.md` §4) — because it's teaching a relationship (this system
  connects to that plant room), not decorating. Panel slides from the zone's screen position, not
  from a fixed edge — the origin point is part of what teaches the spatial relationship.
- Filter-result re-flow on the Projects archive (cards re-arranging after a filter change) — brief,
  not a full-page transition.

### Large (400ms+) — used exactly once

- Company/History timeline sequenced reveal (§8/§10 of the page specs) — each milestone reveals in
  order as it enters the viewport, opacity + a 4–8px vertical settle at most. This is the only
  place a "sequenced" (staggered) reveal is justified, because the sequence itself is the content
  (a timeline is inherently ordered) — do not apply staggered reveals to any other grid/list on the
  site (project cards, service cards, etc. reveal together, not staggered, to avoid the site feeling
  like everything is "performing" on scroll).

### Page transitions

None. No route-to-route transition animation — per the brief's "no animation for its own sake" and
the existing site's already-correct choice not to have one. Standard Next.js navigation.

## Explicitly forbidden, site-wide

- Scroll-jacking (hijacking native scroll for a custom animation sequence).
- Parallax of any kind.
- Video backgrounds.
- 3D transforms, WebGL, canvas-based decoration.
- Animation that delays a user's ability to act (e.g. a hero that must "finish" animating before
  the CTA becomes clickable).
- Looping/ambient animation on static content (no idle pulsing icons, no infinite marquees for the
  partner/client logo strips).

## Reduced motion

Every tier above must degrade to an instant state change under `prefers-reduced-motion: reduce`,
consistent with the existing implementation
(`useReducedMotion()` + the global CSS fallback, `docs/FINAL_IMPLEMENTATION_REPORT.md` §12). This
applies to the three new interactive components (`EngineeringSystemsExplorer`, `TurnoverChart`'s
point-reveal if any, `Timeline`) exactly as strictly as it already applies to the existing scroll
reveals — no exceptions for the "more expressive" tiers above.

## What NOT to animate

- Text content appearing/disappearing based on data state (e.g. a project's `challenge` field being
  present or absent) — render immediately, don't animate conditional content in, since that would
  visually flag which projects have "less" content, undermining the honest-empty-state design
  intent.
- Numbers in the turnover chart or any stat block — no counting-up number animations. They read as
  a generic SaaS-marketing trope and add nothing to comprehension; a number is either true or it
  isn't, and animating its arrival doesn't make it more credible.
