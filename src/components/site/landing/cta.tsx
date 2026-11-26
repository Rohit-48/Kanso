"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import { Brackets, Reveal, ScanLine, SectionLabel } from "../motion";

export function Cta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <Reveal inView>
        <div className="relative overflow-hidden p-px">
          {/* rotating hairline */}
          <motion.div
            aria-hidden
            className="absolute top-1/2 left-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,var(--color-foreground)_40deg,transparent_90deg,transparent_360deg)] opacity-40"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 border" />
          <div className="relative overflow-hidden bg-background px-6 py-24 text-center">
            <Brackets size={14} />
            <ScanLine duration={5} />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[size:40px_40px] opacity-60"
            />
            <div className="relative">
              <SectionLabel index="04" className="mb-6 justify-center">
                Deploy
              </SectionLabel>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-6xl">
                Start with one component.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                Add a button today. Add the rest when you need them.
              </p>
              <div className="mt-8 flex justify-center gap-2">
                <Button
                  asChild
                  size="lg"
                  className="group rounded-none font-mono text-xs tracking-[0.14em] uppercase"
                >
                  <Link href="/docs/installation">
                    Install{" "}
                    <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="rounded-none font-mono text-xs tracking-[0.14em] uppercase"
                >
                  <Link href="/themes">Try the theme builder</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
