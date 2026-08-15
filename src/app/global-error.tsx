"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#f5f4f0] text-[#0d1524] text-center px-6 font-sans">
        <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#b9531e]">Error</p>
        <h1 className="mt-5 text-4xl font-bold">Something went wrong.</h1>
        <p className="mt-4 text-[#5b6672] max-w-md">
          Please try again, or email us at info@airtech.com.np if the problem continues.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 border border-[#0d1524] px-5 py-2.5 hover:bg-[#0d1524] hover:text-[#f5f4f0] transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
