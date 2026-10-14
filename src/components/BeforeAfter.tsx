"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BeforeAfterPair } from "@/config";
import { Img } from "@/components/Img";

type Props = {
  pairs: BeforeAfterPair[];
};

export function BeforeAfter({ pairs }: Props) {
  if (pairs.length === 0) return null;

  return (
    <div className="mt-10 grid gap-8 md:grid-cols-2">
      {pairs.map((pair) => (
        <BeforeAfterSlider key={`${pair.before}-${pair.after}`} pair={pair} />
      ))}
    </div>
  );
}

function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const [pos, setPos] = useState(50);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-brand-navy">{pair.alt}</p>
      <div
        ref={ref}
        className="relative aspect-[4/3] cursor-ew-resize touch-none overflow-hidden rounded-2xl shadow-soft select-none"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          updateFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          updateFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
        role="slider"
        aria-label={`Comparar antes y después: ${pair.alt}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
        }}
      >
        <Img
          src={pair.after}
          alt={`${pair.alt} — después`}
          width={1200}
          height={900}
          className="absolute inset-0 h-full w-full"
          placeholderLabel="Después"
        />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <div style={{ width: width || "100%" }} className="relative h-full">
            <Img
              src={pair.before}
              alt={`${pair.alt} — antes`}
              width={1200}
              height={900}
              className="h-full w-full"
              placeholderLabel="Antes"
            />
          </div>
        </div>
        <div
          className="absolute inset-y-0 z-10 w-1 bg-white shadow"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-navy shadow-soft">
            <span className="text-xs font-bold" aria-hidden="true">
              ⟷
            </span>
          </div>
        </div>
        <span className="absolute top-3 left-3 rounded-full bg-brand-navy/80 px-2.5 py-1 text-[11px] font-semibold text-white">
          Antes
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-brand-blue/90 px-2.5 py-1 text-[11px] font-semibold text-white">
          Después
        </span>
      </div>
    </div>
  );
}
