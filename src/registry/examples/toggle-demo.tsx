import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { Toggle } from "@/registry/ui/toggle";

export default function ToggleDemo() {
  return (
    <div className="flex items-center gap-1 rounded-lg border p-1 shadow-xs">
      <Toggle size="sm" aria-label="Bold" defaultPressed>
        <BoldIcon />
      </Toggle>
      <Toggle size="sm" aria-label="Italic">
        <ItalicIcon />
      </Toggle>
      <Toggle size="sm" aria-label="Underline">
        <UnderlineIcon />
      </Toggle>
    </div>
  );
}
