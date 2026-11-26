import { Button } from "@/registry/ui/button";
import { Label } from "@/registry/ui/label";
import { Textarea } from "@/registry/ui/textarea";

export default function TextareaDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="ta">Feedback</Label>
      <Textarea id="ta" placeholder="What could be better?" />
      <p className="text-xs text-muted-foreground">It grows as you type.</p>
      <Button className="justify-self-end" size="sm">
        Send
      </Button>
    </div>
  );
}
