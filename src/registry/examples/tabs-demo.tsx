import { Button } from "@/registry/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Update your name and handle.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Label htmlFor="t-name">Name</Label>
            <Input id="t-name" defaultValue="Ada Lovelace" />
          </CardContent>
          <CardFooter>
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              You will be signed out of other devices.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Label htmlFor="t-pass">New password</Label>
            <Input id="t-pass" type="password" />
          </CardContent>
          <CardFooter>
            <Button>Update password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
