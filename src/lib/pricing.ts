import { CONFIG, type HomePlan } from "@/config";

export function getPlanPrice(planId: HomePlan["id"]): string {
  if (!CONFIG.pricing.enabled) {
    return CONFIG.labels.quoteWhatsApp;
  }
  return CONFIG.pricing.plans[planId] ?? CONFIG.labels.quoteWhatsApp;
}
