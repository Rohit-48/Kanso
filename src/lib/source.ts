import { promises as fs } from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "src", "registry");

/** Reads a registry file and rewrites internal imports to the paths users will have. */
export async function readSource(kind: "ui" | "examples" | "blocks", name: string) {
  "use cache";
  const raw = await fs.readFile(path.join(root, kind, `${name}.tsx`), "utf8");
  return toUserImports(raw);
}

export function toUserImports(code: string) {
  return code.replaceAll("@/registry/ui/", "@/components/ui/");
}

export async function readBaseCss() {
  "use cache";
  return fs.readFile(path.join(process.cwd(), "public", "r", "kanso.css"), "utf8");
}
