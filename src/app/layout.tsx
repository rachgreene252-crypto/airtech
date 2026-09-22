import type { Metadata, Viewport } from "next";
import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Archivo — a bold, confident grotesque, pushed heavy for headlines and
// eyebrow labels. Replaces Fraunces (2026-09-16): the client rejected the
// serif display face outright ("change all these fonts everywhere") after
// two prior font passes. Archivo's variable weight axis gives real display
// cuts at 700-800 without synthetic-bold clumsiness.
const displayFont = Archivo({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Inter — a neutral, highly legible grotesque for body and UI, chosen to sit
// quietly under Archivo's heavier display cuts.
const sansFont = Inter({
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
  "Airtech Industries is Nepal's engineering and integrated MEP partner: HVAC, electrical, PHE, fire protection, ELV and building systems, from design through commissioning and lifecycle support.";

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
