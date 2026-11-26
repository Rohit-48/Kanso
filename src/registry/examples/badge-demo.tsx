import { Badge } from "@/registry/ui/badge";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">
        <span className="size-1.5 rounded-full bg-current" /> Active
      </Badge>
      <Badge variant="destructive">Failed</Badge>
    </div>
  );
}
