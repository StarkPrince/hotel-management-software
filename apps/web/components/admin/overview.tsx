"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import mockDb from "@/apps/web/data/mock-db.json";
import { Calendar, Hotel, Tool, Users } from "lucide-react";
import { OccupancyStats } from "./stats/occupancy-stats";
import { RevenueChart } from "./stats/revenue-chart";

export function AdminOverview()
{
  const stats = [
    {
      title: "Total Rooms",
      value: mockDb.rooms.length,
      icon: Hotel,
      description: `${mockDb.rooms.filter(r => r.status === "AVAILABLE").length} Available`,
    },
    {
      title: "Active Bookings",
      value: mockDb.bookings.filter(b => b.status === "ACTIVE").length,
      icon: Calendar,
      description: "Current reservations",
    },
    {
      title: "Staff Members",
      value: mockDb.users.filter(u => u.role !== "GUEST").length,
      icon: Users,
      description: "Including managers",
    },
    {
      title: "Maintenance Tasks",
      value: mockDb.maintenance.length,
      icon: Tool,
      description: `${mockDb.maintenance.filter(m => m.status === "PENDING").length} Pending`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-6">
        <div className="md:col-span-4">
          <RevenueChart />
        </div>
        <div className="md:col-span-2">
          <OccupancyStats />
        </div>
      </div>
    </div>
  );
}