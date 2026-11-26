"use client";

import * as React from "react";
import { LayoutGroup, motion } from "motion/react";
import { MoonIcon, SunIcon, TriangleAlertIcon } from "lucide-react";
import { spring } from "@/components/site/motion";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/site/copy-button";
import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert";
import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card";
import { Checkbox } from "@/registry/ui/checkbox";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Progress } from "@/registry/ui/progress";
import { Slider } from "@/registry/ui/slider";
import { Switch } from "@/registry/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs";

type Vars = Record<string, string>;
type Preset = {
  name: string;
  hue: number;
  chroma: number;
  accent?: { l: number; c: number; h: number };
};

const presets: Preset[] = [
  { name: "Neutral", hue: 0, chroma: 0 },
  { name: "Stone", hue: 60, chroma: 0.006 },
  { name: "Zinc", hue: 286, chroma: 0.006 },
  {
    name: "Sage",
    hue: 150,
    chroma: 0.008,
    accent: { l: 0.5, c: 0.09, h: 155 },
  },
  {
    name: "Indigo",
    hue: 275,
    chroma: 0.008,
    accent: { l: 0.51, c: 0.2, h: 275 },
  },
  { name: "Rose", hue: 10, chroma: 0.006, accent: { l: 0.58, c: 0.2, h: 12 } },
];

const radii = ["0", "0.25", "0.5", "0.75", "1"];

const ok = (l: number, c: number, h: number, a?: string) =>
  `oklch(${+l.toFixed(3)} ${+c.toFixed(3)} ${h}${a ? ` / ${a}` : ""})`;

function build(p: Preset): { light: Vars; dark: Vars } {
  const g = (l: number) => ok(l, p.chroma, p.hue);
  const a = p.accent;
  const light: Vars = {
    background: ok(1, 0, 0),
    foreground: g(0.17),
    card: ok(1, 0, 0),
    "card-foreground": g(0.17),
    popover: ok(1, 0, 0),
    "popover-foreground": g(0.17),
    primary: a ? ok(a.l, a.c, a.h) : g(0.2),
    "primary-foreground": ok(0.985, 0, 0),
    secondary: g(0.965),
    "secondary-foreground": g(0.2),
    muted: g(0.965),
    "muted-foreground": g(0.52),
    accent: a ? ok(0.96, a.c * 0.15, a.h) : g(0.955),
    "accent-foreground": g(0.2),
    destructive: ok(0.58, 0.22, 27),
    border: g(0.915),
    input: g(0.9),
    ring: a ? ok(a.l, a.c, a.h) : g(0.55),
  };
  const dark: Vars = {
    background: g(0.155),
    foreground: g(0.96),
    card: g(0.18),
    "card-foreground": g(0.96),
    popover: g(0.19),
    "popover-foreground": g(0.96),
    primary: a ? ok(a.l + 0.14, a.c * 0.9, a.h) : g(0.95),
    "primary-foreground": a ? ok(0.15, 0.02, a.h) : g(0.18),
    secondary: g(0.24),
    "secondary-foreground": g(0.96),
    muted: g(0.23),
    "muted-foreground": g(0.68),
    accent: a ? ok(0.26, a.c * 0.2, a.h) : g(0.25),
    "accent-foreground": g(0.96),
    destructive: ok(0.65, 0.2, 25),
    border: ok(1, 0, 0, "9%"),
    input: ok(1, 0, 0, "14%"),
    ring: a ? ok(a.l + 0.1, a.c, a.h) : g(0.6),
  };
  return { light, dark };
}

function toCss(radius: string, { light, dark }: { light: Vars; dark: Vars }) {
  const lines = (v: Vars) =>
    Object.entries(v)
      .map(([k, val]) => `  --${k}: ${val};`)
      .join("\n");
  return `:root {\n  --radius: ${radius}rem;\n${lines(light)}\n}\n\n.dark {\n${lines(dark)}\n}\n`;
}

