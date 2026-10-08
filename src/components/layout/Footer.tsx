import Image from "@/components/ui/Image";
import Link from "next/link";
import type { Route } from "next";
import { cacheLife } from "next/cache";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/lib/navigation";
import { siteSettings } from "@/content/site-settings";
import { getCertifications } from "@/content/certifications";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/**
 * Rebuilt 2026-09-27 in the Air Experts / Midea footer idiom ("too big of a
 * footer still ... make it more concise and formal"): one row — brand,
 * office and email on the left, three short link columns on the right —
 * in 14px type, then a single legal line. Replaces the three-row layout
 * with 16px+ links that ran the footer past 500px tall.
 */
export async function Footer() {
  const year = await getCurrentYear();
  // Only actually-confirmed certifications (a real signed letter supplied)
  // show here — getCertifications() gates on status.
  const standards = getCertifications();
  return (
    <footer className="relative mt-auto border-t border-(--color-line) bg-(--color-paper) text-(--color-ink)">
      <Container className="py-12 lg:py-14">
        <h2 className="sr-only">Site footer</h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-5">
          <div className="col-span-2">
            <Image
              src="/images/brand/airtech-logo.png"
              alt={siteSettings.companyName}
              width={640}
              height={109}
              className="h-7 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-(--color-steel)">
              Integrated MEP and HVAC engineering in Nepal since {siteSettings.establishedYear}.
            </p>
            <address className="mt-5 max-w-xs text-sm not-italic leading-relaxed text-(--color-steel)">
              {siteSettings.headOffice}
              <br />
              <a
                href={`mailto:${siteSettings.primaryEmail}`}
                className="text-(--color-ink) transition-colors hover:text-(--color-brand-blue)"
              >
                {siteSettings.primaryEmail}
              </a>
              <br />
              <span>Careers: </span>
              <a
                href={`mailto:${siteSettings.careersEmail}`}
                className="text-(--color-ink) transition-colors hover:text-(--color-brand-blue)"
              >
                {siteSettings.careersEmail}
              </a>
            </address>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-ink)">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as Route}
                      className="text-sm text-(--color-steel) transition-colors hover:text-(--color-brand-blue)"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-(--color-line) pt-6 text-xs text-(--color-steel-soft) sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteSettings.companyName} All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {standards.length > 0 && (
              <Link href="/company/quality-certifications" className="transition-colors hover:text-(--color-ink)">
                {standards.map((c) => c.name).join(" · ")}
              </Link>
            )}
            <span>Kathmandu, Nepal</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
