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
import { Edit, Eye } from 'lucide-react';
import { useState } from "react";

export function BookingManagementTable()
{
  const [bookings] = useState(mockDb.bookings);

  const getStatusColor = (status: string) =>
  {
    switch (status) {
      case "CONFIRMED":
        return "outline";
      case "PENDING":
        return "secondary";
      case "CANCELLED":
        return "destructive";
      case "CHECKED_IN":
        return "default";
      case "CHECKED_OUT":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Guest</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) =>
          {
            const guest = mockDb.users.find(u => u.email === booking.guestEmail);
            const room = mockDb.rooms.find(r => r.id === booking.roomId);
            return (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{guest?.name}</TableCell>
                <TableCell>Room {room?.number}</TableCell>
                <TableCell>{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
                </TableCell>
                <TableCell>${booking.totalAmount.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">View details</span>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Edit</span>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