export function ThemeBuilder() {
  const [preset, setPreset] = React.useState(presets[0]);
  const [radius, setRadius] = React.useState("0.5");
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const theme = React.useMemo(() => build(preset), [preset]);
  const css = toCss(radius, theme);

  const style = {
    "--radius": `${radius}rem`,
    ...Object.fromEntries(
      Object.entries(theme[mode]).map(([k, v]) => [`--${k}`, v]),
    ),
  } as React.CSSProperties;

  return (
    <LayoutGroup id="theme-builder">
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
        <div className="grid content-start gap-6">
          <div className="grid gap-2">
            <Label>Palette</Label>
            <div className="grid grid-cols-3 gap-2">
              {presets.map((p) => {
                const swatch = build(p).light.primary;
                return (
                  <button
                    key={p.name}
                    onClick={() => setPreset(p)}
                    className={cn(
                      "relative isolate flex items-center gap-2 border px-2 py-1.5 font-mono text-[11px] tracking-wider uppercase transition-colors hover:border-foreground/20",
                      preset.name === p.name && "border-transparent",
                    )}
                  >
                    {preset.name === p.name && (
                      <motion.span
                        layoutId="tb-preset"
                        transition={spring}
                        className="absolute -inset-px -z-10 border border-foreground/40 bg-accent"
                      />
                    )}
                    <motion.span
                      className="size-3 rounded-full"
                      style={{ background: swatch }}
                      animate={
                        preset.name === p.name
                          ? { scale: [1, 1.4, 1] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.4 }}
                    />
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Radius</Label>
            <div className="grid grid-cols-5 gap-2">
              {radii.map((r) => (
                <button
                  key={r}
                  onClick={() => setRadius(r)}
                  className={cn(
                    "relative isolate border py-1.5 font-mono text-xs transition-colors hover:border-foreground/20",
                    radius === r && "border-transparent",
                  )}
                >
                  {radius === r && (
                    <motion.span
                      layoutId="tb-radius"
                      transition={spring}
                      className="absolute -inset-px -z-10 border border-foreground/40 bg-accent"
                    />
                  )}
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Preview mode</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["light", "dark"] as const).map((m) => (
                <Button
                  key={m}
                  variant={mode === m ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setMode(m)}
                  className="capitalize"
                >
                  {m === "light" ? <SunIcon /> : <MoonIcon />} {m}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>CSS</Label>
              <CopyButton value={css} />
            </div>
            <pre className="max-h-72 overflow-auto border bg-muted/30 p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
              {css}
            </pre>
            <p className="text-xs text-muted-foreground">
              Paste over the :root and .dark blocks in your global CSS.
            </p>
          </div>
        </div>

        <div
          style={style}
          className={cn(
            "grid content-start gap-4 border bg-background p-4 text-foreground sm:p-6 md:grid-cols-2",
            "[&,&_*]:transition-[background-color,border-color,color,border-radius] [&,&_*]:duration-500",
            mode === "dark" && "scheme-dark",
          )}
        >
          <Card>
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>
                Deploy a new project in one click.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tb-name">Name</Label>
                <Input id="tb-name" placeholder="my-app" />
              </div>
              <div className="flex items-center gap-2.5">
                <Checkbox id="tb-c" defaultChecked />
                <Label htmlFor="tb-c">Use the default template</Label>
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="ghost">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>

          <div className="grid content-start gap-4">
            <Card className="gap-4">
              <CardHeader>
                <CardTitle>Usage</CardTitle>
                <CardDescription>68% of your monthly quota.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Progress value={68} />
                <Slider defaultValue={[68]} aria-label="Quota" />
                <div className="flex flex-wrap gap-2">
                  <Badge>Pro</Badge>
                  <Badge variant="secondary">Monthly</Badge>
                  <Badge variant="outline">EU</Badge>
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="grid gap-1">
                <Label htmlFor="tb-s">Auto-scale</Label>
                <p className="text-sm text-muted-foreground">
                  Add instances under load.
                </p>
              </div>
              <Switch id="tb-s" defaultChecked />
            </div>
          </div>

          <Tabs defaultValue="overview" className="md:col-span-2">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Alert variant="destructive">
                <TriangleAlertIcon />
                <AlertTitle>Build failed</AlertTitle>
                <AlertDescription>
                  Type error in app/page.tsx on line 12.
                </AlertDescription>
              </Alert>
            </TabsContent>
            <TabsContent value="logs">
              <pre className="rounded-lg border bg-muted p-3 font-mono text-xs text-muted-foreground">
                ✓ Compiled in 1.2s{"\n"}✓ Generated 42 pages
              </pre>
            </TabsContent>
            <TabsContent value="settings">
              <p className="text-sm text-muted-foreground">
                Nothing to configure yet.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </LayoutGroup>
  );
}
