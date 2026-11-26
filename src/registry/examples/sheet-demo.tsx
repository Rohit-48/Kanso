import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet";

export default function SheetDemo() {
  return (
    <div className="flex gap-2">
      {(["left", "right", "bottom"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Workspace</SheetTitle>
              <SheetDescription>
                Rename your workspace. Everyone in it will see the change.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-2 px-6">
              <Label htmlFor={`s-${side}`}>Name</Label>
              <Input id={`s-${side}`} defaultValue="Acme" />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Save</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
