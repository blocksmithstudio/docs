// source.config.ts
import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";
import { z } from "zod";

const customFrontmatter = frontmatterSchema.extend({
  showTitle: z.boolean().optional().default(true),
  seoTitle: z.string().optional(),        // <- untuk judul tab/browser
  sidebarLabel: z.string().optional(),    // <- kalau mau pakai label ini, bukan title, saat compose otomatis
});

export const { docs, meta } = defineDocs({
  dir: "content/docs",
  docs: { schema: customFrontmatter },
  meta: { schema: metaSchema },
});

export default defineConfig({});