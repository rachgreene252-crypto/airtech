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
 * Light footer — same paper, same hairlines and Fraunces as the pages above
 * it, so it reads as the closing panel of the document rather than a
 * detached dark slab.
 */
export async function Footer() {
  const year = await getCurrentYear();
  return (
    <footer className="mt-auto border-t border-(--color-line-strong) bg-(--color-paper) text-(--color-ink)">
      <Container className="py-16 lg:py-24">
        <h2 className="sr-only">Site footer</h2>

        <div className="flex flex-col items-center text-center">
          <span className="font-display text-display-m font-normal tracking-[-0.01em]">
            {siteSettings.brandName}
          </span>
          <p className="mt-3 font-mono text-label uppercase tracking-[0.14em] text-(--color-steel)">
            {siteSettings.tagline}
          </p>
          <p className="mt-6 max-w-xs text-small text-(--color-steel) leading-relaxed">
            {siteSettings.headOffice}
          </p>
          <a
            href={`mailto:${siteSettings.primaryEmail}`}
            className="mt-2 inline-block text-small text-(--color-brand-blue) hover:text-(--color-brand-blue-hover) transition-colors"
          >
            {siteSettings.primaryEmail}
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-(--color-line) pt-14 lg:grid-cols-4">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="font-mono text-label uppercase tracking-[0.14em] text-(--color-steel-soft)">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as Route}
                      className="text-small text-(--color-ink-soft) hover:text-(--color-brand-blue) transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-(--color-line) pt-8 text-xs text-(--color-steel-soft) sm:flex-row">
          <p>
            © {year} {siteSettings.companyName}. Established {siteSettings.establishedYear}.
          </p>
          <p className="font-mono uppercase tracking-[0.14em]">Kathmandu, Nepal</p>
        </div>
      </Container>
    </footer>
  );
}
