"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import
{
  BarChart3,
  BedDouble,
  CalendarDays,
  ClipboardList,
  Hotel,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModeToggle from "./mode-toggle";

const routes = [
  {
    label: "Dashboard",
    icon: BarChart3,
    href: "/dashboard",
  },
  {
    label: "Rooms",
    icon: BedDouble,
    href: "/rooms",
  },
  {
    label: "Bookings",
    icon: CalendarDays,
    href: "/bookings",
  },
  {
    label: "Staff",
    icon: Users,
    href: "/staff",
  },
  {
    label: "Tasks",
    icon: ClipboardList,
    href: "/tasks",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar()
{
  const pathname = usePathname();

  return (
    <div className="h-full flex-1">
      <div className="px-3 py-2">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <Hotel className="h-8 w-8" />
          <h1 className="text-2xl font-bold ml-2 pr-4">HMS</h1>
          <ModeToggle />
        </Link>
        <ScrollArea className="flex-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start mb-1",
                pathname === route.href && "bg-white/10"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </Link>
            </Button>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}