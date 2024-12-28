"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import mockDb from "@/apps/web/data/mock-db.json";
import { AlertTriangle, BedDouble, Calendar, Users } from 'lucide-react';

export function QuickStats()
{
  const stats = [
    {
      title: "Available Rooms",
      value: mockDb.rooms.filter(r => r.status === "AVAILABLE").length,
      change: "+2.5%",
      icon: BedDouble,
      description: "from last month",
    },
    {
      title: "Active Guests",
      value: mockDb.bookings.filter(b => b.status === "CHECKED_IN").length,
      change: "+18.1%",
      icon: Users,
      description: "from last month",
    },
    {
      title: "New Bookings",
      value: mockDb.bookings.length,
      change: "+4.3%",
      icon: Calendar,
      description: "from last week",
    },
    {
      title: "Pending Issues",
      value: mockDb.maintenance.filter(m => m.status === "PENDING").length,
      change: "-8.1%",
      icon: AlertTriangle,
      description: "from yesterday",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{stat.value}</div>
            <p className="text-[10px] text-muted-foreground">
              <span className={stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {stat.change}
              </span>
              {' '}{stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

