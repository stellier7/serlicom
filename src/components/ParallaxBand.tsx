"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { Img } from "@/components/Img";

type Props = {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  id?: string;
  className?: string;
  overlayClassName?: string;
};

export function ParallaxBand({
  imageSrc,
  imageAlt,
  children,
  id,
  className = "",
  overlayClassName = "bg-gradient-to-b from-brand-navy/85 via-brand-navy/75 to-brand-navy/90",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-12%", "12%"],
  );

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div className="absolute inset-0 -top-[12%] h-[124%] w-full" style={{ y }}>
        <Img
          src={imageSrc}
          alt={imageAlt}
          width={1600}
          height={900}
          className="h-full w-full"
          sizes="100vw"
          placeholderLabel=""
        />
      </motion.div>
      <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
