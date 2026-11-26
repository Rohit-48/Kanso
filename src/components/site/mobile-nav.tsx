"use client";

import * as React from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet";
import { mainNav } from "./nav";
import { SidebarNav } from "./sidebar";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 overflow-y-auto p-6">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="mb-6 grid gap-1 text-sm">
          {mainNav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-1 font-medium"
            >
              {i.title}
            </Link>
          ))}
        </div>
        <SidebarNav id="mobile-sidebar" onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
