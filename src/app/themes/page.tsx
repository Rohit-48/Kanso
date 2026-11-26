import type { Metadata } from "next";
import { PageHeader } from "@/components/site/prose";
import { ThemeBuilder } from "./theme-builder";

export const metadata: Metadata = { title: "Themes" };

export default function ThemesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Themes"
        title="Make it yours"
        description="Pick a palette and a corner radius. The preview updates live, and the CSS is ready to copy."
      />
      <ThemeBuilder />
    </main>
  );
}
