import { Badge } from "@/registry/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/ui/table";

const invoices = [
  { id: "INV-001", status: "Paid", method: "Card", amount: 250 },
  { id: "INV-002", status: "Pending", method: "Bank transfer", amount: 150 },
  { id: "INV-003", status: "Paid", method: "UPI", amount: 350 },
  { id: "INV-004", status: "Failed", method: "Card", amount: 450 },
];

export default function TableDemo() {
  return (
    <Table className="max-w-xl">
      <TableCaption>Recent invoices</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.id}</TableCell>
            <TableCell>
              <Badge
                variant={
                  inv.status === "Paid"
                    ? "success"
                    : inv.status === "Failed"
                      ? "destructive"
                      : "outline"
                }
              >
                {inv.status}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {inv.method}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              ${inv.amount.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right tabular-nums">$1,200.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
