# Airtech Design System

Date: 2026-08-16. The authoritative creative direction lives in
`.claude/skills/airtech-digital-experience/SKILL.md` (visual philosophy, interaction philosophy,
the 14-section experience architecture, content-truth rules) — this document does not repeat that,
it records the concrete, already-implemented tokens and what this session's source ingestion
changes about how they should be used.

## Tokens already implemented (`src/app/globals.css`, Tailwind v4 `@theme`)

Per `docs/FINAL_IMPLEMENTATION_REPORT.md` §4 — verified still current in the live build:

- **Colour**: blueprint navy (`#1b3a6b`), drafting-paper off-white (`#f5f4f0`), structural steel
  gray, burnt-copper signal (`#b9531e`) reserved for CTAs/proof points.
- **Type**: Oswald (display/headlines) + IBM Plex Sans (body) + IBM Plex Mono (technical
  labels/eyebrows/spec data).
- **Signature device**: drawing-sheet crop marks (`.crop-frame`) around photographs/placeholders.
- **Motion**: Framer Motion, opacity-fade scroll reveals only, respects `prefers-reduced-motion`.

No change proposed to any of the above — it already matches the "engineering/editorial, not AC
dealer" brief closely, and the burnt-copper-as-CTA-only rule already avoids the generic-corporate-
blue trap the user's message explicitly warned against.

## What this session's ingestion changes

### The "no real photography" premise is gone

`docs/FINAL_IMPLEMENTATION_REPORT.md` §8 designed the `TechnicalPlaceholder` device (dark
technical-hatch pattern, "Photography pending — [name]") specifically because no real photography
existed. That's no longer true — `AIRTECH_CONTENT_AUDIT.md` §2c documents real, croppable,
high-quality project and team photography in both the brochure and the new `.pptx`. This does not
mean delete the placeholder component — some projects still have no photo and the honest-empty-
state pattern is correct design discipline to keep — but the **default expectation** for the ~9
projects with reference letters and named brochure landmark photos should shift from "will render a
placeholder" to "should receive its real photo," once publication permission is confirmed.

### The turnover chart now has real data to design against

`AIRTECH_CONTENT_AUDIT.md` §2a has the exact FY2019/20–FY2025/26 figures. Per the
`airtech-digital-experience` skill's guidance (§4 experience-architecture table, section 8): design
this as an editorial/architectural data presentation, not a finance-dashboard chart — e.g. a single
restrained line with year labels in the mono/technical type, burnt-copper accent on the current
year, hover/tap reveal of the exact figure. This can be **designed and built now**; the data
population step still needs sign-off before it ships live (same gate as everything financial).

### The 25th-anniversary section has a real photo to anchor it, still no narrative text

The team-celebration photograph (`AIRTECH_CONTENT_AUDIT.md` §2c) is genuinely usable — real people,
well-composed, on-brand event staging ("AIRTECH RELIABILITY MATTERS" backdrop). It does not, by
itself, supply timeline milestones or quotes. Design the section so the photograph can ship
independently of the narrative timeline content (which stays gated, per the
`airtech-digital-experience` skill §4, row 12).

## Design-system decisions still open

- **CLIENT DECISION REQUIRED**: does Airtech have brand guidelines beyond what's inferable from the
  2025 brochure and 2026 presentation? Neither source document supplies a brand guideline PDF, logo
  vector files, or a defined brand color palette — the existing token set is a considered design
  response, not an extraction from supplied brand assets. Worth confirming Airtech doesn't have an
  existing brand book that should take precedence before the visual system goes further.
- Whether the Hilton Kathmandu image (confirmed an architectural render, not a photo of a completed
  building — `SOURCE_INDEX.md`) is acceptable to use at all, and if so, whether it needs an explicit
  "artist's impression" / rendering label for honesty — this is a real content-integrity question,
  not just an asset-quality one.
