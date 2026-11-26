"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRightIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarGroup } from "@/registry/ui/avatar";
import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card";
import { Checkbox } from "@/registry/ui/checkbox";
import { Input } from "@/registry/ui/input";
import { Kbd, KbdGroup } from "@/registry/ui/kbd";
import { Label } from "@/registry/ui/label";
import { Progress } from "@/registry/ui/progress";
import { Separator } from "@/registry/ui/separator";
import { Slider } from "@/registry/ui/slider";
import { Spinner } from "@/registry/ui/spinner";
import { Switch } from "@/registry/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs";
import { CommandLine } from "../command-line";
import {
  Brackets,
  Crosshair,
  ease,
  Reveal,
  ScanLine,
  ScrambleText,
  WordReveal,
} from "../motion";

const cardIn = (i: number) => ({
  initial: { opacity: 0, y: 40, scale: 0.96, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  transition: { duration: 0.9, ease, delay: 0.35 + i * 0.12 },
});

export function Hero({
  count,
  installArgs,
}: {
  count: number;
  installArgs: string;
}) {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b">
      <Crosshair className="relative">
        <ScanLine duration={7} />
        {/* grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)] bg-[size:56px_56px]"
        />
        {/* soft halo */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--foreground)_8%,transparent),transparent)]"
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-4 pt-20 pb-24 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:pt-28 lg:pb-32">
          <motion.div style={{ opacity: fade }} className="grid gap-7">
            <Reveal className="grid gap-4">
              <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                <span className="text-foreground">[00]</span>
                <span className="h-px w-10 bg-foreground/40" />
                <ScrambleText
                  text="Interface primitives for React"
                  duration={900}
                />
              </div>
              <Link
                href="/docs/components/empty"
                className="group inline-flex w-fit items-center gap-2 border bg-background/70 py-1 pr-3 pl-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase backdrop-blur transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                <span className="bg-foreground px-1.5 py-0.5 font-medium text-background">
                  New
                </span>
                Empty · Kbd · Spinner
                <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>

            <h1 className="text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-[4.25rem]">
              <WordReveal text="Components with" delay={0.1} />
              <br />
              <WordReveal
                text="nothing left"
                delay={0.25}
                className="text-muted-foreground"
              />{" "}
              <WordReveal
                text="to remove."
                delay={0.37}
                className="text-muted-foreground"
              />
            </h1>

            <Reveal delay={0.45}>
              <p className="max-w-md text-lg leading-relaxed text-pretty text-muted-foreground">
                {count} minimal, accessible React components. Copy them into
                your app, or add them with one command. Then they&apos;re yours.
              </p>
            </Reveal>

            <Reveal delay={0.55} className="flex flex-wrap gap-2">
              <Button
                asChild
                size="lg"
                className="group rounded-none font-mono text-xs tracking-[0.14em] uppercase"
              >
                <Link href="/docs">
                  Get started
                  <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-none bg-background/60 font-mono text-xs tracking-[0.14em] uppercase backdrop-blur"
              >
                <Link href="/docs/components">Browse components</Link>
              </Button>
            </Reveal>

            <Reveal delay={0.65}>
              <CommandLine
                args={installArgs}
                className="max-w-lg bg-background/70 backdrop-blur"
              />
            </Reveal>
          </motion.div>

          {/* Live collage with parallax */}
          <div className="relative">
            <div className="absolute -inset-4 hidden sm:block">
              <Brackets size={14} />
              <span className="absolute -top-6 left-0 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Live preview · interactive
              </span>
              <span className="absolute right-0 -bottom-6 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Fig. 01
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div style={{ y: yA }} className="sm:row-span-2">
                <motion.div {...cardIn(0)}>
                  <Card className="gap-5 shadow-xl shadow-black/[0.04]">
                    <CardHeader>
                      <CardTitle>Create an account</CardTitle>
                      <CardDescription>
                        It takes less than a minute.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="h-email">Email</Label>
                        <Input id="h-email" placeholder="you@example.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="h-pass">Password</Label>
                        <Input
                          id="h-pass"
                          type="password"
                          placeholder="••••••••"
                          autoComplete="off"
                        />
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Checkbox id="h-terms" defaultChecked />
                        <Label
                          htmlFor="h-terms"
                          className="font-normal text-muted-foreground"
                        >
                          I agree to the terms
                        </Label>
                      </div>
                    </CardContent>
                    <CardFooter className="grid gap-3">
                      <Button className="w-full">Create account</Button>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <Separator className="flex-1" /> or{" "}
                        <Separator className="flex-1" />
                      </div>
                      <Button variant="outline" className="w-full">
                        <Spinner /> Continue with SSO
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div style={{ y: yB }}>
                <motion.div {...cardIn(1)}>
                  <Card className="gap-4 py-5 shadow-xl shadow-black/[0.04]">
                    <CardHeader className="px-5">
                      <CardDescription>Monthly revenue</CardDescription>
                      <CardTitle className="text-2xl tabular-nums">
                        $48,210
                      </CardTitle>
                      <CardAction>
                        <Badge variant="success">+12.4%</Badge>
                      </CardAction>
                    </CardHeader>
                    <CardContent className="grid gap-3 px-5">
                      <Bars />
                      <Progress value={72} />
                      <p className="text-xs text-muted-foreground">
                        72% of the quarterly goal
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div style={{ y: yC }}>
                <motion.div {...cardIn(2)}>
                  <Card className="gap-4 py-5 shadow-xl shadow-black/[0.04]">
                    <CardContent className="grid gap-4 px-5">
                      <div className="flex items-center justify-between">
                        <Tabs defaultValue="week">
                          <TabsList className="h-8">
                            <TabsTrigger value="day" className="text-xs">
                              Day
                            </TabsTrigger>
                            <TabsTrigger value="week" className="text-xs">
                              Week
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                        <AvatarGroup>
                          {["AK", "MP", "DR"].map((i) => (
                            <Avatar key={i} className="size-7">
                              <AvatarFallback className="text-[10px]">
                                {i}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="h-sw" className="font-normal">
                          Notifications
                        </Label>
                        <Switch id="h-sw" defaultChecked />
                      </div>
                      <Slider defaultValue={[60]} aria-label="Volume" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        Quick search
                        <KbdGroup>
                          <Kbd>⌘</Kbd>
                          <Kbd>K</Kbd>
                        </KbdGroup>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        <Telemetry count={count} />
      </Crosshair>
    </section>
  );
}

/** Tiny bar chart whose bars grow in on load. */
function Bars() {
  const data = [32, 45, 38, 52, 48, 64, 58, 72, 66, 80, 74, 88];
  return (
    <div className="flex h-14 items-end gap-1" aria-hidden>
      {data.map((d, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-[2px] bg-foreground/80 last:bg-foreground"
          style={{ opacity: 0.25 + (i / data.length) * 0.75 }}
          initial={{ height: 0 }}
          animate={{ height: `${d}%` }}
          transition={{ duration: 0.8, ease, delay: 0.9 + i * 0.04 }}
        />
      ))}
    </div>
  );
}

/** Bottom strip of mono readouts, with a live UTC clock. */
function Telemetry({ count }: { count: number }) {
  const clock = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    const tick = () => {
      if (clock.current)
        clock.current.textContent =
          new Date().toISOString().slice(11, 19) + " UTC";
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  const cells = [
    ["Components", String(count).padStart(2, "0")],
    ["Runtime", "React 19"],
    ["Styling", "Tailwind v4"],
    ["Primitives", "Radix"],
    ["License", "MIT"],
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="relative z-10 border-t"
    >
      <div className="mx-auto flex max-w-7xl items-stretch overflow-x-auto px-4 font-mono text-[10px] tracking-[0.18em] uppercase [scrollbar-width:none] sm:px-6">
        {cells.map(([k, v]) => (
          <div
            key={k}
            className="flex shrink-0 items-center gap-2 border-r py-3 pr-5 pl-5 first:pl-0"
          >
            <span className="text-muted-foreground">{k}</span>
            <span className="text-foreground">{v}</span>
          </div>
        ))}
        <div className="ml-auto flex shrink-0 items-center gap-2 py-3 pl-5">
          <span className="size-1.5 animate-pulse bg-success" />
          <span className="text-muted-foreground">Status</span>
          <span className="text-foreground">Stable</span>
          <span className="ml-3 text-muted-foreground tabular-nums" ref={clock}>
            --:--:-- UTC
          </span>
        </div>
      </div>
    </motion.div>
  );
}
