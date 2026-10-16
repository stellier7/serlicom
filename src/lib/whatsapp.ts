import { CONFIG } from "@/config";

export function waLink(message?: string): string {
  const base = `https://wa.me/${CONFIG.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function defaultQuoteMessage(): string {
  return CONFIG.defaultWhatsAppMessage;
}

export function telLink(): string {
  return `tel:${CONFIG.phoneE164}`;
}

export function mailtoLink(): string {
  return `mailto:${CONFIG.email}`;
}
