"use client";

import { useState } from "react";
import { CONFIG } from "@/config";
import { BeforeAfter } from "@/components/BeforeAfter";
import { GalleryAutoScroll } from "@/components/GalleryAutoScroll";
import { Lightbox } from "@/components/Lightbox";
import { Reveal } from "@/components/Reveal";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const images = CONFIG.gallery;

  return (
    <section id="galeria" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand-blue uppercase">
            {CONFIG.copy.galleryEyebrow}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-brand-navy sm:text-4xl">
            {CONFIG.copy.galleryTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/75">
            {CONFIG.copy.gallerySubtitle}
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-10">
        <GalleryAutoScroll images={images} onOpen={setIndex} />
      </Reveal>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {CONFIG.beforeAfter.length > 0 && (
          <Reveal className="mt-12">
            <h3 className="font-heading text-2xl font-extrabold text-brand-navy">
              {CONFIG.copy.beforeAfterTitle}
            </h3>
            <p className="mt-2 text-sm text-brand-navy/70">
              {CONFIG.copy.beforeAfterSubtitle}
            </p>
            <BeforeAfter pairs={CONFIG.beforeAfter} />
          </Reveal>
        )}
      </div>

      <Lightbox
        images={images}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </section>
  );
}
