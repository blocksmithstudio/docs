'use client';

import Image from 'next/image';
import React from 'react';

interface ImageButtonProps {
  src: string;
  alt: string;
  href?: string;      // normal navigation
  phref?: string;     // open in new tab
  width?: number;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ImageButton({
  src,
  alt,
  href,
  phref,
  width = 800,
  height = 400,
  title,
  subtitle,
  className = '',
}: ImageButtonProps) {
  const link = phref || href; // determine which link to use

  const card = (
    <div
      className={`
        relative isolate overflow-hidden rounded-xl
        border border-white/10 bg-transparent
        not-prose [&_*::before]:content-none [&_*::after]:content-none
        ${className}
      `}
      style={{ width, height }}
    >
      {/* Base image */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover z-[1] select-none pointer-events-none"
        sizes={`${width}px`}
      />

      {/* Subtle bottom gradient always visible */}
      <div
        className="
          absolute bottom-0 left-0 right-0 z-[2]
          h-2/3 bg-gradient-to-t from-black/50 via-black/40 to-transparent
          pointer-events-none
        "
      />

      {/* Hover overlay */}
      <div
        className="
          absolute inset-0 z-[3]
          bg-black/0 transition-colors
          group-hover:bg-black/30
        "
        aria-hidden
      />

      {/* Text */}
      {(title || subtitle) && (
        <div className="absolute bottom-4 left-4 z-[4] text-white drop-shadow-md">
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
        </div>
      )}
    </div>
  );

  // Handle link behavior
  if (link) {
    const isPopup = Boolean(phref);

    return (
      <a
        href={link}
        target={isPopup ? '_blank' : undefined}
        rel={isPopup ? 'noopener noreferrer' : undefined}
        className="
          group block relative no-underline bg-transparent not-prose
          [&::before]:content-none [&::after]:content-none
          transition-transform hover:scale-[1.02]
        "
      >
        {card}
      </a>
    );
  }

  // no link fallback
  return <div className="group transition-transform hover:scale-[1.02]">{card}</div>;
}
