import { Label } from "@/registry/ui/label";
import { Switch } from "@/registry/ui/switch";

export default function SwitchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      {[
        ["Marketing emails", "News about products and features.", false],
        ["Security alerts", "Sign-ins from new devices.", true],
      ].map(([title, desc, on]) => (
        <div
          key={String(title)}
          className="flex items-center justify-between gap-6 rounded-lg border p-4"
        >
          <div className="grid gap-1">
            <Label htmlFor={String(title)}>{title}</Label>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
          <Switch id={String(title)} defaultChecked={Boolean(on)} />
        </div>
      ))}
    </div>
  );
}
