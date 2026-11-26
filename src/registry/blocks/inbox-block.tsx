import { ArchiveIcon, InboxIcon, SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/registry/ui/avatar";
import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyIcon,
  EmptyTitle,
} from "@/registry/ui/empty";

const mail = [
  {
    from: "Mira Patel",
    initials: "MP",
    subject: "Design review moved to Thursday",
    time: "9:41",
    unread: true,
    tag: "Work",
  },
  {
    from: "Dev Rao",
    initials: "DR",
    subject: "Re: Pricing page copy",
    time: "Yesterday",
    unread: true,
  },
  {
    from: "Lena Kim",
    initials: "LK",
    subject: "Photos from the offsite",
    time: "Mon",
    unread: false,
    tag: "Personal",
  },
];

export default function InboxBlock() {
  return (
    <div className="w-full max-w-xl rounded-xl border bg-card shadow-xs">
      <Tabs defaultValue="inbox" className="gap-0">
        <div className="flex items-center gap-2 border-b p-3">
          <TabsList>
            <TabsTrigger value="inbox">
              <InboxIcon /> Inbox
            </TabsTrigger>
            <TabsTrigger value="archive">
              <ArchiveIcon /> Archive
            </TabsTrigger>
          </TabsList>
          <div className="relative ml-auto w-40">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-8 pl-8"
              placeholder="Search"
              aria-label="Search mail"
            />
          </div>
        </div>
        <TabsContent value="inbox" className="divide-y">
          {mail.map((m) => (
            <div
              key={m.subject}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/40"
            >
              <Avatar>
                <AvatarFallback>{m.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={m.unread ? "text-sm font-medium" : "text-sm"}
                  >
                    {m.from}
                  </span>
                  {m.tag && <Badge variant="outline">{m.tag}</Badge>}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {m.time}
                  </span>
                </div>
                <p className="truncate text-sm text-muted-foreground">
                  {m.subject}
                </p>
              </div>
              {m.unread && (
                <span
                  className="size-2 rounded-full bg-primary"
                  aria-label="Unread"
                />
              )}
            </div>
          ))}
        </TabsContent>
        <TabsContent value="archive" className="p-4">
          <Empty className="border-0">
            <EmptyIcon>
              <ArchiveIcon />
            </EmptyIcon>
            <EmptyHeader>
              <EmptyTitle>Nothing archived</EmptyTitle>
              <EmptyDescription>
                Archived conversations will show up here.
              </EmptyDescription>
            </EmptyHeader>
            <Button size="sm" variant="outline">
              Learn more
            </Button>
          </Empty>
        </TabsContent>
      </Tabs>
    </div>
  );
}
