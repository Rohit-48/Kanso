"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGroup,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { ScrambleText, spring } from "./motion";
import { mainNav } from "./nav";
import { Search } from "./search";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  const isActive = (href: string) =>
    href === "/docs"
      ? pathname === "/docs" ||
        (pathname.startsWith("/docs/") &&
          !pathname.startsWith("/docs/components"))
      : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-border/60 bg-background/0",
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <MobileNav />
        <Logo />
        <span className="hidden border px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-muted-foreground lg:inline">
          v0.1
        </span>
        <LayoutGroup id="main-nav">
          <nav
            className="ml-4 hidden h-14 items-stretch md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {mainNav.map((item, i) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHovered(item.href)}
                  className={cn(
                    "relative isolate flex items-center gap-1.5 px-3.5 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-foreground",
                    active && "text-foreground",
                  )}
                >
                  {hovered === item.href && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-x-0 inset-y-2.5 -z-10 bg-accent"
                      transition={spring}
                    />
                  )}
                  <span className="text-[9px] text-muted-foreground/70">
                    0{i + 1}
                  </span>
                  <ScrambleText
                    text={item.title}
                    trigger="hover"
                    duration={350}
                  />
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground"
                      transition={spring}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </LayoutGroup>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <Search />
          </div>
          <ThemeToggle />
        </div>
      </div>
      {/* reading progress */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-foreground/70"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.header>
  );
}
