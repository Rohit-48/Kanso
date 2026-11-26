"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Dialog as DialogPrimitive } from "radix-ui";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRightIcon,
  BlocksIcon,
  FileTextIcon,
  HistoryIcon,
  SearchIcon,
  ShapesIcon,
  XIcon,
} from "lucide-react";
import { blockEntries, registry } from "@/lib/registry";
import { examples } from "@/registry/examples";
import { cn } from "@/lib/utils";
import { Brackets, ease, ScrambleText } from "./motion";

type Kind = "Page" | "Docs" | "Component" | "Block";
type Item = {
  title: string;
  href: string;
  kind: Kind;
  description: string;
  meta?: string;
};
type Recent = {
  title: string;
  href: string;
  kind: Kind;
  query: string;
  at: number;
};

const items: Item[] = [
  {
    title: "Introduction",
    href: "/docs",
    kind: "Docs",
    description: "What Kanso UI is and how copy-paste components work.",
  },
  {
    title: "Installation",
    href: "/docs/installation",
    kind: "Docs",
    description: "Set up Tailwind, the cn() helper and the base tokens.",
  },
  {
    title: "Theming",
    href: "/docs/theming",
    kind: "Docs",
    description: "CSS variables, dark mode, radius and adding colours.",
  },
  {
    title: "CLI & registry",
    href: "/docs/cli",
    kind: "Docs",
    description: "Install components with the shadcn CLI.",
  },
  ...registry.map((e) => ({
    title: e.title,
    href: `/docs/components/${e.name}`,
    kind: "Component" as const,
    description: e.description,
    meta: e.category,
  })),
  ...blockEntries.map((b) => ({
    title: `${b.title} block`,
    href: `/blocks#${b.name}`,
    kind: "Block" as const,
    description: b.description,
  })),
  {
    title: "Theme builder",
    href: "/themes",
    kind: "Page",
    description: "Pick a palette and radius, copy the CSS.",
  },
];

const icons: Record<Kind, typeof ShapesIcon> = {
  Page: FileTextIcon,
  Docs: FileTextIcon,
  Component: ShapesIcon,
  Block: BlocksIcon,
};

const STORAGE_KEY = "kanso:recent-searches";
const MAX_RECENT = 3;

