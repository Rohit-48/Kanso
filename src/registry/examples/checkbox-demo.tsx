import { Checkbox } from "@/registry/ui/checkbox";
import { Label } from "@/registry/ui/label";

export default function CheckboxDemo() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-2.5">
        <Checkbox id="c1" defaultChecked />
        <Label htmlFor="c1">Email me about product updates</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="c2" checked="indeterminate" />
        <Label htmlFor="c2">Select all (some selected)</Label>
      </div>
      <div className="flex items-start gap-2.5">
        <Checkbox id="c3" />
        <div className="grid gap-1.5">
          <Label htmlFor="c3">Accept terms</Label>
          <p className="text-sm text-muted-foreground">
            You agree to our terms of service.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="c4" disabled />
        <Label htmlFor="c4">Disabled</Label>
      </div>
    </div>
  );
}
