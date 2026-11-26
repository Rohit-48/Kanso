import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { CodeBlock } from "@/components/site/code-block";
import { CommandLine } from "@/components/site/command-line";
import { ComponentPreview } from "@/components/site/component-preview";
import { H2, P, PageHeader, Step, Steps } from "@/components/site/prose";
import { getEntry, pascal, registry } from "@/lib/registry";
import { readSource } from "@/lib/source";
import { examples } from "@/registry/examples";
import { Badge } from "@/registry/ui/badge";

export function generateStaticParams() {
  return registry.map((e) => ({ slug: e.name }));
}

export async function generateMetadata({
  params,
}: PageProps<"/docs/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  return { title: entry?.title, description: entry?.description };
}

export default async function ComponentPage({
  params,
}: PageProps<"/docs/components/[slug]">) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  const Demo = examples[slug];
  const [source, demoSource] = await Promise.all([
    readSource("ui", slug),
    readSource("examples", `${slug}-demo`),
  ]);

  const exported = [...source.matchAll(/^export \{([^}]+)\}/gm)]
    .flatMap((m) => m[1].split(","))
    .map((s) => s.trim())
    .filter((s) => s && !s.endsWith("Variants"));
  const importLine = `import { ${exported.join(", ")} } from "@/components/ui/${slug}";`;

  const idx = registry.findIndex((e) => e.name === slug);
  const prev = registry[idx - 1];
  const next = registry[idx + 1];

  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2">
        <Badge variant="outline">{entry.category}</Badge>
        {entry.isNew && <Badge variant="success">New</Badge>}
      </div>
      <div className="pt-3">
        <PageHeader title={entry.title} description={entry.description} />
      </div>

      <ComponentPreview
        preview={<Demo />}
        code={<CodeBlock code={demoSource} title={`${slug}-demo.tsx`} />}
      />

      <H2 id="installation">Installation</H2>
      <h3 className="mb-3 text-sm font-medium">CLI</h3>
      <CommandLine args={`add ${siteUrl}/r/${slug}.json`} />

      <h3 className="mt-8 mb-4 text-sm font-medium">Manual</h3>
      <Steps>
        {entry.dependencies.length > 0 && (
          <Step title="Install the dependencies">
            <CodeBlock
              code={`npm install ${entry.dependencies.join(" ")}`}
              lang="bash"
            />
          </Step>
        )}
        <Step title="Copy the source into your project">
          <CodeBlock code={source} title={`components/ui/${slug}.tsx`} />
        </Step>
        <Step title="Update the import paths to match your project">
          <P className="my-0 text-sm text-muted-foreground">
            The file imports <code className="font-mono">cn</code> from{" "}
            <code className="font-mono">@/lib/utils</code>. See{" "}
            <Link
              href="/docs/installation"
              className="underline underline-offset-4"
            >
              installation
            </Link>
            .
          </P>
        </Step>
      </Steps>

      <H2 id="usage">Usage</H2>
      <div className="grid gap-3">
        <CodeBlock code={importLine} />
        <CodeBlock code={entry.usage} />
      </div>

      <nav className="mt-16 flex items-center justify-between gap-4 border-t pt-6 text-sm">
        {prev ? (
          <Link
            href={`/docs/components/${prev.name}`}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" />{" "}
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/docs/components/${next.name}`}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            {next.title}{" "}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </nav>
      <span className="sr-only">{pascal(slug)}</span>
    </article>
  );
}
