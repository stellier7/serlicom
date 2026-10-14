"use client";

import { motion, useReducedMotion } from "motion/react";

const bubbles = [
  { left: "8%", top: "22%", size: 10, delay: 0 },
  { left: "18%", top: "68%", size: 6, delay: 0.4 },
  { left: "72%", top: "28%", size: 12, delay: 0.2 },
  { left: "84%", top: "62%", size: 8, delay: 0.7 },
  { left: "45%", top: "18%", size: 5, delay: 1 },
  { left: "60%", top: "78%", size: 9, delay: 0.5 },
];

export function Bubbles() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bubbles.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-white/30 bg-white/15"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
          }}
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -14, 0],
                  opacity: [0.35, 0.8, 0.35],
                }
          }
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      <svg
        className="absolute top-[18%] right-[10%] h-8 w-8 text-brand-yellow/70 max-md:right-[6%] max-md:top-[14%]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2.5 13.8 9.2 20.5 11 13.8 12.8 12 19.5 10.2 12.8 3.5 11l6.7-1.8L12 2.5Z" />
      </svg>
      <svg
        className="absolute top-[55%] left-[8%] h-5 w-5 text-white/45 max-md:top-[12%] max-md:left-[10%]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2.5 13.8 9.2 20.5 11 13.8 12.8 12 19.5 10.2 12.8 3.5 11l6.7-1.8L12 2.5Z" />
      </svg>
    </div>
  );
}
