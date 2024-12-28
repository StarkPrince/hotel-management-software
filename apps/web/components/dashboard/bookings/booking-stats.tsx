"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import mockDb from "@/apps/web/data/mock-db.json";
import { BedDouble, CalendarCheck, CreditCard, Users } from 'lucide-react';

export function BookingStats()
{
  const stats = [
    {
      title: "Total Bookings",
      value: mockDb.bookings.length,
      icon: CalendarCheck,
      description: "All time bookings",
    },
    {
      title: "Current Guests",
      value: mockDb.bookings.filter(b => b.status === "CHECKED_IN").length,
      icon: Users,
      description: "Checked-in guests",
    },
    {
      title: "Available Rooms",
      value: mockDb.rooms.filter(r => r.status === "AVAILABLE").length,
      icon: BedDouble,
      description: "Ready for booking",
    },
    {
      title: "Revenue",
      value: `$${mockDb.bookings.reduce((acc, b) => acc + b.totalPrice, 0).toLocaleString()}`,
      icon: CreditCard,
      description: "Total revenue",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

