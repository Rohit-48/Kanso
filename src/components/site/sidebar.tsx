"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { spring } from "./motion";
import { docsNav } from "./nav";

export function SidebarNav({
  onNavigate,
  id = "sidebar",
}: {
  onNavigate?: () => void;
  id?: string;
}) {
  const pathname = usePathname();
  return (
    <LayoutGroup id={id}>
      <nav className="grid gap-6 text-sm">
        {docsNav.map((section) => (
          <div key={section.title} className="grid gap-0.5">
            <h4 className="flex items-center gap-2 px-2.5 pb-1.5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              {section.title}
            </h4>
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "relative isolate flex items-center gap-2 px-2.5 py-1 text-foreground/65 transition-colors hover:text-foreground",
                    active && "font-medium text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="sidebar-active"
                      transition={spring}
                      className="absolute inset-0 -z-10 bg-accent"
                    >
                      <span className="absolute inset-y-0 left-0 w-0.5 bg-foreground" />
                    </motion.span>
                  )}
                  {item.title}
                  {item.isNew && (
                    <span className="ml-auto border border-success/30 px-1 font-mono text-[9px] tracking-wider text-success uppercase">
                      New
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </LayoutGroup>
  );
}
