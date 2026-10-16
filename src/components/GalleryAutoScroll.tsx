"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useReducedMotion } from "motion/react";
import type { GalleryImage } from "@/config";
import { Img } from "@/components/Img";

type Props = {
  images: GalleryImage[];
  onOpen: (index: number) => void;
};

const BASE_SPEED = 0.45;
const FRICTION = 0.95;
const MIN_VELOCITY = 0.08;
const DRAG_THRESHOLD = 8;

export function GalleryAutoScroll({ images, onOpen }: Props) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const dirRef = useRef(1);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const movedRef = useRef(false);
  const loopWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hint, setHint] = useState(true);

  const wrapOffset = useCallback(() => {
    const loop = loopWidthRef.current;
    if (loop <= 0) return;
    while (offsetRef.current >= loop) offsetRef.current -= loop;
    while (offsetRef.current < 0) offsetRef.current += loop;
  }, []);

  const paint = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    wrapOffset();
    el.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  }, [wrapOffset]);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    loopWidthRef.current = el.scrollWidth / 2;
    paint();
  }, [paint]);

  useEffect(() => {
    measure();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [images, measure]);

  useEffect(() => {
    if (reduce) return;

    const tick = () => {
      if (!draggingRef.current) {
        const v = velocityRef.current;
        if (Math.abs(v) > MIN_VELOCITY) {
          // Momentum after a flick
          offsetRef.current += v;
          velocityRef.current *= FRICTION;
          if (Math.abs(velocityRef.current) <= MIN_VELOCITY) {
            velocityRef.current = 0;
            dirRef.current = v >= 0 ? 1 : -1;
          }
          paint();
        } else {
          // Gentle auto-scroll
          offsetRef.current += BASE_SPEED * dirRef.current;
          paint();
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [paint, reduce]);

  const clearResume = () => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Only primary button / touch
    if (e.button !== 0 && e.pointerType === "mouse") return;

    clearResume();
    velocityRef.current = 0;
    draggingRef.current = true;
    movedRef.current = false;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    lastX.current = e.clientX;
    lastT.current = performance.now();
    setHint(false);
    viewportRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;

    const now = performance.now();
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > DRAG_THRESHOLD) movedRef.current = true;

    // Finger moves right → content follows (offset decreases)
    offsetRef.current = dragStartOffset.current - dx;

    const dt = Math.max(1, now - lastT.current);
    // Instantaneous velocity in offset-space (same sign as auto-scroll)
    velocityRef.current = -(e.clientX - lastX.current) / (dt / 16.67);
    lastX.current = e.clientX;
    lastT.current = now;
    paint();
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    try {
      viewportRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // already released
    }

    // Clamp crazy flicks; keep direction for auto-scroll after coast
    velocityRef.current = Math.max(-28, Math.min(28, velocityRef.current));
    if (Math.abs(velocityRef.current) > MIN_VELOCITY) {
      dirRef.current = velocityRef.current >= 0 ? 1 : -1;
    }
  };

  const openAt = (realIndex: number) => {
    if (movedRef.current) return;
    onOpen(realIndex);
  };

  if (reduce) {
    return (
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] snap-x snap-mandatory">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              className="group relative h-56 w-[min(78vw,20rem)] shrink-0 snap-center overflow-hidden rounded-2xl shadow-soft ring-1 ring-brand-navy/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:h-64 sm:w-80"
              aria-label={`Ampliar: ${image.alt}`}
              onClick={() => onOpen(i)}
            >
              <Img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="h-full w-full"
                sizes="(max-width: 640px) 78vw, 320px"
                placeholderLabel={image.alt}
              />
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-brand-navy/55">
          Desliza con el dedo · Toca una foto para ampliarla
        </p>
      </div>
    );
  }

  const loop = [...images, ...images];

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-16"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-16"
        aria-hidden="true"
      />

      <div
        ref={viewportRef}
        className="gallery-drag cursor-grab overflow-hidden active:cursor-grabbing select-none"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Galería de fotos. Arrastra para mover. Toca una foto para ampliarla."
      >
        <div
          ref={trackRef}
          className="flex w-max gap-4 will-change-transform"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {loop.map((image, i) => {
            const realIndex = i % images.length;
            return (
              <div
                key={`${image.src}-${i}`}
                role="button"
                tabIndex={0}
                className="group relative h-56 w-[min(78vw,20rem)] shrink-0 overflow-hidden rounded-2xl shadow-soft ring-1 ring-brand-navy/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:h-64 sm:w-80"
                aria-label={`Ampliar: ${image.alt}`}
                onClick={() => openAt(realIndex)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openAt(realIndex);
                  }
                }}
              >
                <Img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="pointer-events-none h-full w-full"
                  imgClassName="pointer-events-none transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 78vw, 320px"
                  placeholderLabel={image.alt}
                />
              </div>
            );
          })}
        </div>
      </div>

      <p
        className={`mt-4 text-center text-xs text-brand-navy/55 transition ${
          hint ? "opacity-100" : "opacity-70"
        }`}
      >
        Arrastra con el dedo o el mouse · Toca una foto para verla completa
      </p>
    </div>
  );
}
