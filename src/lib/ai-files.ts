import { readFile } from "node:fs/promises";
import path from "node:path";
import type { AiFile, AiItem } from "@/content/ai";
import { highlight } from "@/lib/highlight";

export type ResolvedAiFile = { name: string; lang: AiFile["lang"]; code: string; html: string };

async function fetchRemote(url: string) {
  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.text();
  } catch {
    // Keep the build green if GitHub is unreachable; the page links to the source anyway
    return `# Couldn't load this file at build time\n\nOpen it on GitHub: ${url}\n`;
  }
}

async function readSource(file: AiFile) {
  if (file.content !== undefined) return file.content;
  let code: string;
  if (file.remoteUrl) code = await fetchRemote(file.remoteUrl);
  else if (file.sourcePath) code = await readFile(path.join(process.cwd(), file.sourcePath), "utf8");
  else return "";
  if (file.from) {
    const start = code.indexOf(file.from);
    if (start >= 0) code = code.slice(start);
  }
  if (file.to) {
    const end = code.indexOf(file.to);
    if (end >= 0) code = code.slice(0, end);
  }
  return code.trim() + "\n";
}

/** Server-only: reads each file's content (build time) and highlights it. */
export async function resolveAiFiles(item: AiItem): Promise<ResolvedAiFile[]> {
  return Promise.all(
    item.files.map(async (file) => {
      const code = await readSource(file);
      return { name: file.name, lang: file.lang, code, html: await highlight(code, file.lang) };
    })
  );
}

/** Server-only: the primary file's text, for copy buttons on cards. */
export async function primaryContent(item: AiItem) {
  return item.files[0] ? readSource(item.files[0]) : "";
}
