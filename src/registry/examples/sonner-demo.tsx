"use client";

import { toast } from "sonner";
import { Button } from "@/registry/ui/button";

export default function SonnerDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event created", {
            description: "Friday, 4 December at 10:00",
            action: { label: "Undo", onClick: () => {} },
          })
        }
      >
        Show toast
      </Button>
      <Button variant="outline" onClick={() => toast.success("Changes saved")}>
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((r) => setTimeout(r, 1500)), {
            loading: "Deploying…",
            success: "Deployed",
            error: "Failed",
          })
        }
      >
        Promise
      </Button>
    </div>
  );
}
