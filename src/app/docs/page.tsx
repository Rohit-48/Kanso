import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { H2, P, PageHeader } from "@/components/site/prose";
import { Button } from "@/registry/ui/button";

export const metadata: Metadata = { title: "Introduction" };

const faqs = [
  [
    "Why copy code instead of installing a package?",
    "A package decides your styles and your upgrade schedule. When the source sits in your repo, you change a class or a behaviour directly, with no wrapper, override or fork.",
  ],
  [
    "How is this different from shadcn/ui?",
    "It uses the same idea and the same registry format, so the shadcn CLI installs it. The visual language is quieter: hairline borders, smaller shadows, one neutral palette, and a few extras such as Empty, Kbd and Spinner.",
  ],
  [
    "Which frameworks does it work with?",
    'Any React 19 setup with Tailwind CSS v4: Next.js, Vite, Remix, Astro islands. Components that need the browser are marked with "use client".',
  ],
];

export default function DocsHome() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow="Getting started"
        title="Introduction"
        description="Kanso UI is a set of minimal, accessible React components that you copy into your app and own."
      />
      <P>
        <em>Kanso</em> (簡素) is a Japanese design idea: simplicity through
        leaving things out. Each component here has one job, a quiet default
        look, and nothing you need to undo.
      </P>
      <P>
        This is not a library you install from npm. You pick a component, run
        one command or paste one file, and it becomes part of your codebase.
        From then on it is your code.
      </P>

      <H2>What you get</H2>
      <ul className="my-4 grid gap-2 pl-5 text-foreground/80 [&>li]:list-disc [&>li]:pl-1">
        <li>
          29 components built on Radix primitives, so keyboard and screen reader
          support come built in.
        </li>
        <li>
          A token system in OKLCH CSS variables. Dark mode swaps the tokens, not
          the classes.
        </li>
        <li>
          A registry that the shadcn CLI understands, served from{" "}
          <code className="font-mono text-sm">/r</code>.
        </li>
        <li>
          Blocks: larger compositions such as a sign-in form, a stats row and a
          settings page.
        </li>
        <li>A theme builder that writes the CSS for you.</li>
      </ul>

      <H2>FAQ</H2>
      <div className="divide-y border">
        {faqs.map(([q, a]) => (
          <div key={q} className="grid gap-1.5 p-5">
            <h3 className="font-medium">{q}</h3>
            <p className="text-sm leading-6 text-muted-foreground">{a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex gap-2">
        <Button asChild>
          <Link href="/docs/installation">
            Installation <ArrowRightIcon />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/components">Browse components</Link>
        </Button>
      </div>
    </div>
  );
}
