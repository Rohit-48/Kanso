/**
 * Builds the shadcn-compatible registry in public/r from src/registry.
 * Run with: node scripts/build-registry.ts   (Node >= 22.18 strips types natively)
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { blockEntries as blocks, registry } from "../src/lib/registry.ts";

const root = process.cwd();
const out = path.join(root, "public", "r");
const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kanso-ui.vercel.app").replace(/\/$/, "");
const schema = "https://ui.shadcn.com/schema/registry-item.json";


const toUser = (code: string) => code.replaceAll("@/registry/ui/", "@/components/ui/");
const localDeps = (code: string) =>
  [...new Set([...code.matchAll(/@\/registry\/ui\/([\w-]+)/g)].map((m) => m[1]))].map((n) => `${site}/r/${n}.json`);
const npmDeps = (code: string) => {
  const deps = new Set<string>();
  for (const m of code.matchAll(/from "([^"./@][^"]*|@[^"/]+\/[^"]+)"/g)) {
    const spec = m[1];
    if (spec === "react" || spec.startsWith("@/")) continue;
    deps.add(spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]);
  }
  return [...deps];
};

function parseVars(block: string) {
  const vars: Record<string, string> = {};
  for (const m of block.matchAll(/--([\w-]+):\s*([^;]+);/g)) vars[m[1]] = m[2].trim();
  return vars;
}

async function main() {
  await mkdir(out, { recursive: true });
  const globals = await readFile(path.join(root, "src/app/globals.css"), "utf8");

  // 1. Plain CSS for manual installs: everything between the import and the shiki section.
  const baseCss = globals.slice(0, globals.indexOf("/* shiki")).replace(/^\s*--font-.*\n/gm, "").trim() + "\n";
  await writeFile(path.join(out, "kanso.css"), baseCss);

  // 2. Base style item: tokens + keyframes, for `shadcn init <url>`.
  const light = parseVars(globals.match(/:root\s*{([^}]*)}/)![1]);
  const dark = parseVars(globals.match(/\.dark\s*{([^}]*)}/)![1]);
  const theme = parseVars(globals.match(/@theme inline\s*{([\s\S]*?)\n}/)![1]);
  delete theme["font-sans"];
  delete theme["font-mono"];
  const keyframes: Record<string, unknown> = {};
  for (const m of globals.matchAll(/@keyframes ([\w-]+)\s*{([\s\S]*?)\n}/g)) {
    const steps: Record<string, Record<string, string>> = {};
    for (const s of m[2].matchAll(/([\w%\s,]+)\s*{\s*([^}]*)}/g)) {
      const decl: Record<string, string> = {};
      for (const d of s[2].split(";").map((x) => x.trim()).filter(Boolean)) {
        const i = d.indexOf(":");
        decl[d.slice(0, i).trim()] = d.slice(i + 1).trim();
      }
      steps[s[1].trim()] = decl;
    }
    keyframes[`@keyframes ${m[1]}`] = steps;
  }
  const base = {
    $schema: schema,
    name: "kanso",
    type: "registry:style",
    title: "Kanso base",
    description: "Kanso UI tokens, radius scale, animations and the cn() helper.",
    dependencies: ["radix-ui", "class-variance-authority", "clsx", "tailwind-merge", "lucide-react"],
    cssVars: { theme, light, dark },
    css: {
      "@custom-variant dark (&:where(.dark, .dark *))": {},
      ...keyframes,
    },
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
        target: "lib/utils.ts",
        content: await readFile(path.join(root, "src/lib/utils.ts"), "utf8"),
      },
    ],
  };
  await writeFile(path.join(out, "kanso.json"), JSON.stringify(base, null, 2));

  const index: { name: string; type: string; title: string; description: string }[] = [
    { name: base.name, type: base.type, title: base.title, description: base.description },
  ];

  // 3. One item per component.
  for (const entry of registry) {
    const code = await readFile(path.join(root, "src/registry/ui", `${entry.name}.tsx`), "utf8");
    const item = {
      $schema: schema,
      name: entry.name,
      type: "registry:ui",
      title: entry.title,
      description: entry.description,
      dependencies: npmDeps(code),
      registryDependencies: [`${site}/r/kanso.json`, ...localDeps(code)],
      files: [
        { path: `registry/ui/${entry.name}.tsx`, type: "registry:ui", target: `components/ui/${entry.name}.tsx`, content: toUser(code) },
      ],
    };
    await writeFile(path.join(out, `${entry.name}.json`), JSON.stringify(item, null, 2));
    index.push({ name: item.name, type: item.type, title: item.title, description: item.description });
  }

  // 4. Blocks.
  for (const b of blocks) {
    const code = await readFile(path.join(root, "src/registry/blocks", `${b.name}.tsx`), "utf8");
    const item = {
      $schema: schema,
      name: b.name,
      type: "registry:block",
      title: b.title,
      description: b.description,
      dependencies: npmDeps(code),
      registryDependencies: localDeps(code),
      files: [
        { path: `registry/blocks/${b.name}.tsx`, type: "registry:block", target: `components/${b.name}.tsx`, content: toUser(code) },
      ],
    };
    await writeFile(path.join(out, `${b.name}.json`), JSON.stringify(item, null, 2));
    index.push({ name: item.name, type: item.type, title: item.title, description: item.description });
  }

  await writeFile(
    path.join(out, "registry.json"),
    JSON.stringify({ $schema: "https://ui.shadcn.com/schema/registry.json", name: "kanso", homepage: site, items: index }, null, 2)
  );
  console.log(`registry: wrote ${index.length} items to public/r`);
}

main();
