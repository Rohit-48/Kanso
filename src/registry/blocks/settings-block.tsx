import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";
import { Separator } from "@/registry/ui/separator";
import { Switch } from "@/registry/ui/switch";

function Row({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 py-5 sm:grid-cols-[1fr_16rem] sm:items-center sm:gap-8">
      <div className="grid gap-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex sm:justify-end">{children}</div>
    </div>
  );
}

export default function SettingsBlock() {
  return (
    <div className="w-full max-w-2xl rounded-xl border bg-card px-6 shadow-xs">
      <div className="py-5">
        <h3 className="font-semibold tracking-tight">General</h3>
        <p className="text-sm text-muted-foreground">
          Settings for your workspace.
        </p>
      </div>
      <Separator />
      <Row
        title="Workspace name"
        description="Shown in the sidebar and in emails."
      >
        <Input defaultValue="Acme Inc." aria-label="Workspace name" />
      </Row>
      <Separator />
      <Row title="Language" description="Used for dates and numbers.">
        <Select defaultValue="en">
          <SelectTrigger aria-label="Language">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">हिन्दी</SelectItem>
            <SelectItem value="ja">日本語</SelectItem>
          </SelectContent>
        </Select>
      </Row>
      <Separator />
      <Row
        title="Weekly digest"
        description="A summary of activity every Monday."
      >
        <Switch defaultChecked aria-label="Weekly digest" />
      </Row>
      <Separator />
      <div className="flex justify-end gap-2 py-5">
        <Button variant="ghost">Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </div>
  );
}
