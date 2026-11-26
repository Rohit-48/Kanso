import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/site/code-block";
import { Code, H2, P, PageHeader } from "@/components/site/prose";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/ui/table";

export const metadata: Metadata = { title: "Theming" };

const tokens = [
  ["background / foreground", "Page surface and default text."],
  ["card, popover", "Raised surfaces: cards, menus, dialogs."],
  ["primary", "The main action. Near-black in light mode, near-white in dark."],
  [
    "secondary, muted, accent",
    "Quiet fills for secondary buttons, hover states and disabled areas.",
  ],
  [
    "muted-foreground",
    "Supporting text: descriptions, placeholders, captions.",
  ],
  ["destructive, success", "The only two hues by default. Used sparingly."],
  ["border, input, ring", "Hairlines, field borders and the focus ring."],
  ["--radius", "One number. sm, md, lg and xl are derived from it."],
];

export default function Theming() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow="Getting started"
        title="Theming"
        description="Every colour is a CSS variable. Change a variable and every component follows."
      />
      <P>
        Components never use raw colours such as <Code>bg-zinc-900</Code>. They
        use semantic names such as <Code>bg-primary</Code> and{" "}
        <Code>text-muted-foreground</Code>, which Tailwind maps to the variables
        below.
      </P>

      <H2>Tokens</H2>
      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Token</TableHead>
              <TableHead>Used for</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map(([t, d]) => (
              <TableRow key={t}>
                <TableCell className="pl-4 font-mono text-xs">{t}</TableCell>
                <TableCell className="whitespace-normal text-muted-foreground">
                  {d}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <H2>Adding a colour</H2>
      <P>
        Define it for both modes, then expose it to Tailwind inside{" "}
        <Code>@theme inline</Code>.
      </P>
      <CodeBlock
        lang="css"
        code={`:root  { --warning: oklch(0.8 0.15 85); }
.dark  { --warning: oklch(0.75 0.14 85); }

@theme inline {
  --color-warning: var(--warning);
}`}
      />
      <P>
        Now <Code>bg-warning</Code>, <Code>text-warning</Code> and{" "}
        <Code>border-warning/30</Code> all work.
      </P>

      <H2>Dark mode</H2>
      <P>
        The site toggles a <Code>.dark</Code> class on <Code>&lt;html&gt;</Code>{" "}
        with <Code>next-themes</Code>. Tailwind is told to use that class:
      </P>
      <CodeBlock
        lang="css"
        code={`@custom-variant dark (&:where(.dark, .dark *));`}
      />

      <H2>Radius</H2>
      <P>
        Set <Code>--radius</Code> once. <Code>0rem</Code> gives sharp corners,{" "}
        <Code>0.75rem</Code> gives soft ones. Try it in the{" "}
        <Link href="/themes" className="underline underline-offset-4">
          theme builder
        </Link>
        .
      </P>
    </div>
  );
}
