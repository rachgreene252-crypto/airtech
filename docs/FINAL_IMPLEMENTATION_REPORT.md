# Airtech Website — Final Implementation Report

Phase 1 launch build. Date: 2026-08-15.

---

## 1. What was built

A production Next.js 16 (App Router, Cache Components/PPR) application implementing the full Phase 1 scope from the Master Source of Truth: homepage, expertise/industry/project systems with detail templates, service & support, company sub-pages, resources, and a progressive project-enquiry flow — plus a headless CMS (Sanity) schema layer ready to connect, a content-verification system enforced end-to-end, and SEO/accessibility/performance work.

The repository had **no prior code** — see `docs/IMPLEMENTATION_AUDIT.md` for the pre-build state and `docs/OPEN_DECISIONS.md` for business decisions still awaiting Airtech management (phone number conflict, certification validity, marquee project selection, etc.).

## 2. Routes

| Route | Notes |
|---|---|
| `/` | Homepage — hero, trust bar, capabilities, featured projects, industries, delivery approach, partners, final CTA |
| `/expertise` | Service taxonomy index (7 disciplines) |
| `/expertise/[slug]` | Service detail — capabilities, sub-services, related industries/projects |
| `/industries` | Industry index (10 sectors) |
| `/industries/[slug]` | Industry detail — challenges, technical requirements, related services/projects |
| `/projects` | Filterable project portfolio (`?industry=`, `?service=`, shareable URL state) |
| `/projects/[slug]` | Full case-study template — at-a-glance metadata, narrative sections (rendered only when data exists), gallery, testimonial, related content |
| `/service-support` | AMC / after-sales / technical support |
| `/company` | About — mission, vision, drivers |
| `/company/history` | Timeline (2000 → 2013 → present) |
| `/company/leadership` | Team (currently MD + senior management only — see gaps below) |
| `/company/quality-certifications` | Certifications (empty state — none verified yet) + equipment partners |
| `/company/careers` | Minimal careers page, no fabricated listings |
| `/resources` | Empty state (no resource content supplied) |
| `/resources/[slug]` | Template ready, not statically generated (zero content currently) |
| `/contact` | 5-step progressive enquiry form + office info |
| `/studio/[[...index]]` | Embedded Sanity Studio (shows a "not connected" message until a project ID is set) |
| `/sitemap.xml`, `/robots.txt` | Generated from live content |

52 total pages generated at build time.

## 3. Components

27 components across:
- `components/ui/` — design system primitives: `Button`/`ButtonLink`, `Container`, `Section`, `SectionHeader`, `Tag`, `MetadataGrid`, `Breadcrumbs` (with BreadcrumbList JSON-LD), `TechnicalFrame` (signature crop-mark image device + honest placeholder), `Accordion`, `EmptyState`, `Reveal` (opacity-only scroll fade), `PageHero`
- `components/layout/` — `Header`, `HeaderNav` (desktop dropdowns + portal-rendered mobile nav), `Footer`
- `components/home/` — 8 homepage section components
- `components/projects/` — `ProjectCard`, `ProjectsExplorer` (client-side filter/URL state)
- `components/forms/` — `EnquiryForm` (multi-step, validated)
- `components/seo/` — `OrganizationJsonLd`

## 4. Design system

Deliberately not the 2025 brochure's bright blue/orange/yellow poster palette. Tokens (`src/app/globals.css`, Tailwind v4 `@theme`):

- **Colour**: blueprint navy (`#1b3a6b`), drafting-paper off-white (`#f5f4f0`), structural steel gray, and a single burnt-copper signal (`#b9531e`) reserved for CTAs and proof points.
- **Type**: Oswald (condensed, industrial — display/headlines) + IBM Plex Sans (body) + IBM Plex Mono (technical labels, drawing-sheet-style eyebrows, spec data). Originally speced as "Big Shoulders Display"; swapped to Oswald when Big Shoulders proved to have no fallback-metric data in this Next.js version, which was causing a measurable layout shift on font swap.
- **Signature device**: drawing-sheet crop marks (`.crop-frame` in globals.css) around every photograph/placeholder, evoking MEP coordination-drawing conventions rather than generic rounded-corner cards with drop shadows.
- **Motion**: Framer Motion used only for opacity-fade scroll reveals, the mobile nav, and hover states — respects `prefers-reduced-motion` via `useReducedMotion()` and a global CSS media query fallback. No parallax, no scroll-jacking.

## 5. CMS (Sanity)

