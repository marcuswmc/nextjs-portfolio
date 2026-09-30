import {
  amiamieRegular,
  amiamieItalic,
  amiamieLight,
  amiamieLightItalic,
  amiamieBlack,
  amiamieBlackItalic,
  amiamieRoundRegular,
  amiamieRoundBlack,
  amiamieRoundBlackItalic,
} from "./fonts/fonts";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { HashScroll } from "@/components/navigation/HashScroll";
import { Navbar } from "@/sections/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Marcus Vinicius — Creative & AI Developer",
    template: "%s — Marcus Vinicius",
  },
  description:
    "Creative Developer and AI Developer based in Porto. 3D web experiences, motion, AI products and automations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${amiamieRegular.variable}
          ${amiamieItalic.variable}
          ${amiamieLight.variable}
          ${amiamieLightItalic.variable}
          ${amiamieBlack.variable}
          ${amiamieBlackItalic.variable}
          ${amiamieRoundRegular.variable}
          ${amiamieRoundBlack.variable}
          ${amiamieRoundBlackItalic.variable}
          antialiased
        `}
      >
        <SmoothScroll>
          <SiteHeader />
          <Navbar />
          <HashScroll />
          <main className="relative w-full min-h-screen overflow-x-clip">{children}</main>
          <SiteFooter />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
