import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="ist">India (IST)</SelectItem>
          <SelectItem value="jst">Japan (JST)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">London (GMT)</SelectItem>
          <SelectItem value="cet">Berlin (CET)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Americas</SelectLabel>
          <SelectItem value="est">New York (EST)</SelectItem>
          <SelectItem value="pst" disabled>
            Los Angeles (PST)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
