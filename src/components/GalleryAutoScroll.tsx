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

const BASE_SPEED = 0.45; // px per frame at ~60fps ≈ 27px/s — smooth crawl
const BOOST = 3.2;

export function GalleryAutoScroll({ images, onOpen }: Props) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const dirRef = useRef(1);
  const boostRef = useRef(1);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const movedRef = useRef(false);
  const loopWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // First half of duplicated children = one loop
    loopWidthRef.current = el.scrollWidth / 2;
  }, []);

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
    pausedRef.current = paused || Boolean(reduce);
  }, [paused, reduce]);

  useEffect(() => {
    if (reduce) return;

    const tick = () => {
      const el = trackRef.current;
      const loop = loopWidthRef.current;
      if (el && loop > 0 && !pausedRef.current && !draggingRef.current) {
        offsetRef.current +=
          BASE_SPEED * boostRef.current * dirRef.current;
        // Wrap seamlessly
        if (offsetRef.current >= loop) offsetRef.current -= loop;
        if (offsetRef.current < 0) offsetRef.current += loop;
        el.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce]);

  const applyOffset = useCallback(() => {
    const el = trackRef.current;
    const loop = loopWidthRef.current;
    if (!el) return;
    if (loop > 0) {
      if (offsetRef.current >= loop) offsetRef.current -= loop;
      if (offsetRef.current < 0) offsetRef.current += loop;
    }
    el.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  }, []);

  const nudge = useCallback(
    (dir: -1 | 1) => {
      dirRef.current = dir;
      offsetRef.current += 120 * dir;
      applyOffset();
    },
    [applyOffset],
  );

  const holdBoost = useCallback((dir: -1 | 1, active: boolean) => {
    if (active) {
      dirRef.current = dir;
      boostRef.current = BOOST;
      setPaused(false);
    } else {
      boostRef.current = 1;
    }
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    movedRef.current = false;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 6) movedRef.current = true;
    // Dragging right reveals earlier content → decrease offset
    offsetRef.current = dragStartOffset.current - dx;
    applyOffset();
  };

  const endDrag = () => {
    draggingRef.current = false;
  };

  // Duplicate for seamless loop (skip when reduced motion — native scroll instead)
  const loop = reduce ? images : [...images, ...images];

  if (reduce) {
    return (
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth">
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
          Desliza · Toca una foto para ampliarla
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="gallery-fade pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-16"
        aria-hidden="true"
      />
      <div
        className="gallery-fade pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-16"
        aria-hidden="true"
      />

      <div
        className="cursor-grab overflow-hidden active:cursor-grabbing select-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
      >
        <div
          ref={trackRef}
          className="flex w-max gap-4 will-change-transform"
          style={{ transform: "translate3d(0,0,0)" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {loop.map((image, i) => {
            const realIndex = i % images.length;
            return (
              <button
                key={`${image.src}-${i}`}
                type="button"
                className="group relative h-56 w-[min(78vw,20rem)] shrink-0 overflow-hidden rounded-2xl shadow-soft ring-1 ring-brand-navy/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:h-64 sm:w-80"
                aria-label={`Ampliar: ${image.alt}`}
                onClick={() => {
                  if (movedRef.current) return;
                  onOpen(realIndex);
                }}
              >
                <Img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="h-full w-full"
                  imgClassName="transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 78vw, 320px"
                  placeholderLabel={image.alt}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-white shadow-soft transition hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          aria-label="Desplazar a la izquierda"
          onClick={() => nudge(-1)}
          onPointerDown={() => holdBoost(-1, true)}
          onPointerUp={() => holdBoost(-1, false)}
          onPointerLeave={() => holdBoost(-1, false)}
          onPointerCancel={() => holdBoost(-1, false)}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="rounded-full border border-brand-navy/15 bg-soft-grey px-4 py-2 text-xs font-semibold tracking-wide text-brand-navy/80 uppercase transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
        >
          {paused || reduce ? "Reanudar" : "Pausar"}
        </button>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-white shadow-soft transition hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          aria-label="Desplazar a la derecha"
          onClick={() => nudge(1)}
          onPointerDown={() => holdBoost(1, true)}
          onPointerUp={() => holdBoost(1, false)}
          onPointerCancel={() => holdBoost(1, false)}
          onPointerLeave={() => holdBoost(1, false)}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-brand-navy/55">
        Arrastra o usa las flechas · Toca una foto para ampliarla
      </p>
    </div>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} aria-hidden="true">
      <path d="M15 18 9 12l6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} aria-hidden="true">
      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
