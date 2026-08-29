import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-site-texture text-(--color-ink) text-center px-6">
      <p className="font-mono text-label text-(--color-brand-blue)">404</p>
      <h1 className="mt-5 font-display text-5xl font-bold">Page not found.</h1>
      <Link href="/" className="mt-8 text-(--color-signal) hover:underline">
        Back to home
      </Link>
    </div>
  );
}
