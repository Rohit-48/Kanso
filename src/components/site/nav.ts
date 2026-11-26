import { categories, registry } from "@/lib/registry";

export type NavItem = { title: string; href: string; isNew?: boolean };
export type NavSection = { title: string; items: NavItem[] };

export const mainNav: NavItem[] = [
  { title: "Docs", href: "/docs" },
  { title: "Components", href: "/docs/components" },
  { title: "Blocks", href: "/blocks" },
  { title: "Themes", href: "/themes" },
];

export const docsNav: NavSection[] = [
  {
    title: "Getting started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
      { title: "CLI & registry", href: "/docs/cli" },
    ],
  },
  ...categories.map((c) => ({
    title: c,
    items: registry
      .filter((e) => e.category === c)
      .map((e) => ({ title: e.title, href: `/docs/components/${e.name}`, isNew: e.isNew })),
  })),
];
