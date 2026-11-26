import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";
import { readBaseCss } from "@/lib/source";
import { CodeBlock } from "@/components/site/code-block";
import { CommandLine } from "@/components/site/command-line";
import { H2, P, PageHeader, Step, Steps } from "@/components/site/prose";

export const metadata: Metadata = { title: "Installation" };

export default async function Installation() {
  const css = await readBaseCss();
  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow="Getting started"
        title="Installation"
        description="Set up a React project with Tailwind CSS v4, then add the base styles and the cn() helper."
      />

      <H2>With the CLI</H2>
      <P>
        If your project already has Tailwind CSS v4, the shadcn CLI does the
        setup. Run init with the Kanso base style, then add components.
      </P>
      <div className="grid gap-3">
        <CommandLine args={`init ${siteUrl}/r/kanso.json`} />
        <CommandLine args={`add ${siteUrl}/r/button.json`} />
      </div>

      <H2>Manual</H2>
      <Steps>
        <Step title="Create a project">
          <CodeBlock
            code="npx create-next-app@latest my-app --ts --tailwind --app"
            lang="bash"
          />
        </Step>
        <Step title="Install the shared dependencies">
          <CodeBlock
            code="npm install radix-ui class-variance-authority clsx tailwind-merge lucide-react"
            lang="bash"
          />
        </Step>
        <Step title="Add the cn() helper">
          <CodeBlock
            title="lib/utils.ts"
            code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
            lang="ts"
          />
        </Step>
        <Step title="Add the tokens to your global CSS">
          <CodeBlock title="app/globals.css" code={css} lang="css" />
        </Step>
        <Step title="Check the path alias">
          <P className="my-0 text-sm text-muted-foreground">
            Components import from{" "}
            <code className="font-mono">@/lib/utils</code> and{" "}
            <code className="font-mono">@/components/ui/*</code>. Make sure{" "}
            <code className="font-mono">@/*</code> points at your source folder
            in <code className="font-mono">tsconfig.json</code>.
          </P>
        </Step>
        <Step title="Add your first component">
          <P className="my-0 text-sm text-muted-foreground">
            Open any component page, copy the source to{" "}
            <code className="font-mono">components/ui/</code>, and import it.
          </P>
        </Step>
      </Steps>
    </div>
  );
}
