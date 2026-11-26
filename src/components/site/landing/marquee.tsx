import Link from "next/link";
import { cn } from "@/lib/utils";

/** Two rows of component names drifting in opposite directions. Pauses on hover. */
export function Marquee({
  items,
}: {
  items: { name: string; title: string }[];
}) {
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];
  return (
    <div className="grid gap-3 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      {rows.map((row, r) => (
        <div key={r} className="group flex overflow-hidden">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className={cn(
                "flex shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused]",
                r === 0
                  ? "animate-[k-marquee_40s_linear_infinite]"
                  : "animate-[k-marquee_46s_linear_infinite_reverse]",
              )}
            >
              {row.map((e) => (
                <Link
                  key={e.name}
                  href={`/docs/components/${e.name}`}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="border bg-background px-4 py-2 font-mono text-[11px] tracking-[0.14em] whitespace-nowrap text-foreground/75 uppercase transition-[color,border-color,background-color] hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  {e.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
