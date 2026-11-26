import { SidebarNav } from "@/components/site/sidebar";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <div className="mx-auto flex max-w-7xl gap-10 px-4 sm:px-6">
      <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-52 shrink-0 overflow-y-auto py-8 pr-2 md:block">
        <SidebarNav />
      </aside>
      <main className="min-w-0 flex-1 py-10 pb-24">{children}</main>
    </div>
  );
}
