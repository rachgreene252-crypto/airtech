import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <SmoothScroll>
      <OrganizationJsonLd />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-(--color-signal) focus:text-(--color-paper) focus:px-4 focus:py-2 focus:rounded-[3px]"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
