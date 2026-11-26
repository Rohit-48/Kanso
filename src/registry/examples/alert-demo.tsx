import { CircleCheckIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert";

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <Alert>
        <InfoIcon />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          You can add components to your app with the CLI.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>Deployed</AlertTitle>
        <AlertDescription>Your site is live at kanso.dev.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <TriangleAlertIcon />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>
          Check your card details and try again.
        </AlertDescription>
      </Alert>
    </div>
  );
}
