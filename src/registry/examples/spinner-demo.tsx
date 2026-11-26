import { Button } from "@/registry/ui/button";
import { Spinner } from "@/registry/ui/spinner";

export default function SpinnerDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-6 text-muted-foreground">
        <Spinner size="sm" />
        <Spinner />
        <Spinner size="lg" />
      </div>
      <div className="flex gap-2">
        <Button disabled>
          <Spinner /> Saving
        </Button>
        <Button variant="outline" disabled>
          <Spinner /> Loading
        </Button>
      </div>
    </div>
  );
}
