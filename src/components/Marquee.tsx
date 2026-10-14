"use client";

import { CONFIG } from "@/config";

export function Marquee() {
  const items = CONFIG.services.map((s) => s.name);
  const loop = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden border-y border-brand-navy/10 bg-soft-grey py-3"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-navy/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
