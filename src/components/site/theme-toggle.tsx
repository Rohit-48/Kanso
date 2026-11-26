"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/registry/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // false during SSR, true after hydration: avoids an icon mismatch
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const dark = mounted && resolvedTheme === "dark";
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle theme"
      className="overflow-hidden rounded-none border border-transparent hover:border-border"
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ y: -20, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: 20, rotate: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="flex"
        >
          {dark ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
