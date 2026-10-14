"use client";

import { motion, useReducedMotion } from "motion/react";
import { CONFIG } from "@/config";
import { Reveal } from "@/components/Reveal";
import { waLink } from "@/lib/whatsapp";

export function Coverage() {
  const reduce = useReducedMotion();
  const chips = [...CONFIG.areasServed, CONFIG.labels.otherZoneChip];

  return (
    <section
      id="cobertura"
      className="relative scroll-mt-20 overflow-hidden bg-brand-navy py-16 sm:py-20"
    >
      <div className="coverage-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand-yellow uppercase">
            {CONFIG.copy.coverageEyebrow}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">
            {CONFIG.copy.coverageTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-white/80">
            {CONFIG.copy.coverageSubtitle}
          </p>
        </Reveal>

        <ul className="mt-8 flex flex-wrap gap-3">
          {chips.map((chip, i) => {
            const isOther = chip === CONFIG.labels.otherZoneChip;
            const content = (
              <motion.span
                className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                  isOther
                    ? "bg-brand-yellow text-brand-navy"
                    : "border border-white/20 bg-white/10 text-white"
                }`}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={reduce ? undefined : { scale: 1.04 }}
              >
                {chip}
              </motion.span>
            );

            return (
              <li key={chip}>
                {isOther ? (
                  <a
                    href={waLink(
                      `Hola ${CONFIG.businessName.split(" ")[0]}, estoy en otra zona y quiero consultar cobertura`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
