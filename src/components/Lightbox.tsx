"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useCallback } from "react";
import type { GalleryImage } from "@/config";
import { CloseIcon } from "@/components/icons";
import { Img } from "@/components/Img";

type Props = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  const reduce = useReducedMotion();
  const open = index !== null && images[index] != null;
  const current = index !== null ? images[index] : null;

  const go = useCallback(
    (delta: number) => {
      if (index === null || images.length === 0) return;
      const next = (index + delta + images.length) % images.length;
      onIndexChange(next);
    },
    [images.length, index, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose, open]);

  // Touch swipe
  useEffect(() => {
    if (!open) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.changedTouches[0]?.clientX ?? 0;
    };
    const onEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0]?.clientX ?? 0;
      const dx = endX - startX;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [go, open]);

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-navy/92 p-4 backdrop-blur-sm"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Galería ampliada"
          onClick={onClose}
        >
          <button
            type="button"
            className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            aria-label="Cerrar"
            onClick={onClose}
          >
            <CloseIcon className="h-6 w-6" />
          </button>

          <motion.div
            className="relative max-h-[85vh] w-full max-w-4xl"
            initial={reduce ? false : { scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduce ? undefined : { scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Img
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              className="max-h-[75vh] w-full rounded-2xl"
              imgClassName="max-h-[75vh] object-contain"
              priority
            />
            <p className="mt-3 text-center text-sm text-white/80">
              {current.alt} · {index! + 1}/{images.length}
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                onClick={() => go(-1)}
              >
                Anterior
              </button>
              <button
                type="button"
                className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                onClick={() => go(1)}
              >
                Siguiente
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
