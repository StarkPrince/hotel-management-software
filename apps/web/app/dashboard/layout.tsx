"use client";

import { Button } from "@/apps/web/components/ui/button";
import { useAuth } from "@/apps/web/hooks/use-auth";
import { cn } from "@/apps/web/lib/utils";
import { BedDouble, Calendar, ClipboardList, LayoutDashboard, Menu, QrCode, Settings, Ticket, Users } from 'lucide-react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: BedDouble, label: "Rooms", href: "/dashboard/rooms" },
  { icon: Users, label: "Staff", href: "/dashboard/staff" },
  { icon: Ticket, label: "Ticket", href: "/dashboard/tickets" },
  { icon: Calendar, label: "Bookings", href: "/dashboard/bookings" },
  { icon: ClipboardList, label: "Tasks", href: "/dashboard/tasks" },
  { icon: Settings, label: "Maintenance", href: "/dashboard/maintenance" },
  { icon: QrCode, label: "QR Generator", href: "/dashboard/qr" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },

];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
})
{
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() =>
  {
    if (!user || user.role !== "ADMIN" && user.role !== "MANAGER") {
      router.push("/");
    }
  }, [user, router]);

  if (!user || !(user.role === "ADMIN" || user.role === "MANAGER")) {
    console.log("user", user);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-xs">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-48 border-r bg-white dark:bg-gray-800 transition-all duration-300",
          collapsed && "w-12"
        )}
      >
        <div className="flex h-full flex-col">
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center space-x-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="h-3 w-3" />
          </Button>

          <div className="flex-1 space-y-1 p-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 rounded-lg pl-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700",
                  pathname === item.href && "bg-gray-100 dark:bg-gray-700",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className="h-3 w-3" />
                {!collapsed && <span className="text-xs">{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-[calc(100vh-4rem)] transition-all duration-300 pl-6 bg-gray-50 dark:bg-gray-900",
          collapsed ? "ml-12" : "ml-48"
        )}
      >
        <div className="container py-4">{children}</div>
      </main>
    </div>
  );
}
