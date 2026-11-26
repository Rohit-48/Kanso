import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the size of the layer.
            </p>
          </div>
          <div className="grid gap-2">
            {[
              ["Width", "100%"],
              ["Height", "25px"],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor={`p-${label}`}>{label}</Label>
                <Input
                  id={`p-${label}`}
                  defaultValue={value}
                  className="col-span-2 h-8"
                />
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
