"use client";

import { Badge } from "@/apps/web/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { ScrollArea } from "@/apps/web/components/ui/scroll-area";
import mockDb from "@/apps/web/data/mock-db.json";

export function RecentBookings()
{
  const recentBookings = mockDb.bookings
    .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {recentBookings.map((booking) =>
          {
            const guest = mockDb.users.find(u => u.id === booking.userId);
            const room = mockDb.rooms.find(r => r.id === booking.roomId);
            return (
              <div
                key={booking.id}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {guest?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Room {room?.number} • ${booking.totalPrice}
                  </p>
                  <div className="flex items-center pt-2">
                    <Badge variant="outline" className="text-xs">
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}