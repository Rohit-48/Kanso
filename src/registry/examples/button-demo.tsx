import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="sm" variant="outline">
          <PlusIcon /> New
        </Button>
        <Button>
          Continue <ArrowRightIcon />
        </Button>
        <Button size="icon" variant="outline" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}
