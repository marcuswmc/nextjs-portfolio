"use client";

import { useEffect, useRef, useState, type ButtonHTMLAttributes } from "react";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { cn } from "@/lib/utils";

type CopyButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "children"> & {
  value: string;
  label?: string;
  copiedLabel?: string;
};

/** Copies `value` to the clipboard and confirms with a scrambled label swap. */
export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  className,
  onClick,
  ...rest
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn("cursor-pointer", className)}
      {...rest}
    >
      <span aria-live="polite">
        <ScrambleText
          key={copied ? "copied" : "idle"}
          text={copied ? copiedLabel : label}
          trigger={copied ? "mount" : "hover"}
          hoverTarget="button"
        />
      </span>
    </button>
  );
}
