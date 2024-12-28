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
        <CardTitle className="text-sm font-medium">Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {recentBookings.map((booking) =>
          {
            const guest = mockDb.users.find(u => u.email === booking.guestEmail);
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
                  <p className="text-xs text-muted-foreground">
                    Room {room?.number} • ${booking.totalAmount.toFixed(2)}
                  </p>
                  <div className="flex items-center pt-2">
                    <Badge variant="secondary" className="text-xs">
                      {booking.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-2">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </span>
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

