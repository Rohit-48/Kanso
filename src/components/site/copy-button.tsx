"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.88 }}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
      }}
      className={cn(
        "inline-flex size-7 items-center justify-center overflow-hidden rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&_svg]:size-3.5",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ scale: 0.4, opacity: 0, filter: "blur(4px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          exit={{ scale: 0.4, opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn("flex", copied && "text-success")}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
