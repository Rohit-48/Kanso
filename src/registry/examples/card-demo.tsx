import { Button } from "@/registry/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Enter your email to get a magic link.</CardDescription>
        <CardAction>
          <Button variant="link" className="h-auto p-0">
            Sign up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Label htmlFor="card-email">Email</Label>
        <Input id="card-email" type="email" placeholder="you@example.com" />
      </CardContent>
      <CardFooter>
        <Button className="w-full">Send link</Button>
      </CardFooter>
    </Card>
  );
}
