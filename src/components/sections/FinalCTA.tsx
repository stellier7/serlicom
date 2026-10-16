"use client";

import { CONFIG } from "@/config";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { ParallaxBand } from "@/components/ParallaxBand";
import { QuoteForm } from "@/components/QuoteForm";
import { telLink, waLink } from "@/lib/whatsapp";

export function FinalCTA() {
  return (
    <ParallaxBand
      id="contacto"
      imageSrc={CONFIG.images.parallax2}
      imageAlt={CONFIG.copy.ctaTitle}
      className="scroll-mt-20 py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand-yellow uppercase">
            {CONFIG.copy.ctaEyebrow}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">
            {CONFIG.copy.ctaTitle}
          </h2>
          <p className="mt-3 max-w-md text-base text-white/85">
            {CONFIG.copy.ctaSubtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink(CONFIG.defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-3.5 text-base font-semibold text-white shadow-soft transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {CONFIG.labels.quoteWhatsAppLong}
            </a>
            <a
              href={telLink()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              <PhoneIcon className="h-5 w-5" />
              {CONFIG.labels.callCta} {CONFIG.phoneDisplay}
            </a>
          </div>
        </div>

        <QuoteForm />
      </div>
    </ParallaxBand>
  );
}
