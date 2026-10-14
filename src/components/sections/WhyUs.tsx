"use client";

import { motion, useReducedMotion } from "motion/react";
import { CONFIG } from "@/config";
import { BenefitGlyph } from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

export function WhyUs() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-soft-grey py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand-blue uppercase">
            {CONFIG.copy.whyEyebrow}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-brand-navy sm:text-4xl">
            {CONFIG.copy.whyTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/75">
            {CONFIG.copy.whySubtitle}
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2">
          {CONFIG.benefits.map((benefit) => (
            <StaggerItem key={benefit.title}>
              <article className="card-lift flex h-full gap-4 rounded-2xl bg-white p-6 shadow-soft ring-1 ring-brand-navy/8">
                <motion.span
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-yellow/25 text-brand-navy"
                  whileHover={reduce ? undefined : { rotate: [0, -6, 6, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <BenefitGlyph name={benefit.icon} className="h-7 w-7" />
                </motion.span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-brand-navy">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
                    {benefit.description}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
