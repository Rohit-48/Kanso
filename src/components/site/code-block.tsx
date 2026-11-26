import { highlight } from "@/lib/highlight";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
  maxHeight = true,
}: {
  code: string;
  lang?: string;
  title?: string;
  className?: string;
  maxHeight?: boolean;
}) {
  const html = await highlight(code.trim(), lang);
  return (
    <div
      className={cn(
        "group relative min-w-0 overflow-hidden border bg-muted/30",
        className,
      )}
    >
      {title && (
        <div className="flex h-10 items-center border-b px-4 font-mono text-xs text-muted-foreground">
          {title}
        </div>
      )}
      <CopyButton
        value={code.trim()}
        className="absolute top-1.5 right-1.5 z-10 bg-background/80 backdrop-blur"
      />
      <div
        className={cn(
          "overflow-auto p-4 font-mono text-[13px] leading-relaxed [&_pre]:outline-none",
          maxHeight && "max-h-[28rem]",
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
