"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type DownloadButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  filename: string;
  content: string;
  label?: string;
};

/** Saves text content as a file, generated in the browser (no server round trip). */
export function DownloadButton({ filename, content, label = "Download", className, ...rest }: DownloadButtonProps) {
  const download = () => {
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
    const link = Object.assign(document.createElement("a"), { href: url, download: filename.split("/").pop() });
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button type="button" onClick={download} className={cn("cursor-pointer", className)} {...rest}>
      {label}
    </button>
  );
}
