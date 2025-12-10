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
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "Marcus Vinicius",
  description: "Full Stack Web - Creative Developer",
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
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
