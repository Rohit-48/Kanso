import { Kbd, KbdGroup } from "@/registry/ui/kbd";

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
      <p>
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search, or <Kbd>Esc</Kbd> to close.
      </p>
    </div>
  );
}
