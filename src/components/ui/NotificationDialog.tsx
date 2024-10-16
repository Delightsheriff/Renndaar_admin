import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { Bell } from "lucide-react";

export default function NotificationDialog(): JSX.Element {
  const location = useLocation();
  const isNotificationRoute = location.pathname === "/notifications";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={isNotificationRoute ? "bg-blue-100" : ""}
        >
          <Bell
            size={24}
            className={isNotificationRoute ? "text-blue-500" : ""}
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>
            View your recent notifications here.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p>You have no new notifications.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
