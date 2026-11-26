import { Button } from "@/registry/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Separator } from "@/registry/ui/separator";

export default function LoginBlock() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Welcome back</CardTitle>
        <CardDescription>
          Sign in to continue to your workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path
                fill="currentColor"
                d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
              />
            </svg>
            GitHub
          </Button>
          <Button variant="outline">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path
                fill="currentColor"
                d="M21.35 11.1H12v2.98h5.35c-.5 2.5-2.6 3.92-5.35 3.92a6 6 0 1 1 3.9-10.55l2.2-2.2A9.1 9.1 0 0 0 12 2.9a9.1 9.1 0 1 0 0 18.2c4.55 0 8.7-3.3 8.7-9.1 0-.3-.15-.6-.35-.9Z"
              />
            </svg>
            Google
          </Button>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Separator className="flex-1" /> or <Separator className="flex-1" />
        </div>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="lb-email">Email</Label>
            <Input
              id="lb-email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="lb-pass">Password</Label>
              <a
                href="#"
                className="text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                Forgot?
              </a>
            </div>
            <Input id="lb-pass" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          No account?{" "}
          <a href="#" className="text-foreground underline underline-offset-4">
            Create one
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
