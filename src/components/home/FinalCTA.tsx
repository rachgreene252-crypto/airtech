import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Closing CTA — rebuilt again 2026-09-11, per a design-direction correction
 * that flagged the rounded pale card (built 2026-09-10 against a specific
 * reference screenshot) as generic/SaaS. The corrected read: the LAST thing
 * a visitor sees should be visual proof of capability, not a soft card —
 * full-bleed real project photography (Tiger Palace Resort, a genuine
 * Airtech job, not stock), sharp-edged type and button, no rounded card
 * floating on a pale tint.
 */
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-(--color-line) py-28 sm:py-36">
      <div className="absolute inset-0">
        <Image
          src="/images/landmarks/tiger-palace-resort.jpg"
          alt="Tiger Palace Resort, Bhairahawa"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,29,43,0.78) 0%, rgba(5,29,43,0.5) 40%, rgba(5,29,43,0.82) 100%)",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-(--color-brand-blue-soft)">
          <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue-soft)" />
          Let&apos;s talk
          <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue-soft)" />
        </span>
        <h2 className="mt-6 font-display text-5xl sm:text-6xl font-semibold text-balance text-white">
          Ready to build what&apos;s next?
        </h2>
        <p className="mt-6 text-body-l text-white/75 max-w-lg mx-auto">
          Tell us what you&apos;re building and we&apos;ll respond within one business day.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Enquire
          </ButtonLink>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-7 py-3.5 text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
