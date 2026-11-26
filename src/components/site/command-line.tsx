"use client";

import * as React from "react";
import { LayoutGroup, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { spring } from "./motion";
import { CopyButton } from "./copy-button";

const managers = {
  npm: "npx",
  pnpm: "pnpm dlx",
  bun: "bunx --bun",
} as const;

/** Shows a `shadcn` CLI command with a package-manager switcher. */
export function CommandLine({
  args,
  className,
}: {
  args: string;
  className?: string;
}) {
  const id = React.useId();
  const [pm, setPm] = React.useState<keyof typeof managers>("npm");
  const cmd = `${managers[pm]} shadcn@latest ${args}`;
  return (
    <div className={cn("overflow-hidden border bg-muted/30", className)}>
      <LayoutGroup id={id}>
        <div className="flex h-10 items-center gap-1 border-b px-2">
          {(Object.keys(managers) as (keyof typeof managers)[]).map((k) => (
            <button
              key={k}
              onClick={() => setPm(k)}
              className={cn(
                "relative isolate px-2 py-1 font-mono text-[11px] tracking-wider uppercase text-muted-foreground transition-colors hover:text-foreground",
                pm === k && "text-foreground",
              )}
            >
              {pm === k && (
                <motion.span
                  layoutId="pm"
                  transition={spring}
                  className="absolute inset-0 -z-10 bg-background ring-1 ring-border"
                />
              )}
              {k}
            </button>
          ))}
          <CopyButton value={cmd} className="ml-auto" />
        </div>
      </LayoutGroup>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] [scrollbar-width:none]! [&::-webkit-scrollbar]:hidden">
        <code>
          <span className="text-muted-foreground select-none">$ </span>
          <motion.span
            key={pm}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {cmd}
          </motion.span>
        </code>
      </pre>
    </div>
  );
}
