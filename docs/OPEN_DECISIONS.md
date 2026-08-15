# Open Decisions

Business/content decisions that cannot be invented and require Airtech management input. Everything not blocked by one of these continues in parallel. This list is maintained as implementation proceeds — update status rather than duplicating entries.

---

### 1. Official phone number(s)

**Conflict:** Client questionnaire (10 Aug 2026) states `+977-1-4219999 / 4101605`. The 2025 brochure footer states `977 1 5319999 / 5322776 / 5352599`.

**Status:** Unresolved. Do not publish either number as the primary listed contact.

**Interim approach:** The site surfaces email (`info@airtech.com.np`) and the progressive enquiry form as primary contact paths. A phone field exists in Site Settings (CMS) as an empty/draft field so it can be filled the moment management confirms — no code change required.

---

### 2. Current ISO certificate validity

**Status:** Brochure back cover displays ISO 9001:2015, 14001:2015, 45001:2018 badges (UKAS/URS). Master Source of Truth flags these as needing current-validity confirmation before launch.

**Interim approach:** Certifications section built in CMS (draft/unpublished) so certificates can be added once copies + current validity are confirmed. Not displayed on live pages yet.

---

### 3. Team size, engineer count, after-sales technical staff count, completed-project count

**Status:** All marked `needs_verification` / "confirm" in the source documents. No numbers invented.

**Interim approach:** "Why Airtech" / stats sections use only the safely supported claim (25+ years, established 2000). Numeric team/project-count statistics are omitted from the built site until Airtech supplies figures.

---

### 4. Final five marquee projects and their exact scopes

**Status:** Research suggests Ncell Corporate, a healthcare project (Nepal Mediciti/Ashwin's), New Airport Commercial Office & Parking, a pharma/lab project, and a major hospitality project (Soaltee/Dwarika's/Shangri-La) — explicitly marked "MANAGEMENT TO SELECT FINAL FIVE."

**Interim approach:** Provisional project case studies are seeded using only what the brochure/questionnaire state (client, location, sector, general scope) with `status: provisional` in the CMS, clearly not overstating scope. Landmark-project photography from the brochure is used only where a caption already names the client and building.

---

### 5. Client-logo and project-photo publication permission

**Status:** Questionnaire states client logos are "generally fine" and most project photography can be used except a few flagged clients (e.g., Huawei). This is a general go-ahead, not a documented per-contract permission record.

**Interim approach:** Logos/photos from the brochure's public customer lists are treated as `source_only`. The build supports displaying them, but the content population step should get an explicit final go/no-go per logo from Airtech before the trust bar goes live with brand marks.

---

### 6. Content approver

**Status:** Not named in any source document (questionnaire question 14.3 left unanswered).

**Interim approach:** None — purely a workflow question for Airtech, doesn't block build.

---

### 7. WhatsApp number / CRM / lead-routing integration

**Status:** Questionnaire flags WhatsApp integration as desired but unconfirmed; no CRM named.

**Interim approach:** Enquiry form posts to a lead-notification email/webhook (configurable via env var). WhatsApp deep-link and CRM webhook are structured as optional, environment-driven integrations, not hardcoded to a specific provider.

---

### 8. Sanity CMS project provisioning

**Status:** Technical architecture decision (Sanity, per master brief §07) was made directly — no existing CMS to weigh against. However, a *live* Sanity project (project ID, dataset, deploy token) requires an account that only Airtech/the site owner can create or grant access to.

**Interim approach:** Studio and schemas are built against `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` env vars with no project connected yet. Documented in `.env.example`. Once credentials exist, connecting is a config change, not a rebuild.

---

### 9. Awards, professional memberships, partnership/authorization documents

**Status:** Not supplied. Brochure/questionnaire leave these blank or "confirm."

**Interim approach:** Omitted from the live site entirely (not even as placeholders) until supplied — per the "no unsupported claims" rule, absence is safer than a marked placeholder for credibility content like this.

---

### 10. OEM/manufacturer relationship wording

**Status:** Mitsubishi and Midea named as most notable; questionnaire explicitly says the site must not become defined by these brands, and exact authorization wording is unconfirmed.

**Interim approach:** An OEM/Partners CMS section exists but is built to render only logos + a neutral "trusted equipment partners" framing — no "authorized dealer/distributor" language anywhere in code, since that specific legal wording isn't confirmed.
