"use client";

import { useEffect, useState } from "react";

type LocalTimeProps = {
  timeZone?: string;
  className?: string;
};

/** Live HH:MM clock for a time zone, with a blinking separator. */
export function LocalTime({ timeZone = "Europe/Lisbon", className }: LocalTimeProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const parts = now
    ? new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone,
      }).formatToParts(now)
    : null;
  const hour = parts?.find((p) => p.type === "hour")?.value ?? "--";
  const minute = parts?.find((p) => p.type === "minute")?.value ?? "--";

  return (
    <time className={`tabular-nums ${className ?? ""}`} suppressHydrationWarning>
      {hour}
      <span className="animate-blink">:</span>
      {minute}
    </time>
  );
}
