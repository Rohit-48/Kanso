"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const indeterminate = value === null || value === undefined;
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        "relative h-1.5 w-full overflow-hidden rounded-full bg-muted",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full rounded-full bg-primary transition-transform duration-500 ease-out",
          indeterminate ? "w-2/5 animate-indeterminate" : "w-full",
        )}
        style={
          indeterminate
            ? undefined
            : { transform: `translateX(-${100 - (value ?? 0)}%)` }
        }
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
