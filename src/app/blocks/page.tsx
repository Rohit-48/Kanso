import type { Metadata } from "next";
import { CodeBlock } from "@/components/site/code-block";
import { CommandLine } from "@/components/site/command-line";
import { ComponentPreview } from "@/components/site/component-preview";
import { Reveal } from "@/components/site/motion";
import { PageHeader } from "@/components/site/prose";
import { siteUrl } from "@/lib/site";
import { readSource } from "@/lib/source";
import { blocks } from "@/registry/blocks";

export const metadata: Metadata = { title: "Blocks" };

export default async function BlocksPage() {
  const sources = await Promise.all(
    blocks.map((b) => readSource("blocks", b.name)),
  );
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Blocks"
        title="Building blocks for real screens"
        description="Components composed into sections you can drop into an app. Copy the file, or add it with the CLI and it brings its components along."
      />
      <div className="grid gap-20">
        {blocks.map((b, i) => (
          <Reveal inView key={b.name}>
            <section id={b.name} className="grid scroll-mt-20 gap-4">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h2 className="font-mono text-xs tracking-[0.16em] uppercase">
                    {b.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {b.description}
                  </p>
                </div>
                <code className="font-mono text-xs text-muted-foreground">
                  {b.name}
                </code>
              </div>
              <ComponentPreview
                preview={<b.Component />}
                code={
                  <CodeBlock
                    code={sources[i]}
                    title={`components/${b.name}.tsx`}
                  />
                }
              />
              <CommandLine args={`add ${siteUrl}/r/${b.name}.json`} />
            </section>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
