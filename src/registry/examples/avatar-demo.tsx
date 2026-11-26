import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/registry/ui/avatar";

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-6">
      <Avatar className="size-10">
        <AvatarImage src="/avatar.svg" alt="Kanso" />
        <AvatarFallback>KA</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarFallback>KU</AvatarFallback>
      </Avatar>
      <AvatarGroup>
        {["AL", "BT", "CR", "DK"].map((i) => (
          <Avatar key={i}>
            <AvatarFallback>{i}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  );
}
