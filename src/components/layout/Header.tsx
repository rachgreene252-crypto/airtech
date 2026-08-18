import Link from "next/link";
import { primaryNav } from "@/lib/navigation";
import { siteSettings } from "@/content/site-settings";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeaderNav } from "./HeaderNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-(--color-line) bg-(--color-paper)/95 backdrop-blur supports-backdrop-blur:bg-(--color-paper)/80">
      <Container className="flex h-18 items-center justify-between gap-6 py-3">
        <Link href="/" className="flex items-baseline gap-2 shrink-0">
          <span className="font-display text-2xl font-bold tracking-tight leading-none">
            {siteSettings.brandName}
          </span>
          <span className="hidden sm:inline font-mono text-[10px] tracking-[0.14em] uppercase text-(--color-steel)">
            {siteSettings.tagline}
          </span>
        </Link>

        <HeaderNav items={primaryNav} />

        <div className="hidden xl:block shrink-0">
          <ButtonLink href="/contact" size="md">
            Discuss Your Project
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
