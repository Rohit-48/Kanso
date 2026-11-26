"use client";

import * as React from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { CodeIcon, EyeIcon, RotateCcwIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Brackets, ease, spring } from "./motion";

export function ComponentPreview({
  preview,
  code,
  className,
  align = "center",
}: {
  preview: React.ReactNode;
  code: React.ReactNode;
  className?: string;
  align?: "center" | "start";
}) {
  const id = React.useId();
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [key, setKey] = React.useState(0);
  return (
    <div className={cn("grid gap-3", className)}>
      <div className="flex items-center justify-between border-b">
        <LayoutGroup id={id}>
          <div className="flex gap-5 text-sm">
            {(["preview", "code"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "relative flex items-center gap-1.5 pb-2.5 font-mono text-[11px] tracking-[0.16em] uppercase text-muted-foreground transition-colors hover:text-foreground [&_svg]:size-3.5",
                  tab === t && "text-foreground",
                )}
              >
                {t === "preview" ? <EyeIcon /> : <CodeIcon />}
                {t}
                {tab === t && (
                  <motion.span
                    layoutId="preview-tab"
                    transition={spring}
                    className="absolute inset-x-0 -bottom-px h-px bg-foreground"
                  />
                )}
              </button>
            ))}
          </div>
        </LayoutGroup>
        {tab === "preview" && (
          <motion.button
            whileTap={{ rotate: -180 }}
            transition={spring}
            onClick={() => setKey((k) => k + 1)}
            aria-label="Replay preview"
            className="mb-1.5 inline-flex size-7 items-center justify-center border border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground [&_svg]:size-3.5"
          >
            <RotateCcwIcon />
          </motion.button>
        )}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
          transition={{ duration: 0.22, ease }}
        >
          {tab === "preview" ? (
            <div
              className={cn(
                "relative flex min-h-80 w-full justify-center overflow-hidden border bg-background p-6 sm:p-10",
                align === "center" ? "items-center" : "items-start",
              )}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)] bg-[size:16px_16px]"
              />
              <Brackets size={10} />
              <span className="absolute top-3 left-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Live
              </span>
              <span className="absolute right-4 bottom-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Rev. {String(key + 1).padStart(2, "0")}
              </span>
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.97, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="relative flex w-full justify-center"
              >
                {preview}
              </motion.div>
            </div>
          ) : (
            code
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
