# Kanso UI

Minimal, accessible React components you copy into your app and own. Built with Tailwind CSS v4 and Radix, served in the shadcn registry format.

See [PLAN.md](PLAN.md) for the design principles, architecture and roadmap.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000 (rebuilds the registry first)
npm run build      # registry + production build
npm run registry   # regenerate public/r/*.json only
```

The site is live at https://konsa.rohitxyz.me. Install commands and registry links use that address; set `NEXT_PUBLIC_SITE_URL` to override it (for example on a preview deployment).

## Where things live

- `src/registry/ui/`: the components (the files users copy)
- `src/registry/examples/`: one demo per component
- `src/registry/blocks/`: larger compositions
- `src/lib/registry.ts`: component metadata (title, category, usage)
- `scripts/build-registry.ts`: writes `public/r/` for the shadcn CLI

## Adding a component

1. Add `src/registry/ui/<name>.tsx`.
2. Add `src/registry/examples/<name>-demo.tsx` and register it in `src/registry/examples/index.ts`.
3. Add an entry to `src/lib/registry.ts`.

The docs page, sidebar link, search entry and registry JSON are generated from those.
