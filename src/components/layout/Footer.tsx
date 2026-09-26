import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { cacheLife } from "next/cache";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/lib/navigation";
import { siteSettings } from "@/content/site-settings";
import { getCertifications } from "@/content/certifications";
import { Reveal } from "@/components/ui/Reveal";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/**
 * Rebuilt 2026-09-16 — the previous version squeezed brand + all four nav
 * groups into one lg:grid-cols-[1.1fr_2fr] row ("looks very crowded" per
 * client feedback), which forced the Industries/Company columns (7 links
 * each) into a cramped 2fr strip. Now three distinct rows instead of one
 * dense block: a full-width brand row, a separating rule, then the four nav
 * groups spread across the *entire* container width with real per-column
 * breathing room. Still the same light material (bg-site-texture) — no
 * dark closing band per the standing "no dark blue block anywhere" rule.
 */
export async function Footer() {
  const year = await getCurrentYear();
  // Only actually-confirmed certifications (a real signed letter supplied)
  // show here — getCertifications() gates on status, unlike
  // getCertificationStandards() which lists every standard regardless of
  // whether Airtech has provided the document yet.
  const standards = getCertifications();
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-(--color-line) bg-(--color-paper-raised) text-(--color-ink)">
      <div className="absolute inset-x-0 top-0 h-px bg-(--color-brand-blue-vivid)" />
      <Container className="pt-16 pb-16 lg:pt-20 lg:pb-20">
        <h2 className="sr-only">Site footer</h2>

        {/* Redesigned 2026-09-24 ("looks really bad ... make it modern"):
            the loose logo / address / pill row became a CTA card up top
            and a structured brand row beneath it, with labelled contact
            blocks instead of a floating address. Still light — no dark
            band, per the standing rule. */}
        <div className="grid grid-cols-1 gap-10 border-b border-(--color-line) pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:items-start">
          <div>
            <Image
              src="/images/brand/airtech-logo.png"
              alt={siteSettings.companyName}
              width={640}
              height={109}
              className="h-9 w-auto sm:h-10"
            />
            <p className="mt-4 text-label font-semibold uppercase tracking-[0.16em] text-(--color-brand-blue)">
              {siteSettings.tagline}
            </p>
          </div>
          <div>
            <p className="text-label font-semibold uppercase tracking-[0.14em] text-(--color-steel-soft)">Head office</p>
            <p className="mt-3 max-w-[18rem] text-small leading-relaxed text-(--color-ink-soft)">
              {siteSettings.headOffice}
            </p>
          </div>
          <div>
            <p className="text-label font-semibold uppercase tracking-[0.14em] text-(--color-steel-soft)">Email</p>
            <a
              href={`mailto:${siteSettings.primaryEmail}`}
              className="mt-3 inline-block text-small font-medium text-(--color-ink) transition-colors hover:text-(--color-brand-blue)"
            >
              {siteSettings.primaryEmail}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 pt-14 sm:grid-cols-4 lg:gap-x-12">
          {footerNav.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.06}>
              <div>
                <h3 className="text-label font-semibold uppercase tracking-[0.14em] text-(--color-brand-blue)">
                  {group.title}
                </h3>
                <ul className="mt-5 flex flex-col gap-3 leading-snug">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href as Route}
                        className="text-small text-(--color-ink-soft) transition-colors hover:text-(--color-brand-blue)"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {standards.length > 0 && (
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-(--color-line) pt-8">
            <span className="text-label font-semibold uppercase tracking-[0.14em] text-(--color-steel-soft)">
              Certified
            </span>
            <Link
              href="/company/quality-certifications"
              className="flex flex-wrap items-center gap-x-6 gap-y-2 transition-opacity hover:opacity-70"
            >
              {standards.map((c) => (
                <span key={c.id} className="flex items-center gap-1.5 font-mono text-[0.8rem] text-(--color-ink-soft)">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-brand-blue)" />
                  {c.name}
                </span>
              ))}
            </Link>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-(--color-line) pt-8 text-xs text-(--color-steel-soft) sm:flex-row">
          <p>
            © {year} {siteSettings.companyName} Established {siteSettings.establishedYear}.
          </p>
          <p className="font-mono uppercase tracking-[0.14em]">Kathmandu, Nepal</p>
        </div>
      </Container>
    </footer>
  );
}
