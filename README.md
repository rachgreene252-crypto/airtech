# Airtech Website

Airtech Industries Pvt. Ltd. — engineering & integrated MEP partner website. Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, Framer Motion, Sanity CMS.

Start here: `docs/IMPLEMENTATION_AUDIT.md` (what exists, what was built), `docs/FINAL_IMPLEMENTATION_REPORT.md` (full build report), `docs/OPEN_DECISIONS.md` (business decisions awaiting Airtech management).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in as needed — the site runs fully without any of these set
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site runs entirely on local seed content (`src/content/`) until a Sanity project is connected — see `docs/OPEN_DECISIONS.md` #8.

## Scripts

- `npm run dev` — development server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve a production build
- `npm run lint` — ESLint

## Structure

```
src/
  app/            App Router routes, grouped under (site) for the shared header/footer shell
  components/     ui/ (design system), layout/, home/, projects/, forms/, seo/
  content/        Local content layer — types + seed data, sourced from docs/ source material
  sanity/         CMS schema definitions, Studio config, client/query helpers
  lib/            Shared utilities (navigation config, enquiry validation, class-name helper)
source-material/  Original brochure/questionnaire/strategy documents
docs/             Audit, open decisions, final report
```

## Content model

Content types are defined once in `src/content/types.ts` and mirrored field-for-field by the Sanity schemas in `src/sanity/schemaTypes/`. Every fact-bearing type carries a `status` field (`verified` / `client_confirmed` / `source_only` / `needs_verification` / `historical` / `do_not_publish`) — see `docs/IMPLEMENTATION_AUDIT.md` for the verification policy this enforces.
