import { amiamieRegular, amiamieLight, amiamieLightItalic } from "./fonts/fonts";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { siteDescription, siteName, siteTagline, siteUrl } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { HashScroll } from "@/components/navigation/HashScroll";
import { Navbar } from "@/sections/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — ${siteTagline}`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    locale: "en_US",
    url: "/",
    title: `${siteName} — ${siteTagline}`,
    description: siteDescription,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${amiamieRegular.variable} ${amiamieLight.variable} ${amiamieLightItalic.variable} antialiased`}
      >
        <SmoothScroll>
          <a
            href="#main"
            className="fixed z-[4000] px-4 py-2 text-sm -translate-y-24 rounded-full top-4 left-4 bg-ink text-canvas focus:translate-y-0"
          >
            Skip to content
          </a>
          <SiteHeader />
          <Navbar />
          <HashScroll />
          <main id="main" className="relative w-full min-h-screen overflow-x-clip">
            {children}
          </main>
          <SiteFooter />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
