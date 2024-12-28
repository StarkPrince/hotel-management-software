"use client";

import { Badge } from "@/apps/web/components/ui/badge";
import { Button } from "@/apps/web/components/ui/button";
import
{
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/apps/web/components/ui/table";
import mockDb from "@/apps/web/data/mock-db.json";
import { Edit, Eye } from "lucide-react";
import { useState } from "react";

export function BookingManagementTable()
{
  const [bookings] = useState(mockDb.bookings);

  const getStatusColor = (status: string) =>
  {
    const colors = {
      CONFIRMED: "success",
      PENDING: "warning",
      CANCELLED: "destructive",
      CHECKED_IN: "default",
      CHECKED_OUT: "secondary",
    } as const;
    return colors[status as keyof typeof colors] || "default";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guest</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) =>
          {
            const guest = mockDb.users.find(u => u.id === booking.userId);
            const room = mockDb.rooms.find(r => r.id === booking.roomId);
            return (
              <TableRow key={booking.id}>
                <TableCell>{guest?.name}</TableCell>
                <TableCell>Room {room?.number}</TableCell>
                <TableCell>{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
                </TableCell>
                <TableCell>${booking.totalPrice}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}