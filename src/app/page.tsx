import Link from "next/link";
import {
  AccessibilityIcon,
  BlocksIcon,
  CodeIcon,
  FeatherIcon,
  PaletteIcon,
  TerminalIcon,
} from "lucide-react";
import { Bento } from "@/components/site/landing/bento";
import { Cta } from "@/components/site/landing/cta";
import { Hero } from "@/components/site/landing/hero";
import { Marquee } from "@/components/site/landing/marquee";
import { Stats } from "@/components/site/landing/stats";
import {
  ScrambleText,
  SectionLabel,
  Stagger,
  StaggerItem,
} from "@/components/site/motion";
import { blockEntries, registry } from "@/lib/registry";
import { siteUrl } from "@/lib/site";

const principles = [
  {
    icon: CodeIcon,
    title: "You own the code",
    text: "Each component is one file in your repo. Change anything, with no wrapper to fight.",
  },
  {
    icon: FeatherIcon,
    title: "Quiet by default",
    text: "Hairline borders, a neutral palette and small shadows. The content stays in front.",
  },
  {
    icon: AccessibilityIcon,
    title: "Accessible",
    text: "Built on Radix primitives: focus management, keyboard support and ARIA included.",
  },
  {
    icon: PaletteIcon,
    title: "Themeable",
    text: "Every colour is an OKLCH variable. Swap a palette or the radius in one place.",
  },
  {
    icon: TerminalIcon,
    title: "CLI ready",
    text: "Served in the shadcn registry format. One command adds a component and its dependencies.",
  },
  {
    icon: BlocksIcon,
    title: "Blocks",
    text: "Sign-in, stats, settings and inbox sections, composed and ready to drop in.",
  },
];

export default function Home() {
  return (
    <main>
      <Hero
        count={registry.length}
        installArgs={`add ${siteUrl}/r/button.json`}
      />

      <Stats
        items={[
          { value: registry.length, label: "Components" },
          { value: blockEntries.length, label: "Blocks" },
          { value: 6, label: "Theme presets" },
          { value: 1, suffix: " file", label: "Per component, yours to edit" },
        ]}
      />

      <Bento />

      <section className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="mb-12 grid max-w-2xl gap-3">
            <SectionLabel index="02">Principles</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
              Less to learn, less to override, less to ship.
            </h2>
          </div>
          <Stagger className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="group bg-background transition-colors hover:bg-muted/30"
              >
                <StaggerItem className="grid content-start gap-4 p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center border bg-card transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
                      <Icon className="size-4" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                      P.{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="grid gap-1.5">
                    <h3 className="font-mono text-xs tracking-[0.16em] uppercase">
                      <ScrambleText text={title} trigger="view" />
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {text}
                    </p>
                  </div>
                </StaggerItem>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-y bg-muted/20 py-16">
        <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between gap-4 px-4 sm:px-6">
          <SectionLabel index="03">Every component</SectionLabel>
          <Link
            href="/docs/components"
            className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase hover:text-foreground"
          >
            View all →
          </Link>
        </div>
        <Marquee items={registry.map(({ name, title }) => ({ name, title }))} />
      </section>

      <Cta />
    </main>
  );
}
