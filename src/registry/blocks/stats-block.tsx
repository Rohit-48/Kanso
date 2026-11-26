import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react";
import { Badge } from "@/registry/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card";

const stats = [
  {
    label: "Revenue",
    value: "$48,210",
    delta: "+12.4%",
    up: true,
    spark: [8, 10, 9, 12, 11, 14, 13, 16, 18, 17, 20],
  },
  {
    label: "Active users",
    value: "3,942",
    delta: "+4.1%",
    up: true,
    spark: [12, 12, 13, 12, 14, 15, 14, 15, 16, 16, 17],
  },
  {
    label: "Churn",
    value: "1.8%",
    delta: "-0.3%",
    up: false,
    spark: [9, 8, 8, 9, 7, 7, 6, 7, 6, 5, 5],
  },
];

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data
    .map(
      (d, i) =>
        `${(i / (data.length - 1)) * 100},${30 - ((d - min) / (max - min || 1)) * 26 - 2}`,
    )
    .join(" ");
  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      className="h-10 w-full text-foreground/70"
      aria-hidden
    >
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function StatsBlock() {
  return (
    <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-3">
      {stats.map((s) => (
        <Card key={s.label} className="gap-4 py-5">
          <CardHeader className="px-5">
            <CardDescription>{s.label}</CardDescription>
            <CardTitle className="text-2xl tabular-nums">{s.value}</CardTitle>
            <CardAction>
              <Badge variant={s.up ? "success" : "outline"}>
                {s.up ? <ArrowUpRightIcon /> : <ArrowDownRightIcon />}
                {s.delta}
              </Badge>
            </CardAction>
          </CardHeader>
          <div className="px-5">
            <Sparkline data={s.spark} />
          </div>
        </Card>
      ))}
    </div>
  );
}
