"use client";

import { CONFIG } from "@/config";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { getPlanPrice } from "@/lib/pricing";
import { waLink } from "@/lib/whatsapp";

export function HomePlans() {
  return (
    <section id="hogar" className="scroll-mt-20 bg-soft-grey py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand-blue uppercase">
            {CONFIG.copy.homeEyebrow}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-brand-navy sm:text-4xl">
            {CONFIG.copy.homeTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/75">
            {CONFIG.copy.homeSubtitle}
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
          {CONFIG.homePlans.map((plan) => {
            const price = getPlanPrice(plan.id);
            return (
              <StaggerItem key={plan.id}>
                <article className="card-lift flex h-full flex-col rounded-2xl bg-white p-6 shadow-soft ring-1 ring-brand-navy/8">
                  <h3 className="font-heading text-2xl font-extrabold text-brand-navy">
                    {plan.name}
                  </h3>
                  <p className="mt-3 font-heading text-lg font-bold text-brand-blue">
                    {price}
                  </p>
                  <ul className="mt-5 flex-1 space-y-3">
                    {plan.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm text-brand-navy/80"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-yellow/30 text-brand-navy">
                          <CheckIcon className="h-3.5 w-3.5" />
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(
                      `Hola ${CONFIG.businessName.split(" ")[0]}, quiero cotizar: Limpieza de casas — plan ${plan.name}`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {CONFIG.labels.quoteWhatsApp}
                  </a>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
