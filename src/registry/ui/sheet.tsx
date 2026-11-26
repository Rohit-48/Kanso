"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(
  props: React.ComponentProps<typeof SheetPrimitive.Trigger>,
) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

const sides = {
  right:
    "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm data-[state=open]:animate-[k-sheet-r_240ms_cubic-bezier(0.32,0.72,0,1)]",
  left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm data-[state=open]:animate-[k-sheet-l_240ms_cubic-bezier(0.32,0.72,0,1)]",
  top: "inset-x-0 top-0 h-auto border-b data-[state=open]:animate-[k-sheet-t_240ms_cubic-bezier(0.32,0.72,0,1)]",
  bottom:
    "inset-x-0 bottom-0 h-auto border-t data-[state=open]:animate-[k-sheet-b_240ms_cubic-bezier(0.32,0.72,0,1)]",
};

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: keyof typeof sides;
}) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay
        data-slot="sheet-overlay"
        className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-[k-fade_150ms_ease-out]"
      />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-2xl shadow-black/10 outline-none",
          sides[side],
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute top-4 right-4 rounded-sm p-0.5 text-muted-foreground opacity-70 transition-opacity outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring/40 [&_svg]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
        <style>{`@keyframes k-sheet-r{from{transform:translateX(100%)}}@keyframes k-sheet-l{from{transform:translateX(-100%)}}@keyframes k-sheet-t{from{transform:translateY(-100%)}}@keyframes k-sheet-b{from{transform:translateY(100%)}}`}</style>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-6 pb-0", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-6", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
