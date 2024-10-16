import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { ChevronDown, LogOut } from "lucide-react";

export default function UserProfileDropdown(): JSX.Element {
  const location = useLocation();
  const isProfileRoute = location.pathname.startsWith("/profile");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isProfileRoute ? "bg-blue-100" : ""
          }`}
        >
          <img
            src="/placeholder.svg"
            alt="User"
            className="h-15 w-15 rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/profile" className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center justify-between">
              Settings
              <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/profile/general" className="w-full">
                  General
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/profile/security" className="w-full">
                  Security
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/profile/notifications" className="w-full">
                  Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
