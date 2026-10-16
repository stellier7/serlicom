"use client";

import { CONFIG } from "@/config";
import { WhatsAppIcon } from "@/components/icons";
import { defaultQuoteMessage, waLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const label = CONFIG.labels.quoteWhatsApp;
  return (
    <a
      href={waLink(defaultQuoteMessage())}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float group fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
      aria-label={label}
      title={label}
    >
      <span className="wa-pulse absolute inset-0 rounded-full bg-whatsapp" aria-hidden="true" />
      <WhatsAppIcon className="relative h-7 w-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-soft transition group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
        {label}
      </span>
    </a>
  );
}
