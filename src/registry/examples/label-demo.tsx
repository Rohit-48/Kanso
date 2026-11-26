import { Checkbox } from "@/registry/ui/checkbox";
import { Label } from "@/registry/ui/label";

export default function LabelDemo() {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox id="l-terms" />
      <Label htmlFor="l-terms">Accept terms and conditions</Label>
    </div>
  );
}
