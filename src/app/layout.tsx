import type { Metadata, Viewport } from "next";
import { Geist, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";

// Manrope: display face for headlines and figures. Wide open proportions and
// metric-matched fallback enable "swap" without visible reflow.
const displayFont = Manrope({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteTitle = "Airtech Industries | Engineering & Integrated MEP Partner, Nepal";
const siteDescription =
  "Airtech Industries is Nepal's engineering and integrated MEP partner — HVAC, electrical, plumbing, fire protection and building systems, from design through commissioning and lifecycle support.";

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
  themeColor: "#F7FAFC",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
