"use client";

import { Button } from "@/apps/web/components/ui/button";
import { useAuth } from "@/apps/web/hooks/use-auth";
import { cn } from "@/apps/web/lib/utils";
import
{
  BedDouble,
  Calendar,
  ClipboardList,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: BedDouble, label: "Rooms", href: "/dashboard/rooms" },
  { icon: Users, label: "Staff", href: "/dashboard/staff" },
  { icon: Calendar, label: "Bookings", href: "/dashboard/bookings" },
  { icon: ClipboardList, label: "Tasks", href: "/dashboard/tasks" },
  { icon: Settings, label: "Maintenance", href: "/dashboard/maintenance" },
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
    if (!user || user.role !== "ADMIN") {
      router.push("/");
    }
  }, [user, router]);

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r bg-white dark:bg-gray-800 transition-all duration-300",
          collapsed && "w-16"
        )}
      >
        <div className="flex h-full flex-col">
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-4 hidden md:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="h-4 w-4" />
          </Button>

          <div className="flex-1 space-y-1 p-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 rounded-lg px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700",
                  pathname === item.href && "bg-gray-100 dark:bg-gray-700",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-[calc(100vh-4rem)] transition-all duration-300 bg-gray-50 dark:bg-gray-900",
          collapsed ? "ml-16" : "ml-64"
        )}
      >
        <div className="container py-6">{children}</div>
      </main>
    </div>
  );
}