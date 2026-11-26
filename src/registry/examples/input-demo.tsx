import { SearchIcon } from "lucide-react";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <div className="grid gap-2">
        <Label htmlFor="i-email">Email</Label>
        <Input id="i-email" type="email" placeholder="you@example.com" />
      </div>
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search" aria-label="Search" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="i-bad">Username</Label>
        <Input id="i-bad" defaultValue="ad" aria-invalid />
        <p className="text-xs text-destructive">At least 3 characters.</p>
      </div>
      <Input type="file" aria-label="File" />
    </div>
  );
}
