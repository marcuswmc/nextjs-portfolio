import localFont from "next/font/local";

export const amiamieRegular = localFont({
  src: "./amiamie-regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-normal",
  display: "swap",
});

export const amiamieLight = localFont({
  src: "./amiamie-light.woff2",
  weight: "300",
  style: "normal",
  variable: "--font-light",
  display: "swap",
});

export const amiamieLightItalic = localFont({
  src: "./amiamie-light-italic.woff2",
  weight: "300",
  style: "italic",
  variable: "--font-light-italic",
  display: "swap",
});
