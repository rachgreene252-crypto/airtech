---
name: airtech-visual-qa
description: Use after implementing any visual change on the Airtech site, before calling it done — screenshot the actual result at desktop/tablet/mobile and critique it like a design reviewer, then fix what fails rather than reporting it and stopping. Pairs with the Chrome/Playwright browser tools already used for QA on this project.
---

# Airtech Visual QA

Code compiling and a component rendering without errors is necessary, never sufficient. This
skill is the discipline of actually looking at what got built — via screenshot, not assumption —
and holding it to a real bar before calling a change finished. The rule that makes this different
from a normal QA pass: **when you find a problem, fix it in this same pass.** A findings list
without a fix is half the job.

## When to run this

After any change that touches layout, imagery, typography, color, or spacing — not just at the
end of a big redesign. A single new section, a button-shape change, a font swap: all of them get
a screenshot pass before being called done.

## How to look

Use the project's existing browser QA tooling (Chrome extension tools, or Playwright) to capture
the actual rendered page — never judge from reading JSX. Screenshot at three widths at minimum:
desktop (~1440px), tablet (~820px), mobile (~390px). Scroll through the full page, not just the
first viewport — problems compound down a long homepage as much as they do in the hero.

If the local dev/preview server can't be reached by the browser tool (a known intermittent issue
in this environment — confirmed by `curl` succeeding while the browser hits a connection-error
page), say so explicitly rather than silently skipping the visual check or reporting screenshots
you didn't actually see.

## What to critique

Work through each rendered section against all of these, not just the one you were asked to
change — a fix to one section can throw off the rhythm of its neighbors:

- **Hierarchy** — is it obvious what matters most on the screen, or does everything have equal
  visual weight?
- **Spacing** — is the rhythm between sections consistent and intentional, or does padding look
  arbitrary/copy-pasted? Are related elements grouped tighter than unrelated ones?
- **Typography** — does the type scale read as a deliberate system, or are sizes/weights
  inconsistent? Is anything using a fallback font because a web font failed to load?
- **Image quality** — is every photo sharp, well-cropped, and large enough for where it's placed?
  Flag anything blurry, oddly cropped, or stretched.
- **Colour** — is Airtech blue doing real work (accents, CTAs, active states) without the page
  reading as flat/pale, or without so much blue that it stops meaning anything?
- **Section rhythm** — scroll the whole page in sequence. Do sections vary in composition
  (full-bleed photo, dark band, light editorial block, card grid), or does every section look
  like the same component reskinned with different copy?
- **Repetition / card overload** — count how many sections in a row use a card-grid layout. Two
  in a row is a pattern; four in a row is a rut. Flag it even if each individual grid is fine.
- **AI-template characteristics** — pill buttons everywhere, soft drop-shadows on everything,
  generic rounded cards, a single grotesque font doing both display and body duty, evenly-spaced
  3-column grids as the default answer to "how do I show three things." None of these are
  automatically wrong, but if a section has three or more of them at once, it's defaulted to the
  generic pattern instead of being designed for this brief — redesign it.
- **Responsive behaviour** — does anything overflow, collide, or become illegible at tablet/mobile
  widths? Does a layout that depends on hover (a card reveal, a tooltip) have a workable touch
  equivalent?
- **Visual impact** — if you showed only this one section to someone cold, would they remember
  it, or could it belong to any premium B2B site? At least a few sections per page should be
  memorable, not just competent.

## Fix, don't just flag

For every problem found: fix it in this pass, in the actual component/CSS, then re-screenshot to
confirm the fix landed and didn't break something else nearby. Only report an issue without
fixing it when the fix requires a decision outside your authority (new photography that doesn't
exist yet, a content-truth gate, a call the user needs to make) — and say explicitly why you
stopped short, rather than silently leaving it.

## Close the loop

Before calling the pass done: re-screenshot the full set of changed pages/breakpoints one more
time and confirm nothing in the fix list is still failing. A visual QA pass that ends on "here's
what's wrong" without a second look at "is it actually fixed now" hasn't finished the job.