function readRecent(): Recent[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

function saveRecent(fields: Omit<Recent, "at">) {
  const entry: Recent = { ...fields, at: Date.now() };
  const next = [
    entry,
    ...readRecent().filter((r) => r.href !== entry.href),
  ].slice(0, MAX_RECENT);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function rank(q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return items;
  return items
    .map((it) => {
      const t = it.title.toLowerCase();
      const score = t.startsWith(s)
        ? 3
        : t.includes(s)
          ? 2
          : it.description.toLowerCase().includes(s)
            ? 1
            : 0;
      return { it, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.it);
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-foreground text-background">
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  );
}

function ago(at: number) {
  const s = Math.max(1, Math.round((Date.now() - at) / 1000));
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.round(s / 60)}m`;
  if (s < 86400) return `${Math.round(s / 3600)}h`;
  return `${Math.round(s / 86400)}d`;
}

export function Search() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [recent, setRecent] = React.useState<Recent[]>([]);
  const router = useRouter();
  const listRef = React.useRef<HTMLDivElement>(null);

  const openSearch = React.useCallback((next: boolean) => {
    if (next) {
      setRecent(readRecent());
      setQuery("");
      setActive(0);
    }
    setOpen(next);
  }, []);

  const openRef = React.useRef(open);
  React.useEffect(() => {
    openRef.current = open;
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && !isTyping(e))
      ) {
        e.preventDefault();
        openSearch(!openRef.current);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSearch]);

  const results = React.useMemo(() => rank(query), [query]);
  const showRecent = !query.trim() && recent.length > 0;
  // One flat list for keyboard navigation: recent first, then results.
  const rows: (Item & { recent?: Recent })[] = React.useMemo(
    () => [
      ...(showRecent
        ? recent.map((r) => ({
            ...(items.find((i) => i.href === r.href) ?? {
              ...r,
              description: "",
            }),
            recent: r,
          }))
        : []),
      ...results,
    ],
    [showRecent, recent, results],
  );
  const current = rows[active];

  React.useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (row: Item) => {
    saveRecent({
      title: row.title,
      href: row.href,
      kind: row.kind,
      query: query.trim(),
    });
    setOpen(false);
    router.push(row.href);
  };

  const clearRecent = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecent([]);
    setActive(0);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={openSearch}>
      <DialogPrimitive.Trigger asChild>
        <button className="group relative flex h-9 w-full items-center gap-2.5 border bg-background px-3 font-mono text-xs tracking-wide text-muted-foreground uppercase transition-colors hover:border-foreground/40 hover:text-foreground md:w-64">
          <SearchIcon className="size-3.5" />
          <span className="flex-1 text-left">
            Search
            <span className="ml-0.5 inline-block h-3 w-[6px] translate-y-[2px] animate-[k-blink_1.1s_steps(1)_infinite] bg-current" />
          </span>
          <span className="border px-1.5 py-0.5 text-[10px] leading-none">
            ⌘K
          </span>
          <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
            <Brackets size={6} animated={false} />
          </span>
        </button>
      </DialogPrimitive.Trigger>

      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] bg-[size:48px_48px] opacity-50" />
              </motion.div>
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content
              asChild
              forceMount
              aria-describedby={undefined}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((a) => Math.min(a + 1, rows.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => Math.max(a - 1, 0));
                } else if (e.key === "Enter" && current) {
                  e.preventDefault();
                  go(current);
                }
              }}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  clipPath: "inset(0 0 100% 0)",
                  x: "-50%",
                }}
                animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)", x: "-50%" }}
                exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)", x: "-50%" }}
                transition={{ duration: 0.45, ease }}
                className="fixed top-[12vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl border bg-popover text-popover-foreground shadow-2xl shadow-black/20 outline-none"
              >
                <Brackets size={10} />
                {/* one sweep on open */}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 z-20 h-px bg-foreground/60"
                  initial={{ top: "0%", opacity: 1 }}
                  animate={{ top: "100%", opacity: 0 }}
                  transition={{ duration: 0.7, ease, delay: 0.1 }}
                />
                <DialogPrimitive.Title className="sr-only">
                  Search documentation
                </DialogPrimitive.Title>

                {/* Query bar */}
                <div className="flex items-center gap-3 border-b px-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                    <ScrambleText text="Query //" duration={500} />
                  </span>
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setActive(0);
                    }}
                    placeholder="Components, docs, blocks…"
                    className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/70"
                  />
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground tabular-nums">
                    {String(results.length).padStart(2, "0")} HITS
                  </span>
                  <DialogPrimitive.Close className="flex size-7 items-center justify-center border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground">
                    <XIcon className="size-3.5" />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
                </div>

                <div className="grid sm:grid-cols-[1fr_17rem]">
                  {/* Results */}
                  <div
                    ref={listRef}
                    className="max-h-[22rem] overflow-y-auto border-r-0 p-2 sm:border-r"
                  >
                    {showRecent && (
                      <div className="flex items-center justify-between px-2 pt-1 pb-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                        <span>Recent · {recent.length}/3</span>
                        <button
                          onClick={clearRecent}
                          className="tracking-[0.2em] uppercase hover:text-foreground"
                        >
                          Clear
                        </button>
                      </div>
                    )}
                    {rows.length === 0 && (
                      <div className="grid place-items-center gap-2 py-16 text-center">
                        <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                          <ScrambleText text="No signal" />
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Nothing matches “{query}”.
                        </span>
                      </div>
                    )}
                    {rows.map((row, i) => {
                      const Icon = row.recent ? HistoryIcon : icons[row.kind];
                      const firstResult = showRecent && i === recent.length;
                      return (
                        <React.Fragment
                          key={`${row.recent ? "r" : "a"}-${row.href}`}
                        >
                          {firstResult && (
                            <div className="mt-2 border-t px-2 pt-3 pb-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                              Index
                            </div>
                          )}
                          <motion.button
                            data-index={i}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.25,
                              ease,
                              delay: Math.min(i, 12) * 0.018,
                            }}
                            onMouseMove={() => setActive(i)}
                            onClick={() => go(row)}
                            className={cn(
                              "relative isolate flex w-full items-center gap-3 px-3 py-2 text-left text-sm",
                              i === active
                                ? "text-foreground"
                                : "text-foreground/75",
                            )}
                          >
                            {i === active && (
                              <motion.span
                                layoutId="search-active"
                                className="absolute inset-0 -z-10 bg-accent"
                                transition={{
                                  type: "spring",
                                  stiffness: 600,
                                  damping: 40,
                                }}
                              >
                                <span className="absolute inset-y-0 left-0 w-0.5 bg-foreground" />
                              </motion.span>
                            )}
                            <span className="w-6 font-mono text-[10px] text-muted-foreground tabular-nums">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                            <span className="flex-1 truncate">
                              <Highlight text={row.title} query={query} />
                            </span>
                            {row.recent ? (
                              <span className="truncate font-mono text-[10px] text-muted-foreground">
                                {row.recent.query
                                  ? `“${row.recent.query}” · `
                                  : ""}
                                {ago(row.recent.at)}
                              </span>
                            ) : (
                              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                                {row.kind}
                              </span>
                            )}
                          </motion.button>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Detail */}
                  <div className="relative hidden overflow-hidden bg-muted/30 p-5 sm:block">
                    <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-[size:12px_12px] opacity-60" />
                    <AnimatePresence mode="wait">
                      {current && (
                        <motion.div
                          key={current.href}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18, ease }}
                          className="relative grid gap-4"
                        >
                          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                            <span>{current.kind}</span>
                            {current.meta && <span>{current.meta}</span>}
                          </div>
                          <div className="relative grid aspect-[4/3] place-items-center overflow-hidden border bg-background">
                            <Brackets size={7} animated={false} />
                            <Thumbnail item={current} />
                          </div>
                          <div className="grid gap-1.5">
                            <h3 className="text-lg font-semibold tracking-tight">
                              <ScrambleText
                                key={current.href}
                                text={current.title}
                                duration={350}
                              />
                            </h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {current.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-muted-foreground">
                            <span className="truncate">{current.href}</span>
                            <ArrowRightIcon className="size-3" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 border-t px-4 py-2.5 font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                  <span className="flex items-center gap-1.5">
                    <Key>↑</Key>
                    <Key>↓</Key> Navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Key>↵</Key> Open
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Key>Esc</Key> Close
                  </span>
                  <span className="ml-auto hidden items-center gap-1.5 sm:flex">
                    <span className="size-1.5 animate-pulse bg-success" /> Index
                    · {items.length} entries
                  </span>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <span className="border bg-background px-1 py-0.5 leading-none text-foreground">
      {children}
    </span>
  );
}

function isTyping(e: KeyboardEvent) {
  const t = e.target as HTMLElement | null;
  return (
    !!t &&
    (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))
  );
}

/** A live, shrunken render of the component's demo; an icon for everything else. */
function Thumbnail({ item }: { item: Item }) {
  const name = item.href.split("/").pop() ?? "";
  const Demo = item.kind === "Component" ? examples[name] : undefined;
  if (!Demo) {
    const Icon = icons[item.kind];
    return <Icon className="size-7 text-foreground/70" strokeWidth={1.25} />;
  }
  return (
    <div
      aria-hidden
      inert
      className="pointer-events-none flex w-[200%] origin-center scale-50 items-center justify-center select-none"
    >
      <Demo />
    </div>
  );
}
