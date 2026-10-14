"use client";

import { motion, useReducedMotion } from "motion/react";
import { CONFIG } from "@/config";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { ParallaxBand } from "@/components/ParallaxBand";
import { waLink } from "@/lib/whatsapp";

export function PostConstruction() {
  const reduce = useReducedMotion();

  return (
    <ParallaxBand
      id="post-construccion"
      imageSrc={CONFIG.images.parallax1}
      imageAlt="Limpieza post construcción"
      className="scroll-mt-20 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-brand-yellow uppercase">
            {CONFIG.copy.postEyebrow}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">
            {CONFIG.copy.postTitle}
          </h2>
          <p className="mt-3 text-base text-white/85">
            {CONFIG.copy.postSubtitle}
          </p>
        </div>

        <h3 className="mt-8 font-heading text-lg font-bold text-white">
          {CONFIG.copy.postIncludesTitle}
        </h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {CONFIG.postConstructionIncludes.map((item, i) => (
            <motion.li
              key={item}
              className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm"
              initial={reduce ? false : { opacity: 0, x: -12 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
            >
              <motion.span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-yellow text-brand-navy"
                initial={reduce ? false : { scale: 0.6 }}
                whileInView={reduce ? undefined : { scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 + i * 0.05, type: "spring", stiffness: 260 }}
              >
                <CheckIcon className="h-4 w-4" />
              </motion.span>
              {item}
            </motion.li>
          ))}
        </ul>

        <a
          href={waLink(
            CONFIG.services.find((s) => s.id === "post-construccion")
              ?.whatsappMessage ?? CONFIG.defaultWhatsAppMessage,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shine mt-8 inline-flex items-center gap-2 rounded-xl bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {CONFIG.labels.quoteWhatsApp}
        </a>
      </div>
    </ParallaxBand>
  );
}
