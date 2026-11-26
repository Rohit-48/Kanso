export type Category = "Form" | "Display" | "Overlay" | "Navigation";

export type RegistryEntry = {
  name: string;
  title: string;
  description: string;
  category: Category;
  /** npm packages the component imports */
  dependencies: string[];
  /** other Kanso components it imports */
  registryDependencies?: string[];
  /** extra usage notes rendered under "Usage" */
  usage: string;
  isNew?: boolean;
};

export const registry: RegistryEntry[] = [
  {
    name: "accordion",
    title: "Accordion",
    description: "A vertically stacked set of headings that each reveal a section of content.",
    category: "Navigation",
    dependencies: ["radix-ui", "lucide-react"],
    usage: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It follows the WAI-ARIA pattern.</AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  {
    name: "alert",
    title: "Alert",
    description: "A callout for information that needs the user's attention.",
    category: "Display",
    dependencies: ["class-variance-authority"],
    usage: `<Alert>
  <InfoIcon />
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>You can add components with the CLI.</AlertDescription>
</Alert>`,
  },
  {
    name: "avatar",
    title: "Avatar",
    description: "An image of a person, with a text fallback while it loads or if it fails.",
    category: "Display",
    dependencies: ["radix-ui"],
    usage: `<Avatar>
  <AvatarImage src="/me.png" alt="Me" />
  <AvatarFallback>ME</AvatarFallback>
</Avatar>`,
  },
  {
    name: "badge",
    title: "Badge",
    description: "A small label for status, counts or categories.",
    category: "Display",
    dependencies: ["radix-ui", "class-variance-authority"],
    usage: `<Badge variant="success">Active</Badge>`,
  },
  {
    name: "button",
    title: "Button",
    description: "Triggers an action. Six variants, five sizes, and asChild for links.",
    category: "Form",
    dependencies: ["radix-ui", "class-variance-authority"],
    usage: `<Button variant="outline" size="sm">Button</Button>

<Button asChild>
  <a href="/login">Login</a>
</Button>`,
  },
  {
    name: "card",
    title: "Card",
    description: "A bordered container with header, content and footer slots.",
    category: "Display",
    dependencies: [],
    usage: `<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
    <CardAction>…</CardAction>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>`,
  },
  {
    name: "checkbox",
    title: "Checkbox",
    description: "A control that toggles between checked, unchecked and indeterminate.",
    category: "Form",
    dependencies: ["radix-ui", "lucide-react"],
    usage: `<Checkbox id="terms" />
<Label htmlFor="terms">Accept terms</Label>`,
  },
  {
    name: "dialog",
    title: "Dialog",
    description: "A modal window over the page that traps focus until it closes.",
    category: "Overlay",
    dependencies: ["radix-ui", "lucide-react"],
    usage: `<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This cannot be undone.</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
  },
  {
    name: "dropdown-menu",
    title: "Dropdown Menu",
    description: "A menu of actions opened from a button, with groups, checkboxes and submenus.",
    category: "Overlay",
    dependencies: ["radix-ui", "lucide-react"],
    usage: `<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">Open</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  {
    name: "empty",
    title: "Empty",
    description: "A placeholder for lists and pages with nothing to show yet.",
    category: "Display",
    dependencies: [],
    isNew: true,
    usage: `<Empty>
  <EmptyIcon><InboxIcon /></EmptyIcon>
  <EmptyHeader>
    <EmptyTitle>No messages</EmptyTitle>
    <EmptyDescription>New messages will appear here.</EmptyDescription>
  </EmptyHeader>
</Empty>`,
  },
  {
    name: "input",
    title: "Input",
    description: "A single-line text field.",
    category: "Form",
    dependencies: [],
    usage: `<Input type="email" placeholder="you@example.com" />`,
  },
  {
    name: "kbd",
    title: "Kbd",
    description: "Shows a keyboard key or shortcut.",
    category: "Display",
    dependencies: [],
    isNew: true,
    usage: `<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`,
  },
  {
    name: "label",
    title: "Label",
    description: "An accessible caption for a form control.",
    category: "Form",
    dependencies: ["radix-ui"],
    usage: `<Label htmlFor="email">Email</Label>`,
  },
  {
    name: "popover",
    title: "Popover",
    description: "Floating content anchored to a trigger, for small forms and details.",
    category: "Overlay",
    dependencies: ["radix-ui"],
    usage: `<Popover>
  <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
  <PopoverContent>…</PopoverContent>
</Popover>`,
  },
  {
    name: "progress",
    title: "Progress",
    description: "Shows how far a task has got. Leave value out for an indeterminate bar.",
    category: "Display",
    dependencies: ["radix-ui"],
    usage: `<Progress value={42} />
<Progress /> {/* indeterminate */}`,
  },
  {
    name: "radio-group",
    title: "Radio Group",
    description: "A set of options where exactly one can be chosen.",
    category: "Form",
    dependencies: ["radix-ui"],
    usage: `<RadioGroup defaultValue="a">
  <RadioGroupItem value="a" id="a" />
  <RadioGroupItem value="b" id="b" />
</RadioGroup>`,
  },
  {
    name: "select",
    title: "Select",
    description: "Pick one value from a list in a styled popup.",
    category: "Form",
    dependencies: ["radix-ui", "lucide-react"],
    usage: `<Select>
  <SelectTrigger className="w-48"><SelectValue placeholder="Theme" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
  </SelectContent>
</Select>`,
  },
  {
    name: "separator",
    title: "Separator",
    description: "A hairline that divides content, horizontally or vertically.",
    category: "Display",
    dependencies: ["radix-ui"],
    usage: `<Separator />
<Separator orientation="vertical" />`,
  },
  {
    name: "sheet",
    title: "Sheet",
    description: "A panel that slides in from any edge of the screen.",
    category: "Overlay",
    dependencies: ["radix-ui", "lucide-react"],
    usage: `<Sheet>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader><SheetTitle>Settings</SheetTitle></SheetHeader>
  </SheetContent>
</Sheet>`,
  },
  {
    name: "skeleton",
    title: "Skeleton",
    description: "A pulsing block that stands in for content while it loads.",
    category: "Display",
    dependencies: [],
    usage: `<Skeleton className="h-4 w-48" />`,
  },
  {
    name: "slider",
    title: "Slider",
    description: "Choose a value, or a range, by dragging along a track.",
    category: "Form",
    dependencies: ["radix-ui"],
    usage: `<Slider defaultValue={[40]} max={100} step={1} />`,
  },
  {
    name: "sonner",
    title: "Toast",
    description: "Brief, stacked notifications, built on Sonner.",
    category: "Overlay",
    dependencies: ["sonner", "next-themes"],
    usage: `// app/layout.tsx
<Toaster />

// anywhere
import { toast } from "sonner";
toast("Saved", { description: "Your changes are live." });`,
  },
  {
    name: "spinner",
    title: "Spinner",
    description: "A small loading indicator that inherits the text colour.",
    category: "Display",
    dependencies: ["class-variance-authority"],
    isNew: true,
    usage: `<Button disabled>
  <Spinner /> Saving
</Button>`,
  },
  {
    name: "switch",
    title: "Switch",
    description: "An on/off control for settings that take effect immediately.",
    category: "Form",
    dependencies: ["radix-ui"],
    usage: `<Switch id="wifi" />
<Label htmlFor="wifi">Wi-Fi</Label>`,
  },
  {
    name: "table",
    title: "Table",
    description: "Styled table elements for rows of data.",
    category: "Display",
    dependencies: [],
    usage: `<Table>
  <TableHeader>
    <TableRow><TableHead>Name</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>Ada</TableCell></TableRow>
  </TableBody>
</Table>`,
  },
  {
    name: "tabs",
    title: "Tabs",
    description: "Switch between panels of related content.",
    category: "Navigation",
    dependencies: ["radix-ui"],
    usage: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">…</TabsContent>
</Tabs>`,
  },
  {
    name: "textarea",
    title: "Textarea",
    description: "A multi-line text field that grows with its content.",
    category: "Form",
    dependencies: [],
    usage: `<Textarea placeholder="Write a message" />`,
  },
  {
    name: "toggle",
    title: "Toggle",
    description: "A two-state button, such as bold or italic in a toolbar.",
    category: "Form",
    dependencies: ["radix-ui", "class-variance-authority"],
    usage: `<Toggle aria-label="Bold"><BoldIcon /></Toggle>`,
  },
  {
    name: "tooltip",
    title: "Tooltip",
    description: "A short label shown on hover or focus.",
    category: "Overlay",
    dependencies: ["radix-ui"],
    usage: `<Tooltip>
  <TooltipTrigger asChild><Button variant="outline">Hover</Button></TooltipTrigger>
  <TooltipContent>Add to library</TooltipContent>
</Tooltip>`,
  },
];

export const categories: Category[] = ["Form", "Display", "Overlay", "Navigation"];

export function getEntry(name: string) {
  return registry.find((e) => e.name === name);
}

export function pascal(name: string) {
  return name
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("");
}

export const blockEntries = [
  { name: "login-block", title: "Sign in", description: "Social sign-in, email and password, in a card." },
  { name: "stats-block", title: "Stats", description: "Three KPI cards with a trend badge and a sparkline." },
  { name: "settings-block", title: "Settings", description: "A settings panel with labelled rows." },
  { name: "inbox-block", title: "Inbox", description: "Tabs, a searchable list, and an empty state." },
];
