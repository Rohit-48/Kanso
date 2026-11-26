import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";
import { CodeBlock } from "@/components/site/code-block";
import { CommandLine } from "@/components/site/command-line";
import { Code, H2, P, PageHeader } from "@/components/site/prose";

export const metadata: Metadata = { title: "CLI & registry" };

export default function CliPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow="Getting started"
        title="CLI & registry"
        description="Kanso serves its components in the shadcn registry format, so you can install them with the shadcn CLI."
      />
      <H2>Add a component</H2>
      <P>
        Pass the URL of the item. The CLI installs npm dependencies, any Kanso
        components it needs, and writes the file.
      </P>
      <CommandLine args={`add ${siteUrl}/r/dialog.json`} />

      <H2>Add several</H2>
      <CommandLine
        args={`add ${siteUrl}/r/button.json ${siteUrl}/r/card.json`}
      />

      <H2>Use a namespace</H2>
      <P>
        Register Kanso once in <Code>components.json</Code> and refer to items
        as <Code>@kanso/name</Code>.
      </P>
      <CodeBlock
        lang="json"
        title="components.json"
        code={`{
  "registries": {
    "@kanso": "${siteUrl}/r/{name}.json"
  }
}`}
      />
      <CommandLine args="add @kanso/button @kanso/select @kanso/login-block" />

      <H2>What&apos;s in the registry</H2>
      <P>
        <Code>/r/registry.json</Code> lists every item. Each item file, such as{" "}
        <Code>/r/button.json</Code>, holds the source, its npm dependencies and
        the other items it needs. <Code>/r/kanso.json</Code> is the base style:
        tokens and keyframes.
      </P>
      <P>
        The files are generated from <Code>src/registry</Code> by{" "}
        <Code>npm run registry</Code>, which also runs before every build.
      </P>
    </div>
  );
}
