import { ScrambleText } from "./motion";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  return (
    <div className="grid gap-3 border-b pb-8 mb-8">
      {eyebrow && (
        <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          <span className="h-px w-6 bg-foreground/40" />
          <ScrambleText text={eyebrow} />
        </p>
      )}
      <h1 className="text-4xl font-semibold tracking-[-0.04em] text-balance">
        {title}
      </h1>
      {description && (
        <p className="max-w-2xl text-base text-pretty text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

export function H2({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={cn(
        "mt-12 mb-4 scroll-mt-20 text-xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 mb-3 text-base font-semibold tracking-tight">
      {children}
    </h3>
  );
}

export function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn("my-4 leading-7 text-pretty text-foreground/80", className)}
    >
      {children}
    </p>
  );
}

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="border bg-muted/60 px-1 py-px font-mono text-[0.85em]">
      {children}
    </code>
  );
}

export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-3.5 grid min-w-0 grid-cols-1 gap-0 border-l pl-7 [counter-reset:step]">
      {children}
    </div>
  );
}

export function Step({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-w-0 pb-8 [counter-increment:step] last:pb-0">
      <span className="absolute -left-[2.6rem] flex size-7 items-center justify-center border bg-background font-mono text-xs text-muted-foreground before:content-[counter(step)]" />
      <h3 className="mb-3 pt-0.5 font-medium">{title}</h3>
      {children}
    </div>
  );
}
