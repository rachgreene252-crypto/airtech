"use client";

// Hardcoded hex rather than CSS custom properties — this replaces the root
// <html>/<body> entirely when the root layout itself fails, so it can't
// depend on globals.css having loaded. Values must be kept in sync by hand
// with the tokens in globals.css — these are the blue-reset palette's
// literal hex values (--color-paper, --color-ink, --color-steel,
// --color-brand-blue) as of the blue-reset design pass.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#f3f5f7] text-[#161a1f] text-center px-6 font-sans">
        <p className="text-[0.8125rem] font-medium text-[#045c80]">Error</p>
        <h1 className="mt-5 text-4xl font-bold">Something went wrong.</h1>
        <p className="mt-4 text-[#454c55] max-w-md">
          Please try again, or email us at info@airtech.com.np if the problem continues.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 border border-[#161a1f] px-5 py-2.5 hover:bg-[#161a1f] hover:text-[#f3f5f7] transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
