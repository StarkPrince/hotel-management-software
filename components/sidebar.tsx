"use client"

import ModeToggle from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { BarChart3, BedDouble, CalendarDays, Globe, Hotel, Settings, PenToolIcon as Tool, Users } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

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
  // {
  //   label: "Tasks",
  //   icon: ClipboardList,
  //   href: "/tasks",
  // },
  {
    label: "Maintenance",
    icon: Tool,
    href: "/maintenance",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    label: "External Bookings",
    icon: Globe,
    href: "/external-bookings",
  },
]

export default function Sidebar()
{
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex items-center justify-between p-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Hotel className="h-6 w-6" />
          <span className="text-lg font-bold">HMS</span>
        </Link>
        <ModeToggle />
      </div>
      <ScrollArea className="flex-1 px-3">
        <nav className="flex flex-col space-y-1">
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
    </div>
  )
}

