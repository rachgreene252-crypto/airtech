import { ButtonLink } from "@/components/ui/Button";

/**
 * Fixed mobile CTA bar. Rendered per-page (Projects, Industries, Service &
 * Support only — AIRTECH_FINAL_EXPERIENCE_SPEC.md §3), never globally: a
 * persistent bar on every page, including e.g. /company/careers, would be
 * noise rather than conversion support.
 */
export function StickyEnquiryBar() {
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-30 border-t border-(--color-line) bg-(--color-paper-raised)/95 backdrop-blur supports-backdrop-blur:bg-(--color-paper-raised)/85 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <ButtonLink href="/contact" size="lg" className="w-full">
        Discuss Your Project
      </ButtonLink>
    </div>
  );
}
