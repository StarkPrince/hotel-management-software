"use client";

import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/bookings/data-table";
import { bookingColumns } from "@/components/bookings/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const bookings = [
  {
    id: "1",
    guestName: "John Doe",
    roomNumber: "101",
    checkIn: new Date("2024-03-20"),
    checkOut: new Date("2024-03-25"),
    status: "CONFIRMED",
    source: "BOOKING_COM",
    totalAmount: 750,
  },
  // Add more sample bookings as needed
];

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>
      <Card className="p-6">
        <DataTable columns={bookingColumns} data={bookings} />
      </Card>
    </div>
  );
}