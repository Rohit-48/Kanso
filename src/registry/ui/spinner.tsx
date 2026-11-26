import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("relative inline-block shrink-0 text-current", {
  variants: {
    size: { sm: "size-3.5", default: "size-4", lg: "size-6" },
  },
  defaultVariants: { size: "default" },
});

/** Eight fading ticks. Pure CSS, inherits `currentColor`. */
function Spinner({
  className,
  size,
  label = "Loading",
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof spinnerVariants> & { label?: string }) {
  return (
    <span
      role="status"
      aria-label={label}
      data-slot="spinner"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="absolute top-0 left-[calc(50%-0.75px)] h-full w-[1.5px] animate-[k-spin-tick_0.8s_linear_infinite] before:absolute before:top-0 before:h-[28%] before:w-full before:rounded-full before:bg-current"
          style={{
            transform: `rotate(${i * 45}deg)`,
            animationDelay: `${-0.8 + i * 0.1}s`,
          }}
        />
      ))}
      <style>{`@keyframes k-spin-tick{0%{opacity:1}100%{opacity:.15}}`}</style>
    </span>
  );
}

export { Spinner };
