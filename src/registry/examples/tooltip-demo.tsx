import { CopyIcon, DownloadIcon, ShareIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip";

export default function TooltipDemo() {
  return (
    <div className="flex gap-2">
      {[
        [CopyIcon, "Copy"],
        [DownloadIcon, "Download"],
        [ShareIcon, "Share"],
      ].map(([Icon, label]) => {
        const I = Icon as typeof CopyIcon;
        return (
          <Tooltip key={String(label)}>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" aria-label={String(label)}>
                <I />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{String(label)}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
