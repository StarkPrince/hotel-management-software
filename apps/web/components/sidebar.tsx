"use client"

import ModeToggle from "@/apps/web/components/mode-toggle"
import { Button } from "@/apps/web/components/ui/button"
import { ScrollArea } from "@/apps/web/components/ui/scroll-area"
import { cn } from "@/apps/web/lib/utils"
import { BarChart3, BedDouble, CalendarDays, ClipboardList, Globe, Hotel, LogIn, LogOut, Settings, SquareFunction, PenToolIcon as Tool, User, Users } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

const routes = [
  {
    label: "Dashboard",
    icon: BarChart3,
    href: "/admin",
  },
  {
    label: "Rooms",
    icon: BedDouble,
    href: "/admin/rooms",
  },
  {
    label: "Bookings",
    icon: CalendarDays,
    href: "/admin/bookings",
  },
  {
    label: "Staff",
    icon: Users,
    href: "/admin/staff",
  },
  {
    label: "Tasks",
    icon: ClipboardList,
    href: "/admin/tasks",
  },
  {
    label: "Amenities",
    icon: SquareFunction,
    href: "/admin/amenities",
  },
  {
    label: "Maintenance",
    icon: Tool,
    href: "/admin/maintenance",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
  {
    label: "External Bookings",
    icon: Globe,
    href: "/admin/external-bookings",
  },
]

const bottomRoutes = [
  {
    label: "Profile",
    icon: User,
    href: "/admin/profile",
  },
  {
    label: "Login",
    icon: LogIn,
    href: "/login",
  },
  {
    label: "Logout",
    icon: LogOut,
    href: "/logout",
  }
]

export default function Sidebar()
{
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex items-center justify-between p-4">
        <Link href="/admin" className="flex items-center space-x-2">
          <Hotel className="h-6 w-6" />
          <span className="text-lg font-bold">HMS</span>
        </Link>
        <ModeToggle />
      </div>
      <ScrollArea className="flex-1 px-3">
        <nav className="flex flex-col space-y-0">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "justify-start",
                pathname === route.href && "bg-muted"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 space-y-0">
        <nav className="flex flex-col space-y-0">
          {bottomRoutes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "justify-start",
                pathname === route.href && "bg-muted"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
