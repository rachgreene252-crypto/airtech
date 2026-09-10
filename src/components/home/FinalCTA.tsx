import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Closing CTA — rebuilt 2026-09-10 (client: the photo-panel version
 * "looks disgusting"). Replaced with the reference site's closing pattern:
 * a soft light-blue card, centred, a small ruled eyebrow, a bold headline,
 * two buttons. No WhatsApp CTA (the reference uses one) — no WhatsApp
 * number exists in src/content/site-settings.ts yet, so "Contact Us" is the
 * secondary action instead of fabricating a channel that isn't set up.
 */
export function FinalCTA() {
  return (
    <section className="border-t border-(--color-line) bg-(--color-brand-blue-tint) py-20 sm:py-24">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[28px] bg-white px-6 py-14 text-center shadow-[0_20px_60px_-15px_rgba(0,153,218,0.25)] sm:px-14 sm:py-16">
        {/* Soft decorative wash, echoing the reference's faint diagonal
            gradient texture behind the card content. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 50% -10%, rgba(0,153,218,0.10), transparent 60%)",
          }}
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-(--color-brand-blue)">
            <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue)" />
            Let&apos;s talk
          </span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold text-balance text-(--color-ink)">
            Ready to build what&apos;s next?
          </h2>
          <p className="mt-5 text-body-l text-(--color-steel) max-w-xl mx-auto">
            Tell us what you&apos;re building and we&apos;ll respond within one business day.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/contact/project-enquiry" size="lg">
              Inquire for Services
            </ButtonLink>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-(--color-line-strong) px-7 py-3.5 text-base font-medium text-(--color-ink) transition-colors hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
