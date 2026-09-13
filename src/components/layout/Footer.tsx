import Link from "next/link";
import type { Route } from "next";
import { cacheLife } from "next/cache";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/lib/navigation";
import { siteSettings } from "@/content/site-settings";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/**
 * Rebuilt 2026-09-10 (client: "beautify" the footer) — a dark closing band
 * (matching the hero and final CTA's photo-dark bookends) instead of a flat
 * plain-text list on white, with a clearer brand mark and a real top accent
 * line in Airtech blue.
 */
export async function Footer() {
  const year = await getCurrentYear();
  return (
    <footer className="relative mt-auto overflow-hidden bg-(--color-blue-deep) text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-(--color-brand-blue-vivid)" />
      <Container className="pt-20 pb-16 lg:pt-24 lg:pb-20">
        <h2 className="sr-only">Site footer</h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <span className="font-display text-3xl font-semibold tracking-[-0.01em] text-white">
              {siteSettings.brandName}
            </span>
            <p className="mt-3 font-mono text-[0.8rem] font-medium uppercase tracking-[0.16em] text-(--color-brand-blue-soft)">
              {siteSettings.tagline}
            </p>
            <p className="mt-6 max-w-xs text-small text-white/65 leading-relaxed">
              {siteSettings.headOffice}
            </p>
            <a
              href={`mailto:${siteSettings.primaryEmail}`}
              className="mt-3 inline-block text-small font-medium text-white transition-colors hover:text-(--color-brand-blue-soft)"
            >
              {siteSettings.primaryEmail}
            </a>
            <div className="mt-8">
              <Link
                href="/contact/project-enquiry"
                className="inline-flex items-center gap-2 rounded-full bg-(--color-brand-blue-vivid) px-5 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-brand-blue) hover:shadow-[0_10px_24px_-8px_rgba(0,153,218,0.6)]"
              >
                Inquire for Services
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/45">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href as Route}
                        className="text-small text-white/80 transition-colors hover:text-(--color-brand-blue-soft)"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/12 pt-8 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {siteSettings.companyName}. Established {siteSettings.establishedYear}.
          </p>
          <p className="font-mono uppercase tracking-[0.14em]">Kathmandu, Nepal</p>
        </div>
      </Container>
    </footer>
  );
}
