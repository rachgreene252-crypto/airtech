---
name: airtech-visual-art-direction
description: Use whenever a section on the Airtech site needs a visual — a photo, a diagram, a graphic device — before adding, replacing, or auditing any image. Establishes image selection as art direction (understand the message, find/compare real candidates, reject the weak ones, design the section around the winner) rather than "find an image, put it in a card."
---

# Airtech Visual Art Direction

The failure mode this skill exists to prevent: treating imagery as a placeholder-filling task.
"Find an image → put it in a card" produces pages that look assembled, not designed. This skill
is the process to use instead, every time a section needs a visual.

## The core rule

**Every visual must have a reason to exist.** If you can't state in one sentence what a specific
image communicates that the copy alone doesn't, don't use it — a section with no image and strong
type can outperform a section with a mediocre image every time.

## The process

1. **Identify the message.** What is this specific section actually saying? Not "hospitality
   sector" — "Airtech designs zone-specific HVAC for hotel guest rooms, restaurants and banquet
   halls." The image has to serve that sentence, not the category label.
2. **Decide if imagery even helps.** Some sections are stronger as pure typography (a stat, a
   quote, a short claim on a confident background). Don't default to "every section needs a
   photo." A section with no image is a valid, sometimes superior, outcome of this process.
3. **If yes — gather real candidates.** Pull from, in this priority order:
   - `public/images/projects/`, `public/images/landmarks/`, `public/images/recognition/` —
     already-sourced real Airtech project photography (see `src/content/projects.ts` for what
     each one depicts and its source citation).
   - `ASSETS/` and `source-material/` — check for higher-resolution originals or unused
     photography before assuming nothing exists (the brochure and `AIPL PROFILE - 2026.pptx`
     have both been mined before; check `docs/AIRTECH_CONTENT_AUDIT.md` and
     `docs/SOURCE_INDEX.md` for what's already catalogued rather than re-deriving it).
   - Supplied company assets the user has shared directly in conversation.
   - Only if none of the above can plausibly serve the message: a real external photo, sourced
     and attributed, never invented/generated to look like a real building or place.
4. **Compare candidates critically**, on:
   - **Relevance** — does it actually depict what the copy is claiming, or just something
     adjacent (any hotel vs. the hotel Airtech worked on)?
   - **Composition** — does the crop leave room for the type it'll sit under/behind? Is the
     subject where the eye should land?
   - **Lighting/quality** — is it sharp, well-exposed, high enough resolution to run large? A
     512px screenshot-of-a-photo is not a hero image.
   - **Brand fit** — does its palette/mood sit with Airtech blue and the site's tone, or fight it?
5. **Reject mediocre imagery outright.** A blurry, awkwardly-cropped, or generic photo is worse
   than no photo — it reads as "we didn't have anything better," which undercuts a premium
   positioning more than an elegant text-only section would.
6. **Select the strongest single visual** for the message. Resist reflexively filling a 3-up or
   4-up grid just because the component pattern expects N images — one exceptional photo run
   large beats three mediocre ones every time this happens.
7. **Design the section around the image**, not the reverse. Let its composition (a strong
   diagonal, a lit facade at dusk, a wide establishing shot) dictate crop, aspect ratio, text
   placement and overlap — don't force every photo into the same fixed-aspect card component
   sitewide. A full-bleed treatment, an asymmetric split, or a large single frame are all more
   honest to a genuinely strong image than shrinking it into a uniform grid cell.
8. **Prefer authentic Airtech project imagery whenever available** — a real, if imperfect, photo
   of an actual Airtech project always outranks a more polished photo of an unrelated building.
   Specificity is the point: this is proof of real work, not mood-board decoration.
9. **Never use generic stock imagery merely to fill space** — no stock-photo construction
   workers, no generic "blueprint on a desk" shots, no anonymous glass-office photos standing in
   for a real project. If nothing real and strong is available for a section, ship it without a
   photo rather than dilute the site with filler. Flag the gap instead — don't quietly paper over
   it with a placeholder that outlives the "temporary" label.

## Content-truth still applies

This skill governs *selection and craft*, not *sourcing rules* — [[airtech-digital-experience]]'s
content-truth rules (§5) are still binding: an image's caption/attribution must be accurate, and
using a real photo doesn't license inventing a claim about what it shows. When in doubt about
whether an image is cleared for use (a specific client's building, a named person), check
`docs/OPEN_DECISIONS.md` before publishing it, the same as any other fact-bearing content.

## Self-check before shipping a section

- Would this image, run large and alone, be worth the space it takes? If not, it's decoration —
  cut it or replace it.
- Could someone tell you exactly what this photo depicts and why it's here, without reading the
  caption?
- Is this the same aspect ratio / crop / treatment as the last four sections you built? If so,
  you defaulted to the component instead of art-directing the image — go back to step 7.
