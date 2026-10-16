"use client";

import { motion, useReducedMotion } from "motion/react";
import { CONFIG } from "@/config";
import { AudienceGlyph } from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

export function WhoWeServe() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand-blue uppercase">
            {CONFIG.copy.audiencesEyebrow}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-brand-navy sm:text-4xl">
            {CONFIG.copy.audiencesTitle}
          </h2>
        </Reveal>

        <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
          {CONFIG.audiences.map((item) => (
            <StaggerItem key={item.name}>
              <div className="group flex flex-col items-center gap-3 rounded-2xl bg-soft-grey px-4 py-6 text-center ring-1 ring-brand-navy/6 transition hover:-translate-y-1 hover:shadow-soft">
                <motion.span
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-blue shadow-soft"
                  whileHover={reduce ? undefined : { rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.45 }}
                >
                  <AudienceGlyph name={item.icon} className="h-8 w-8" />
                </motion.span>
                <p className="font-heading text-sm font-bold text-brand-navy sm:text-base">
                  {item.name}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
