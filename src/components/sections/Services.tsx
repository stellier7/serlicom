"use client";

import { CONFIG } from "@/config";
import { WhatsAppIcon } from "@/components/icons";
import { Img } from "@/components/Img";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { waLink } from "@/lib/whatsapp";

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand-blue uppercase">
            {CONFIG.copy.servicesEyebrow}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-brand-navy sm:text-4xl">
            {CONFIG.copy.servicesTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/75">
            {CONFIG.copy.servicesSubtitle}
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONFIG.services.map((service) => (
            <StaggerItem key={service.id}>
              <article className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-brand-navy/8">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Img
                    src={service.image}
                    alt={service.name}
                    width={800}
                    height={500}
                    className="h-full w-full transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholderLabel={service.name}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg font-bold text-brand-navy">
                    {service.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-navy/70">
                    {service.shortDescription}
                  </p>
                  <a
                    href={waLink(service.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {CONFIG.labels.quoteCta}
                  </a>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
