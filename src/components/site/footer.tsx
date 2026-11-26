import Link from "next/link";
import { Logo } from "./logo";

const columns = [
  {
    title: "Docs",
    links: [
      ["Introduction", "/docs"],
      ["Installation", "/docs/installation"],
      ["Theming", "/docs/theming"],
      ["CLI & registry", "/docs/cli"],
    ],
  },
  {
    title: "Library",
    links: [
      ["Components", "/docs/components"],
      ["Blocks", "/blocks"],
      ["Themes", "/themes"],
      ["Registry JSON", "/r/registry.json"],
    ],
  },
  {
    title: "Popular",
    links: [
      ["Button", "/docs/components/button"],
      ["Dialog", "/docs/components/dialog"],
      ["Select", "/docs/components/select"],
      ["Toast", "/docs/components/sonner"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="grid content-start gap-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Minimal, accessible React components you copy into your app and own.
          </p>
        </div>
        {columns.map((c) => (
          <div key={c.title} className="grid content-start gap-3 text-sm">
            <h4 className="font-medium">{c.title}</h4>
            {c.links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="w-fit text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <p>MIT licensed. Copy what you need.</p>
          <p>Built with Next.js, Tailwind CSS, Radix and Motion.</p>
        </div>
      </div>
    </footer>
  );
}
