'use client';

import Image from 'next/image';
import { HomeIcon, BookOpenIcon, type LucideIcon } from 'lucide-react';
import * as React from 'react';

const ICONS: Record<string, LucideIcon> = {
  home: HomeIcon,
  docs: BookOpenIcon,
};

interface CardProps {
  title: string;
  href: string;
  children?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  icon?: keyof typeof ICONS;
}

export function Card(props: CardProps) {
  const { title, href, children, imageSrc, imageAlt = '', icon } = props;
  const IconComponent = icon ? ICONS[icon] : undefined;

  return (
    <a
      href={href}
      className="flex items-start gap-3 p-4 rounded-2xl border border-white/10 hover:bg-white/5 transition"
    >
      <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={20}
            height={20}
            className="h-5 w-5"
          />
        ) : IconComponent ? (
          <IconComponent className="h-5 w-5" aria-hidden />
        ) : null}
      </div>

      <div className="min-w-0">
        <div className="font-semibold">{title}</div>
        {children && <p className="text-sm text-white/70">{children}</p>}
      </div>
    </a>
  );
}
