"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { CONFIG } from "@/config";
import { Bubbles } from "@/components/Bubbles";
import { WhatsAppIcon } from "@/components/icons";
import { Img } from "@/components/Img";
import { waLink } from "@/lib/whatsapp";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 sm:items-center sm:pb-24 sm:pt-32"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <div className="relative h-full min-h-[100svh] w-full">
          <Img
            src={CONFIG.images.hero}
            alt={CONFIG.copy.heroTitle}
            width={1920}
            height={1080}
            className="hidden h-full min-h-[100svh] w-full md:block"
            imgClassName="min-h-[100svh]"
            priority
            sizes="100vw"
            placeholderLabel={CONFIG.businessName}
          />
          <Img
            src={CONFIG.images.heroMobile}
            alt={CONFIG.copy.heroTitle}
            width={960}
            height={1280}
            className="h-full min-h-[100svh] w-full md:hidden"
            imgClassName="min-h-[100svh]"
            priority
            sizes="100vw"
            placeholderLabel={CONFIG.businessName}
          />
        </div>
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/70 to-brand-navy/90"
        aria-hidden="true"
      />
      <Bubbles />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
          }}
          className="max-w-2xl"
        >
          <motion.p
            className="mb-3 text-sm font-semibold tracking-[0.18em] text-brand-yellow uppercase"
            variants={
              reduce
                ? undefined
                : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
            }
          >
            {CONFIG.businessName}
          </motion.p>
          <motion.h1
            className="font-heading text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl lg:text-6xl"
            variants={
              reduce
                ? undefined
                : { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }
            }
          >
            {CONFIG.copy.heroTitle}
          </motion.h1>
          <motion.p
            className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg"
            variants={
              reduce
                ? undefined
                : { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }
            }
          >
            {CONFIG.copy.heroSubtitle}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            variants={
              reduce
                ? undefined
                : { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }
            }
          >
            <a
              href={waLink(CONFIG.defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {CONFIG.labels.quoteWhatsAppLong}
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/80 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              {CONFIG.labels.seeServices}
            </a>
          </motion.div>

          <motion.ul
            className="mt-8 flex flex-wrap gap-2"
            variants={
              reduce
                ? undefined
                : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }
            }
          >
            {CONFIG.trustChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/95 backdrop-blur-sm sm:text-sm"
              >
                {chip}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <a
        href="#servicios"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/80 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
        aria-label="Ir a servicios"
      >
        <span className="text-[11px] font-medium tracking-wide uppercase">
          Desliza
        </span>
        <motion.span
          className="block h-8 w-5 rounded-full border-2 border-white/50"
          aria-hidden="true"
        >
          <motion.span
            className="mx-auto mt-1.5 block h-1.5 w-1.5 rounded-full bg-white"
            animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.span>
      </a>
    </section>
  );
}
