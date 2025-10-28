import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  const showTitle = page.data.showTitle ?? true;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      {showTitle && <DocsTitle>{page.data.title}</DocsTitle>}
      {showTitle && page.data.description && (
        <DocsDescription>{page.data.description}</DocsDescription>
      )}
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const section = (params.slug?.[0] ?? "").trim();

  const pageLabel = page.data.sidebarLabel ?? page.data.title;

  const title =
    page.data.seoTitle ??
    (section ? `${section} | ${pageLabel}` : pageLabel);

  return {
    title,
    description: page.data.description,
  };
}
