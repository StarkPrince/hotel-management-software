"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export type Booking = {
  id: string;
  guestName: string;
  roomNumber: string;
  checkIn: Date;
  checkOut: Date;
  status: string;
  source: string;
  totalAmount: number;
};

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "guestName",
    header: "Guest Name",
  },
  {
    accessorKey: "roomNumber",
    header: "Room",
  },
  {
    accessorKey: "checkIn",
    header: "Check In",
    cell: ({ row }) => format(row.original.checkIn, "MMM dd, yyyy"),
  },
  {
    accessorKey: "checkOut",
    header: "Check Out",
    cell: ({ row }) => format(row.original.checkOut, "MMM dd, yyyy"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={getStatusVariant(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.source}</Badge>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "Amount",
    cell: ({ row }) => `$${row.original.totalAmount}`,
  },
];

function getStatusVariant(status: string): "default" | "destructive" | "outline" | "secondary" {
  switch (status) {
    case "CONFIRMED":
      return "default";
    case "CANCELLED":
      return "destructive";
    case "CHECKED_IN":
      return "secondary";
    default:
      return "outline";
  }
}