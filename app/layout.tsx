import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/config/site";
import { localBusinessSchema } from "@/lib/schema";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import {
  analyticsConfigured,
  GtmNoScript,
  TrackingScripts,
} from "@/components/analytics/TrackingScripts";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { CallButton } from "@/components/layout/CallButton";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

// Self-hosted (OFL-licensed) so the build never depends on fetching Google
// Fonts, which fails in some CI environments.
const barlowCondensed = localFont({
  src: [
    {
      path: "./fonts/barlow-condensed-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/barlow-condensed-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/barlow-condensed-latin-800-normal.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-barlow-condensed",
});

const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Window Cleaning & Pressure Washing in Victoria, BC | ${siteConfig.shortName}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    // Resolves per-page: every route gets a self-referencing canonical.
    canonical: "./",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: siteConfig.name,
    title: `Window Cleaning & Pressure Washing in Victoria, BC | ${siteConfig.shortName}`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}, exterior cleaning in Victoria, BC`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Window Cleaning & Pressure Washing in Victoria, BC | ${siteConfig.shortName}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  // Legacy-but-harmless geo tags for local SEO (Section 10.5).
  other: {
    "geo.region": `${siteConfig.address.country}-${siteConfig.address.region}`,
    "geo.placename": siteConfig.address.locality,
    ICBM: `${siteConfig.geo.lat}, ${siteConfig.geo.lng}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071E38",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <body>
        <GtmNoScript />
        <SkipLink />
        <Header />
        {/* Bottom padding reserves space for the mobile sticky call bar. */}
        <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
          <main id="main-content">{children}</main>
          <Footer />
        </div>
        <StickyCallBar />
        <CallButton />
        {/* No pixels configured → no cookies set → no banner needed. */}
        {analyticsConfigured && <ConsentBanner />}
        <TrackingScripts />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
