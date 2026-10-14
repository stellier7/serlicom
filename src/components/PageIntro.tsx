"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { CONFIG } from "@/config";

export function PageIntro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(!reduce);

  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => setShow(false), 900);
    return () => window.clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-brand-navy"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          aria-hidden="true"
        >
          <motion.img
            src={CONFIG.images.logo}
            alt=""
            width={120}
            height={120}
            className="h-24 w-24 object-contain"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
