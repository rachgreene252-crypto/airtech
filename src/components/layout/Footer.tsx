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

export async function Footer() {
  const year = await getCurrentYear();
  return (
    <footer className="border-t border-(--color-line) bg-(--color-ink) text-(--color-paper) mt-auto">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-12">
          <div className="col-span-2 lg:col-span-2 pr-6">
            <span className="font-display text-3xl font-normal italic">{siteSettings.brandName}</span>
            <p className="mt-3 font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel-soft)">
              {siteSettings.tagline}
            </p>
            <p className="mt-6 text-sm text-(--color-steel-soft) leading-relaxed max-w-xs">
              {siteSettings.headOffice}
            </p>
            <a
              href={`mailto:${siteSettings.primaryEmail}`}
              className="mt-3 inline-block text-sm text-(--color-paper) hover:text-(--color-signal-soft) transition-colors"
            >
              {siteSettings.primaryEmail}
            </a>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel-soft)">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as Route}
                      className="text-sm text-(--color-paper)/85 hover:text-(--color-signal-soft) transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-(--color-ink-soft) flex flex-col sm:flex-row justify-between gap-4 text-xs text-(--color-steel-soft)">
          <p>
            © {year} {siteSettings.companyName}. Established {siteSettings.establishedYear}.
          </p>
          <p className="font-mono uppercase tracking-[0.08em]">Kathmandu, Nepal</p>
        </div>
      </Container>
    </footer>
  );
}
