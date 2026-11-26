import { blockEntries } from "@/lib/registry";
import LoginBlock from "./login-block";
import StatsBlock from "./stats-block";
import SettingsBlock from "./settings-block";
import InboxBlock from "./inbox-block";

const components = {
  "login-block": LoginBlock,
  "stats-block": StatsBlock,
  "settings-block": SettingsBlock,
  "inbox-block": InboxBlock,
} as const;

export const blocks = blockEntries.map((b) => ({ ...b, Component: components[b.name as keyof typeof components] }));
