"use client";

import * as React from "react";
import { Progress } from "@/registry/ui/progress";

export default function ProgressDemo() {
  const [value, setValue] = React.useState(12);
  React.useEffect(() => {
    const t = setInterval(() => setValue((v) => (v >= 100 ? 8 : v + 11)), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <div className="flex justify-between text-sm">
          <span>Uploading</span>
          <span className="text-muted-foreground tabular-nums">
            {Math.min(value, 100)}%
          </span>
        </div>
        <Progress value={Math.min(value, 100)} />
      </div>
      <div className="grid gap-2">
        <span className="text-sm">Indeterminate</span>
        <Progress />
      </div>
    </div>
  );
}
