import Image from "next/image";
import Link from "next/link";
import { primaryNav } from "@/lib/navigation";
import { siteSettings } from "@/content/site-settings";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { HeaderNav } from "./HeaderNav";

/** Presentational header chrome, shared by the solid default and the
 * homepage's transparent-over-hero state (see HeaderClient). Kept separate
 * so it can also serve as the Suspense fallback for `usePathname` (Cache
 * Components requires a Suspense boundary around it — the fallback state
 * is simply "solid", which is also the correct permanent state for every
 * non-home route). */
export function HeaderShell({ transparent }: { transparent: boolean }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        transparent
          ? "border-transparent bg-gradient-to-b from-white/85 via-white/45 to-transparent"
          : "border-(--color-line) bg-(--color-paper)/90 backdrop-blur supports-backdrop-blur:bg-(--color-paper)/75"
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6 py-3">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/brand/airtech-logo.png"
            alt={siteSettings.companyName}
            width={640}
            height={109}
            priority
            className="h-7 w-auto sm:h-8"
          />
          <span className="hidden sm:inline font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-(--color-steel)">
            {siteSettings.tagline}
          </span>
        </Link>

        <HeaderNav items={primaryNav} />

        <div className="hidden xl:block shrink-0">
          <ButtonLink href="/contact/project-enquiry" size="md">
            Discuss Your Project
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
