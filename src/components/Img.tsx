"use client";

import { useState } from "react";

type ImgProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  onErrorHide?: boolean;
  onLoadError?: () => void;
  placeholderLabel?: string;
};

/**
 * Layout-friendly image wrapper. With next.config images.unoptimized,
 * we avoid the Vercel image optimizer and use a plain <img> with lazy loading.
 */
export function Img({
  src,
  alt,
  width,
  height,
  className = "",
  imgClassName = "",
  priority = false,
  sizes,
  onErrorHide = false,
  onLoadError,
  placeholderLabel,
}: ImgProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (onErrorHide) return null;
    return (
      <div
        className={`img-placeholder ${className}`}
        style={{ aspectRatio: `${width} / ${height}` }}
        role="img"
        aria-label={alt}
      >
        {placeholderLabel ? (
          <span className="img-placeholder__label">{placeholderLabel}</span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`h-full w-full object-cover ${imgClassName}`}
        onError={() => {
          setFailed(true);
          onLoadError?.();
        }}
      />
    </div>
  );
}
