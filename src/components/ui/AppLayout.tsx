import React, { useState } from "react";
import {
  ChartPie,
  Gift,
  LogOut,
  Menu,
  Settings,
  Shield,
  ThumbsDown,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import UserProfileDropdown from "./UserProfileDropdown";
import NotificationDialog from "./NotificationDialog";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  to: string;
};

export const navItems: NavItem[] = [
  { name: "Overview", icon: <ChartPie size={20} />, to: "/dashboard" },
  { name: "Users", icon: <Users size={20} />, to: "/users" },
  { name: "Seekers", icon: <User size={20} />, to: "/seekers" },
  { name: "Givers", icon: <User size={20} />, to: "/givers" },
  {
    name: "Disputes",
    icon: <ThumbsDown size={20} />,
    to: "/disputes",
  },
  { name: "Ren Rewards", icon: <Gift size={20} />, to: "/rewards" },
  { name: "Privacy And Security", icon: <Shield size={20} />, to: "/privacy" },
];

interface SettingsLinkProps {
  withText?: boolean; // Optional prop to control whether to show text alongside the icon
}

function SettingsLink({ withText = false }: SettingsLinkProps): JSX.Element {
  const location = useLocation();
  const isActive = location.pathname === "/settings";

  return (
    <Link
      to="/settings"
      className={`flex items-center ${
        withText
          ? "w-full justify-center border border-gray-500 rounded py-2"
          : ""
      }`}
    >
      <Settings
        className={`${withText ? "mr-2 h-4 w-4" : "h-15 w-15"} ${
          isActive ? "text-blue-500" : "text-gray-500"
        }`}
      />
      {withText && <span>Settings</span>}
    </Link>
  );
}

type SidebarContentProps = {
  navItems: NavItem[];
};

function SidebarContent({ navItems }: SidebarContentProps): JSX.Element {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-6">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <nav className="flex-1 space-y-2 px-2 py-5">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center rounded-lg px-3 py-3 text-sm font-medium ${
                isActive
                  ? "bg-blue_main-100 hover:bg-blue-700 text-white"
                  : "text-blue_gray-200 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="border-t p-4 space-y-2">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center rounded-lg px-3 py-3 text-sm font-medium ${
              isActive
                ? "bg-blue_main-100 hover:bg-blue-700 text-white"
                : "text-blue_gray-200 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          <Settings />
          <span className="ml-3">Settings</span>
        </NavLink>
        <Button className="flex justify-start rounded-lg px-3 py-3 text-sm font-medium w-full text-blue_gray-200 bg-transparent border-none shadow-none hover:bg-gray-50 hover:text-gray-900 active:bg-blue_main-100">
          <LogOut className="mr-2 h-4 w-4" />
          <span className="ml-3">Logout</span>
        </Button>
      </div>
    </div>
  );
}

export default function AppLayout(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const location = useLocation();

  const getCurrentPageTitle = (): string => {
    const currentPath = location.pathname;
    const currentNavItem = navItems.find((item) => item.to === currentPath);
    return currentNavItem ? currentNavItem.name : "RENNDAAR";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 bg-white shadow-md lg:block">
        <SidebarContent navItems={navItems} />
      </aside>

      {/* Sidebar for mobile screens */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <SidebarContent navItems={navItems} />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-gray-100 px-4 shadow-sm">
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
            <h1 className="ml-4 text-2xl font-semibold uppercase">
              {getCurrentPageTitle()}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <SettingsLink />
            <UserProfileDropdown />
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
