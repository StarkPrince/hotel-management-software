"use client";

import { RevenueChart } from "@/apps/web/components/admin/stats/revenue-chart";
import { OccupancyChart } from "@/apps/web/components/dashboard/charts/occupancy-chart";
import { QuickStats } from "@/apps/web/components/dashboard/stats/quick-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { ScrollArea } from "@/apps/web/components/ui/scroll-area";
import mockDb from "@/apps/web/data/mock-db.json";
import { useAuth } from "@/apps/web/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage()
{
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

  const recentBookings = mockDb.bookings
    .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>

      <QuickStats />

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-6">
        <div className="lg:col-span-4">
          <RevenueChart />
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {recentBookings.map((booking) =>
                {
                  const guest = mockDb.users.find(u => u.id === booking.userId);
                  const room = mockDb.rooms.find(r => r.id === booking.roomId);
                  return (
                    <div key={booking.id} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {guest?.name} - Room {room?.number}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Check-in: {new Date(booking.checkIn).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-6">
        <div className="lg:col-span-4">
          <OccupancyChart />
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {mockDb.maintenance
                  .filter(m => m.status === "PENDING")
                  .map((issue) =>
                  {
                    const room = mockDb.rooms.find(r => r.id === issue.roomId);
                    return (
                      <div key={issue.id} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-red-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            Room {room?.number} - {issue.issue}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Reported: {new Date(issue.reportedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}