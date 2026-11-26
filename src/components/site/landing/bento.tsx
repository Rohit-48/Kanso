"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRightIcon,
  BellIcon,
  FileTextIcon,
  SearchIcon,
  ShapesIcon,
} from "lucide-react";
import { toast } from "sonner";
import DialogDemo from "@/registry/examples/dialog-demo";
import DropdownMenuDemo from "@/registry/examples/dropdown-menu-demo";
import PopoverDemo from "@/registry/examples/popover-demo";
import { Button } from "@/registry/ui/button";
import { Checkbox } from "@/registry/ui/checkbox";
import { Input } from "@/registry/ui/input";
import { Kbd } from "@/registry/ui/kbd";
import { Label } from "@/registry/ui/label";
import { Slider } from "@/registry/ui/slider";
import { Switch } from "@/registry/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Brackets,
  ease,
  ScrambleText,
  SectionLabel,
  Stagger,
  StaggerItem,
} from "../motion";

function Cell({
  index,
  title,
  description,
  className,
  children,
}: {
  index: string;
  title: string;
  description: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <StaggerItem
      className={cn(
        "group relative flex flex-col border bg-card transition-[border-color,box-shadow] duration-300 hover:border-foreground/30",
        className,
      )}
    >
      <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Brackets size={10} animated={false} className="-inset-px" />
      </span>
      <div className="flex items-center justify-between border-b px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
        <span>{index}</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1 bg-foreground/60 transition-colors group-hover:bg-success" />{" "}
          Live
        </span>
      </div>
      <div className="relative flex min-h-56 flex-1 items-center justify-center overflow-hidden p-6 sm:p-8">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] bg-[size:14px_14px] opacity-70"
        />
        <div className="relative">{children}</div>
      </div>
      <div className="border-t px-6 py-4">
        <h3 className="font-mono text-xs tracking-[0.16em] uppercase">
          <ScrambleText text={title} trigger="view" />
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </StaggerItem>
  );
}

export function Bento() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="mb-12 grid max-w-2xl gap-3">
        <SectionLabel index="01">Live, not screenshots</SectionLabel>
        <h2 className="text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
          Click around. Everything here is the real component.
        </h2>
      </div>
      <Stagger className="grid gap-3 md:grid-cols-3" stagger={0.08}>
        <Cell
          index="01 / 04"
          title="Overlays"
          description="Dialogs, menus, popovers and toasts with focus handled for you."
          className="md:col-span-2"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            <DialogDemo />
            <DropdownMenuDemo />
            <PopoverDemo />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast("Event created", {
                      description: "Friday at 10:00",
                      action: { label: "Undo", onClick: () => {} },
                    })
                  }
                >
                  <BellIcon /> Toast
                </Button>
              </TooltipTrigger>
              <TooltipContent>Fires a toast</TooltipContent>
            </Tooltip>
          </div>
        </Cell>

        <Cell
          index="02 / 04"
          title="Keyboard first"
          description="Every control works without a mouse."
        >
          <CommandLoop />
        </Cell>

        <Cell
          index="03 / 04"
          title="One radius"
          description="Change one variable, every corner follows."
        >
          <RadiusMorph />
        </Cell>

        <Cell
          index="04 / 04"
          title="Forms"
          description="Inputs, toggles and sliders that share one focus style."
          className="md:col-span-2"
        >
          <div className="grid w-full max-w-md gap-4 border bg-background p-5 sm:w-[28rem]">
            <div className="grid gap-2">
              <Label htmlFor="b-mail">Email</Label>
              <Input id="b-mail" placeholder="you@example.com" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Checkbox id="b-c" defaultChecked />
                <Label htmlFor="b-c" className="font-normal">
                  Subscribe
                </Label>
              </div>
              <Switch defaultChecked aria-label="Enabled" />
            </div>
            <Slider defaultValue={[35]} aria-label="Amount" />
          </div>
        </Cell>
      </Stagger>
    </section>
  );
}

/** Loops: press ⌘, press K, palette opens, highlight walks the list. */
function CommandLoop() {
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 7), 900);
    return () => clearInterval(t);
  }, []);
  const open = step >= 2;
  const active = Math.min(Math.max(step - 3, 0), 2);
  const items = [
    { icon: ShapesIcon, label: "Button" },
    { icon: ShapesIcon, label: "Dialog" },
    { icon: FileTextIcon, label: "Theming" },
  ];
  return (
    <div className="grid w-56 justify-items-center gap-4">
      <div className="flex gap-1.5">
        {["⌘", "K"].map((k, i) => (
          <motion.span
            key={k}
            animate={
              step === i || (step === 1 && i === 0)
                ? { y: 2, scale: 0.94 }
                : { y: 0, scale: 1 }
            }
            transition={{ type: "spring", stiffness: 600, damping: 20 }}
          >
            <Kbd className="h-7 min-w-7 text-xs">{k}</Kbd>
          </motion.span>
        ))}
      </div>
      <div className="h-36 w-full">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 4, scale: 0.98, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease }}
              className="overflow-hidden rounded-lg border bg-popover text-left shadow-lg shadow-black/5"
            >
              <div className="flex items-center gap-2 border-b px-3 py-2 text-xs text-muted-foreground">
                <SearchIcon className="size-3" /> Search…
              </div>
              <div className="p-1">
                {items.map((it, i) => (
                  <div
                    key={it.label}
                    className="relative isolate flex items-center gap-2 rounded-md px-2 py-1.5 text-xs"
                  >
                    {i === active && (
                      <motion.span
                        layoutId="bento-cmd"
                        className="absolute inset-0 -z-10 rounded-md bg-accent"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                    <it.icon className="size-3.5 text-muted-foreground" />
                    {it.label}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RadiusMorph() {
  const values = [0, 6, 12, 24, 12];
  const [i, setI] = React.useState(2);
  React.useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % values.length), 1400);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const r = values[i];
  return (
    <div className="grid justify-items-center gap-4">
      <div className="flex items-end gap-3">
        {[64, 44, 28].map((size, k) => (
          <motion.div
            key={size}
            className={cn(
              "border bg-background shadow-sm",
              k === 0 && "bg-foreground",
            )}
            style={{ width: size, height: size }}
            animate={{
              borderRadius: Math.min(r * (size / 64) * 1.2, size / 2),
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
        --radius:
        <span className="inline-flex w-14 justify-start overflow-hidden text-foreground">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={r}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
            >
              {+(r / 16).toFixed(3)}rem
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
      <Link
        href="/themes"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        Theme builder <ArrowUpRightIcon className="size-3" />
      </Link>
    </div>
  );
}
