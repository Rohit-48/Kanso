import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/site/motion";
import { PageHeader } from "@/components/site/prose";
import { categories, registry } from "@/lib/registry";

export const metadata: Metadata = { title: "Components" };

export default function ComponentsIndex() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Components"
        description={`${registry.length} components. Each one is a single file you copy into your project.`}
      />
      <div className="grid gap-10">
        {categories.map((c) => (
          <section key={c}>
            <h2 className="mb-3 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              {c}
            </h2>
            <Stagger
              stagger={0.04}
              className="grid gap-px overflow-hidden border bg-border sm:grid-cols-2 lg:grid-cols-3"
            >
              {registry
                .filter((e) => e.category === c)
                .map((e) => (
                  <div key={e.name} className="bg-background">
                    <StaggerItem className="h-full">
                      <Link
                        href={`/docs/components/${e.name}`}
                        className="group grid h-full gap-1 p-4 transition-colors hover:bg-muted/40"
                      >
                        <span className="flex items-center gap-2 text-sm font-medium">
                          {e.title}
                          {e.isNew && (
                            <span className="size-1.5 rounded-full bg-success" />
                          )}
                          <ArrowUpRightIcon className="ml-auto size-3.5 -translate-x-1 translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-0 group-hover:opacity-100" />
                        </span>
                        <span className="line-clamp-2 text-sm text-muted-foreground">
                          {e.description}
                        </span>
                      </Link>
                    </StaggerItem>
                  </div>
                ))}
            </Stagger>
          </section>
        ))}
      </div>
    </div>
  );
}
