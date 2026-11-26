"use client";

import { CountUp, Stagger, StaggerItem } from "../motion";

export function Stats({
  items,
}: {
  items: { value: number; suffix?: string; label: string }[];
}) {
  return (
    <section className="border-b">
      <Stagger className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y px-0 sm:px-6 md:grid-cols-4 md:divide-y-0">
        {items.map((s) => (
          <StaggerItem
            key={s.label}
            className="grid gap-1 px-6 py-10 first:border-l-0 md:py-12"
          >
            <span className="text-5xl font-semibold tracking-[-0.04em]">
              <CountUp to={s.value} />
              {s.suffix && (
                <span className="text-muted-foreground">{s.suffix}</span>
              )}
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              {s.label}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
