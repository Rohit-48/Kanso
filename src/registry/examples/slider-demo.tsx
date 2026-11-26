"use client";

import * as React from "react";
import { Slider } from "@/registry/ui/slider";

export default function SliderDemo() {
  const [range, setRange] = React.useState([20, 70]);
  return (
    <div className="grid w-full max-w-sm gap-8">
      <Slider defaultValue={[40]} max={100} step={1} aria-label="Volume" />
      <div className="grid gap-3">
        <div className="flex justify-between text-sm">
          <span>Price</span>
          <span className="text-muted-foreground tabular-nums">
            ${range[0]} – ${range[1]}
          </span>
        </div>
        <Slider
          value={range}
          onValueChange={setRange}
          max={100}
          step={5}
          aria-label="Price range"
        />
      </div>
    </div>
  );
}
