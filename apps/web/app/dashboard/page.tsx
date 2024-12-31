"use client";

import { RevenueChart } from "@/apps/web/components/admin/stats/revenue-chart";
import { OccupancyChart } from "@/apps/web/components/dashboard/charts/occupancy-chart";
import { QuickStats } from "@/apps/web/components/dashboard/stats/quick-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { ScrollArea } from "@/apps/web/components/ui/scroll-area";
import mockDb from "@/apps/web/data/mock-db.json";
import { useAuth } from "@/apps/web/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function DashboardPage()
{
  const { user } = useAuth();
  const router = useRouter();


  const recentBookings = mockDb.bookings
    .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard Overview</h1>
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>

      <QuickStats />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-6">
        <div className="lg:col-span-4">
          <RevenueChart />
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm">Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <ScrollArea className="h-[250px]">
                {recentBookings.map((booking) =>
                {
                  const guest = mockDb.users.find(u => u.email === booking.guestEmail);
                  const room = mockDb.rooms.find(r => r.id === booking.roomId);
                  return (
                    <div key={booking.id} className="mb-2 grid grid-cols-[16px_1fr] items-start pb-2 last:mb-0 last:pb-0">
                      <span className="flex h-1.5 w-1.5 translate-y-1 rounded-full bg-sky-500" />
                      <div className="space-y-0.5">
                        <p className="text-xs font-medium">
                          {guest?.name} - Room {room?.number}
                        </p>
                        <p className="text-xs text-muted-foreground">
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

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-6">
        <div className="lg:col-span-4">
          <OccupancyChart />
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm">Maintenance Alerts</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <ScrollArea className="h-[250px]">
                {mockDb.maintenance
                  .filter(m => m.status === "PENDING")
                  .map((issue) =>
                  {
                    const room = mockDb.rooms.find(r => r.id === issue.roomId);
                    return (
                      <div key={issue.id} className="mb-2 grid grid-cols-[16px_1fr] items-start pb-2 last:mb-0 last:pb-0">
                        <span className="flex h-1.5 w-1.5 translate-y-1 rounded-full bg-red-500" />
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium">
                            Room {room?.number} - {issue.issue}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Reported: {new Date(issue.createdAt).toLocaleDateString()}
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

