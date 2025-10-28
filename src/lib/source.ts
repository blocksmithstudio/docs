// src/lib/source.ts
import { createElement } from "react";
import { icons } from "lucide-react";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx/runtime/next";
import { docs, meta } from "@/.source"; // <- dari source.config.ts

export const source = loader({
  baseUrl: "/",
  // v10: gabungkan koleksi docs + meta
  source: createMDXSource(docs, meta),
  icon(iconName) {
    if (iconName && iconName in icons) {
      return createElement(icons[iconName as keyof typeof icons]);
    }
  },
});
