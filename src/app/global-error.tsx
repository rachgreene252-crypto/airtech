"use client";

// Hardcoded hex rather than CSS custom properties — this replaces the root
// <html>/<body> entirely when the root layout itself fails, so it can't
// depend on globals.css having loaded. Values must be kept in sync by hand
// with the tokens in globals.css (currently the warm-heritage palette) —
// this file was found two palette migrations behind (still on the very
// first blueprint/copper scheme) and had never been updated.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#f6f3ec] text-[#252629] text-center px-6 font-sans">
        <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#8a6428]">Error</p>
        <h1 className="mt-5 text-4xl font-bold">Something went wrong.</h1>
        <p className="mt-4 text-[#66645a] max-w-md">
          Please try again, or email us at info@airtech.com.np if the problem continues.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 border border-[#252629] px-5 py-2.5 hover:bg-[#252629] hover:text-[#f6f3ec] transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
