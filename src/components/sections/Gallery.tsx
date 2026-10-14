"use client";

import { useState } from "react";
import { CONFIG } from "@/config";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Img } from "@/components/Img";
import { Lightbox } from "@/components/Lightbox";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

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

        <Stagger className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((image, i) => (
            <StaggerItem key={image.src} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group block w-full overflow-hidden rounded-2xl shadow-soft ring-1 ring-brand-navy/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                aria-label={`Ampliar: ${image.alt}`}
              >
                <Img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholderLabel={image.alt}
                />
              </button>
            </StaggerItem>
          ))}
        </Stagger>

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
