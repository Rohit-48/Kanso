# Kanso UI — Plan

> *Kanso* (簡素): simplicity, the removal of clutter.

A copy-paste React component library in the shadcn style, plus the documentation website that ships it.
Components are not an npm dependency. You copy the source into your app, or pull it with the shadcn CLI, and you own the code.

## 1. Principles

1. **Own the code.** Every component is one file. No runtime package to upgrade.
2. **Minimal by default.** Hairline borders, a quiet neutral palette, one radius token, subtle motion. No gradients, no heavy shadows.
3. **Accessible.** Interactive primitives come from Radix (`radix-ui`), so keyboard, focus and ARIA are handled.
4. **Themeable with CSS variables.** Every colour is an OKLCH token. Dark mode swaps the tokens, not the classes.
5. **CLI-compatible.** The site serves a shadcn-format registry at `/r/<name>.json`, so `npx shadcn add <url>` works.

## 2. Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, `@theme inline` tokens |
| Primitives | `radix-ui` |
| Variants | `class-variance-authority` + `cn()` (`clsx` + `tailwind-merge`) |
| Icons | `lucide-react` |
| Code highlighting | `shiki` (build time, server components) |
| Theme switching | `next-themes` |
| Toasts | `sonner` |
| Website motion | `motion` (Framer Motion): reveals, shared-layout indicators, parallax, page transitions |

## 3. Repository layout

```
src/
  registry/
    ui/            # the components: the thing users copy
    examples/      # one demo per component, shown on its docs page
  lib/
    utils.ts       # cn()
    registry.ts    # metadata: name, title, description, category, dependencies
    highlight.ts   # shiki wrapper
  components/site/ # website chrome: header, sidebar, preview tabs, copy button…
  app/
    page.tsx                         # landing
    docs/page.tsx                    # introduction
    docs/installation/page.tsx
    docs/theming/page.tsx
    docs/cli/page.tsx
    docs/components/page.tsx         # component index
    docs/components/[slug]/page.tsx  # one page per component
    blocks/page.tsx                  # composed examples (login, stats, settings)
    themes/page.tsx                  # palette picker that outputs CSS variables
scripts/
  build-registry.mjs  # writes public/r/*.json from src/registry/ui
```

## 4. Components (v0.1)

**Form:** Button, Input, Textarea, Label, Checkbox, Radio Group, Switch, Select, Slider, Toggle
**Display:** Badge, Avatar, Card, Alert, Separator, Skeleton, Kbd, Progress, Spinner, Table, Empty
**Overlay:** Dialog, Sheet, Popover, Tooltip, Dropdown Menu, Toast (Sonner)
**Navigation / disclosure:** Tabs, Accordion

Each component gets: live preview, source tab, CLI install, manual install (dependencies + source), usage snippet.

## 5. Design tokens

- `--radius: 0.5rem` drives `rounded-sm/md/lg`.
- Neutral scale in OKLCH: `background, foreground, muted, muted-foreground, border, input, ring, primary, secondary, accent, destructive, card, popover`.
- Focus: 2px ring at 50% opacity with an offset, visible only on `:focus-visible`.
- Motion: components use 150ms CSS transitions (no motion dependency). The website uses Motion for reveals and layout animations. Both respect `prefers-reduced-motion`.
- Theme presets on `/themes`: Neutral, Stone, Zinc, Sage, Indigo, Rose.

## 6. Website pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, install command, live component collage, principles |
| `/docs` | What Kanso is and how it differs from a package |
| `/docs/installation` | Next.js / Vite setup, `cn()` util, CSS tokens |
| `/docs/theming` | Token reference, dark mode, custom radius |
| `/docs/cli` | Using `npx shadcn add` with the Kanso registry |
| `/docs/components` | Grid of every component |
| `/docs/components/[slug]` | Preview, code, install, usage |
| `/blocks` | Larger compositions to copy |
| `/themes` | Pick a palette and radius, copy the CSS |

All pages are statically generated. Component source is read from disk and highlighted at build time.

## 7. Milestones

1. **Foundation**: tokens, `cn()`, site shell (header, sidebar, theme toggle). ✅
2. **Components**: all v0.1 components with demos. ✅
3. **Docs**: generated component pages, guides. ✅
4. **Registry**: `public/r/*.json` + CLI docs. ✅
5. **Extras**: blocks, theme generator. ✅
6. **Later**: Command palette search, Combobox, Date picker, Data table, Chart, Sidebar block, versioned changelog, MDX for guides, unit tests with Testing Library, visual regression with Playwright.

## 8. Commands

```bash
npm run dev        # site on http://localhost:3000
npm run registry   # rebuild public/r/*.json
npm run build      # registry + production build
```
