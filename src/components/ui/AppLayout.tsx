import React, { useState } from "react";
import { Bell, ChevronDown, LogOut, Menu, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, NavLink, Outlet } from "react-router-dom";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  to: string;
};

const navItems: NavItem[] = [
  { name: "Overview", icon: <Users size={20} />, to: "/dashboard" },
  { name: "Users", icon: <Users size={20} />, to: "/users" },
  { name: "Seekers", icon: <Users size={20} />, to: "/seekers" },
  { name: "Givers", icon: <Users size={20} />, to: "/givers" },
  { name: "Disputes", icon: <Users size={20} />, to: "/disputes" },
  { name: "Ren Rewards", icon: <Users size={20} />, to: "/rewards" },
  { name: "Privacy And Security", icon: <Users size={20} />, to: "privacy" },
];

function NotificationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell size={24} />
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

function SidebarContent() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className="flex items-center rounded-lg px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="border-t p-4 space-y-2">
        <Link
          to="/settings"
          className="w-full flex justify-center items-center border border-gray-500 rounded py-2 "
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Link>
        <Button
          variant="outline"
          className="w-full flex justify-center items-center border border-gray-500  rounded py-4"
        >
          LogOut
        </Button>
      </div>
    </div>
  );
}

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 bg-white shadow-md lg:block">
        <SidebarContent />
      </aside>

      {/* Sidebar for mobile screens */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
            </Sheet>
            <h1 className="ml-4 text-xl font-semibold">RENNDAAR</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Settings link */}
            <Link to="/settings">
              <Settings className="h-15 w-15" />
            </Link>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
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
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex w-full items-center justify-between">
                      Settings
                      <ChevronDown size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>General</DropdownMenuItem>
                      <DropdownMenuItem>Security</DropdownMenuItem>
                      <DropdownMenuItem>Notifications</DropdownMenuItem>
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
            {/* Notification Dialog */}
            <NotificationDialog />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
