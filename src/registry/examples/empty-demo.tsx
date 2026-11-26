import { InboxIcon, PlusIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyHeader,
  EmptyIcon,
  EmptyTitle,
} from "@/registry/ui/empty";

export default function EmptyDemo() {
  return (
    <Empty className="w-full max-w-md">
      <EmptyIcon>
        <InboxIcon />
      </EmptyIcon>
      <EmptyHeader>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          Create your first project to start collecting feedback.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyActions>
        <Button size="sm">
          <PlusIcon /> New project
        </Button>
        <Button size="sm" variant="outline">
          Import
        </Button>
      </EmptyActions>
    </Empty>
  );
}
