import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Closing CTA. Rebuilt 2026-09-16, removing the full-bleed photo background
 * per direct feedback ("remove the bg image it looks really bad") — the
 * sourced photo here (Tiger Palace Resort, 666x329 native) was being
 * stretched full-bleed across the whole section width, well past its real
 * resolution, exactly the kind of upscaled softness flagged elsewhere on
 * the site. Kept light rather than swapping in a solid dark panel: the
 * site carries no dark blocks anywhere (per separate, explicit "no dark
 * blue block" feedback), so this closes the same way every other section
 * does, on the sitewide light material, with the brand-blue button doing
 * the work a photo or a colour inversion used to do.
 */
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-(--color-line) bg-site-texture py-28 sm:py-36">
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
          <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue)" />
          Let&apos;s talk
          <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue)" />
        </span>
        <h2 className="mt-6 font-display text-5xl sm:text-6xl font-semibold text-balance text-(--color-ink)">
          Ready to build what&apos;s next?
        </h2>
        <p className="mt-6 text-body-l text-(--color-steel) max-w-lg mx-auto">
          Tell us what you&apos;re building and we&apos;ll respond within one business day.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Enquire
          </ButtonLink>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-(--color-line-strong) px-7 py-3.5 text-base font-medium text-(--color-ink) transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
