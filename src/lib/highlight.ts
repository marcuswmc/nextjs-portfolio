import { codeToHtml } from "shiki";

/** Highlights code at build time with light/dark themes (switched by CSS variables). */
export function highlight(code: string, lang: "tsx" | "bash" = "tsx") {
  return codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark-default" },
    defaultColor: "light",
  });
}