Full schema layer in `src/sanity/schemaTypes/` (project, service, industry, testimonial, certification, partner, person, resource, siteSettings, navigation) plus a desk structure (`src/sanity/structure.ts`) and an embedded Studio at `/studio`. Every schema carries the `status` verification field (`verified` / `client_confirmed` / `source_only` / `needs_verification` / `historical` / `do_not_publish`).

**No live Sanity project is connected** — this requires Airtech/the site owner to create a Sanity account and provide `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` (see `.env.example` and `docs/OPEN_DECISIONS.md` #8). Until then, the site runs entirely on the local content layer in `src/content/`, which mirrors the Sanity types field-for-field — connecting a live project later is a config change, not a rebuild.

## 6. Content populated

All content in `src/content/` is sourced directly from the supplied documents, each function/file citing its source in a comment. Highlights:

- **7 services**, **10 industries**, **13 projects** (5 with fuller scope description from the Master Source of Truth's project database; 8 lighter "portfolio" entries from the brochure's Landmark Projects photo captions — name/client/location only, no invented scope)
- Company facts, mission/vision/drivers text lifted verbatim from the brochure and completed client questionnaire
- 2 team entries (MD + senior management, names only — bios/photos not supplied)
- 2 equipment partners (Mitsubishi Electric, Midea) with deliberately neutral relationship wording
- 3 certification records, all `source_only` and therefore **not rendered live** (see `getCertifications()` filter in `src/content/certifications.ts`)
- 0 testimonials, 0 resources — genuinely none were supplied; both pages render an honest empty state rather than placeholder content

## 7. Content deliberately excluded (do_not_publish / needs_verification)

Per the Master Source of Truth's verification ledger, the following were **not** carried into the site:

- "Largest and most preferred MEP company in Nepal" (unsupported superlative)
- "Up to 45% electricity savings" / "up to 67% power saving" (generic unverified performance claims)
- "Nepal's first mobile service van" (unverified claim)
- Team size, engineer count, after-sales staff count, completed-project count (all "needs_verification" in source docs — no numbers invented)
- Awards, professional memberships (not supplied at all)
- "Authorized dealer/distributor" wording for Mitsubishi/Midea (exact legal relationship unconfirmed)
- Huawei Technologies Nepal project photo (appears in the 2025 brochure's landmark-projects grid, but the more recent, higher-authority client questionnaire explicitly says this client should not be publicised — the newer source wins per the stated hierarchy)

## 8. No real photography

No logo files, brand guidelines, or individually-extractable project photographs were supplied. The 2025 brochure PDF's photos are either whole-page flattened composites (grid layout pages) or too few to extract reliably without risky, fragile pixel-cropping. Rather than force low-confidence crops or fabricate stock imagery, every image slot without a real photo renders an honest, on-brand placeholder (`TechnicalFrame`'s `TechnicalPlaceholder`: dark technical hatch pattern + "Photography pending — [name]" label). This is a real content-population task for Airtech post-launch, not a code gap — every image slot is CMS-ready (`SanityImageRef`) and will pick up real photos automatically once uploaded.

## 9. Environment variables

See `.env.example`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID / DATASET / API_VERSION / STUDIO_URL   — Sanity connection (see docs/OPEN_DECISIONS.md #8)
SANITY_API_READ_TOKEN                                                — Studio draft/write access
NEXT_PUBLIC_SITE_URL                                                  — canonical URL for metadata/sitemap/JSON-LD
LEAD_WEBHOOK_URL                                                      — enquiry form delivery target (see docs/OPEN_DECISIONS.md #7)
```

## 10. Deployment

Standard Next.js 16 app; the commercial quotation for this project names Vercel as the likely host. `next build` produces a mix of fully static, partially-prerendered (PPR), and on-demand routes — no special hosting configuration is required beyond the env vars above. `npm run build && npm run start` verified working locally.

## 11. SEO implementation

- Per-page `generateMetadata`/static `metadata` exports (title templates, descriptions)
- `Organization` JSON-LD (`src/components/seo/OrganizationJsonLd.tsx`) — only verified/client-confirmed fields; deliberately omits employee/project counts and phone (unresolved)
- `BreadcrumbList` JSON-LD on every interior page via the shared `Breadcrumbs` component
- `sitemap.xml` and `robots.txt` generated from live content, `/studio` disallowed
- Clean slugs throughout (`/expertise/hvac`, `/industries/healthcare`, `/projects/ncell-corporate-office`)
- Lighthouse SEO score: **100**

## 12. Accessibility status

- Skip-to-content link, semantic landmarks (`header`/`main`/`footer`/`nav`), heading hierarchy per page
- Visible focus states (`:focus-visible` outline in the signal colour) throughout
- Keyboard-operable navigation: desktop dropdowns (Escape to close, outside-click to close), mobile nav (portal-rendered, proper `aria-expanded`), native `<details>`/`<summary>` accordion
- Form fields have associated labels, `role="alert"` error messaging, and a 5-step progress indicator
- Respects `prefers-reduced-motion` (Framer Motion `useReducedMotion` + a global CSS fallback)
- Lighthouse Accessibility score: **96** (see Known Issues — not yet manually screen-reader tested)

## 13. Performance

Measured via Lighthouse CLI against a production build (`next build && next start`), homepage, default (mobile, throttled) config:

| Metric | Result |
|---|---|
| Performance | 75 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |
| FCP | 0.9s |
| LCP | 3.1s |
| TBT | 10ms |
| Speed Index | 0.9s |
| CLS | 0.411 (see Known Issues) |

Real fixes made during this pass: removed a `y`-transform from the scroll-reveal component (opacity-only now — transform-driven movement of in-viewport elements counts toward CLS even though it doesn't reflow the DOM), switched the display/body/mono fonts from `swap` to `optional` after discovering the originally-specified "Big Shoulders" font family has no fallback-metric data in this Next.js version (silent build warning), and added `scrollbar-gutter: stable`. These measurably improved LCP (4.6s → 3.1s), TBT (110ms → 10ms) and Speed Index (2.1s → 0.9s).

Performance is short of the >90 target, primarily on LCP under Lighthouse's default mobile throttling profile — expected to improve substantially once served from a real CDN edge (vs. local `next start`) and once real (properly compressed AVIF/WebP) photography replaces the current lightweight CSS placeholders, which is a net-neutral-to-positive change since `next/image` will optimize them automatically.

## 14. Known issues

1. **CLS reading (0.411) did not respond to any of the content/animation/font fixes made, including on a page with no animations at all** — and reproduced to 14 decimal places identically across the homepage and `/company` (a page with completely different height and content). That level of precision across unrelated pages strongly suggests a measurement artifact of running Lighthouse headless with `--no-sandbox` in this sandboxed environment, rather than a genuine content-driven shift — but this is a hypothesis, not confirmed. **Recommend re-measuring with PageSpeed Insights or Lighthouse in a normal desktop Chrome before treating this number as real**, especially since deliberate diagnostic changes (removing all `transform` from scroll reveals, changing font-loading strategy for every font on the page, reserving hero heading height, adding `scrollbar-gutter: stable`) produced zero change in the score — a real content-driven shift should have responded to at least one of these.
2. Sanity Studio route (`/studio`) is unauthenticated at the application level — access control needs to be configured via Sanity's own project permissions once a real project is connected; do not treat the current `/studio` route as production-ready for handling real credentials without that step.
3. No automated screen-reader pass was performed (only semantic/keyboard verification) — recommend a VoiceOver/NVDA pass before launch.
4. `npm audit` reports moderate/high-severity advisories entirely inside Sanity Studio's CLI-tooling dependency tree (`js-yaml`, `smol-toml`, `undici` in `@sanity/cli`/`@module-federation`) — these are dev-time Studio dependencies, not part of the deployed website bundle, but should be revisited when Sanity ships a fix (an `npm audit fix --force` is available but pulls a breaking Sanity major-version bump not yet vetted against this Next.js version).
5. The enquiry form's delivery mechanism (`LEAD_WEBHOOK_URL`) is a generic webhook POST, not wired to a specific email/CRM provider, since none was confirmed (`docs/OPEN_DECISIONS.md` #7). Functionally complete and tested end-to-end; needs a real endpoint configured before launch.

## 15. Recommended next phase

Per the Master Source of Truth §20 and this build's findings:

- Resolve all items in `docs/OPEN_DECISIONS.md` (phone number, certifications, marquee project selection, logo/photo permissions) before removing their placeholder treatment
- Provision the Sanity project and migrate `src/content/` seed data into it via the Studio
- Commission or collect real project photography, team photography, and logo/brand assets — every image slot is ready to receive them
- Confirm a lead-notification destination and set `LEAD_WEBHOOK_URL`
- Post-launch priority (per Master Source of Truth): dedicated deeper industry landing pages, technical resource centre content, AMC/service portal, custom engineering photography
- Re-run Lighthouse against a deployed (CDN-served) build to get a trustworthy performance/CLS baseline
