import Image from "next/image";
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
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/assets/logo.png"
            alt={`${siteSettings.brandName} — ${siteSettings.tagline}`}
            width={600}
            height={180}
            priority
            className="h-9 sm:h-10 w-auto"
          />
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
