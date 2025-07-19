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
} from "./fonts/fonts.js"; 
import "./globals.css";

export const metadata = {
  title: "Marcus Vinicius",
  description: "My personal portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}
