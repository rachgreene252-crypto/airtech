import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Fraunces — an editorial "old-style" serif with real thick/thin contrast
// and an optical-size axis, so display headlines get the display cut, not a
// scaled-up text cut. This replaces Oswald (condensed signage) to move the
// brand from "industrial contractor" to "design-led engineering practice."
// display: "swap" is safe here — Fraunces ships fallback-metric data, so
// there's none of the condensed-width reflow that forced Oswald to
// "optional" (and made cold loads render in Arial Narrow).
const displayFont = Fraunces({
  variable: "--font-display-face",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

// Geist — a clean, cool, low-contrast grotesque for body and UI. Neutral
// enough to sit under Fraunces without competing, precise enough to read as
// contemporary rather than corporate.
const sansFont = Geist({
  variable: "--font-sans-face",
  subsets: ["latin"],
  display: "swap",
});

// IBM Plex Mono stays — reserved for genuine machine data (discipline codes,
// drawing references, spec values), never prose eyebrows.
const monoFont = IBM_Plex_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteTitle = "Airtech Industries | Engineering & Integrated MEP Partner, Nepal";
const siteDescription =
  "Airtech Industries is Nepal's engineering and integrated MEP partner: HVAC, electrical, plumbing, fire protection and building systems, from design through commissioning and lifecycle support.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.airtech.com.np"
  ),
  title: {
    default: siteTitle,
    template: "%s | Airtech Industries",
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "Airtech Industries",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

// Tints the mobile browser chrome (Safari/Chrome address bar, iOS status
// bar) to match the site's canvas instead of the browser default — no
// theme-color existed before this.
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
