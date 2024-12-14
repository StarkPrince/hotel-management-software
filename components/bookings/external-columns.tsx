"use client"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { ExternalBooking } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

export const externalBookingColumns: ColumnDef<ExternalBooking>[] = [
    {
        accessorKey: "externalBookingId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="External ID" />
        ),
    },
    {
        accessorKey: "guestName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Guest Name" />
        ),
    },
    {
        accessorKey: "source",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Platform" />
        ),
        cell: ({ row }) =>
        {
            const source = row.getValue("source") as string
            return <Badge>{source.replace("_", ".")}</Badge>
        },
    },
    {
        accessorKey: "checkIn",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Check-in" />
        ),
        cell: ({ row }) => format(new Date(row.getValue("checkIn")), "PPP"),
    },
    {
        accessorKey: "checkOut",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Check-out" />
        ),
        cell: ({ row }) => format(new Date(row.getValue("checkOut")), "PPP"),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) =>
        {
            const status = row.getValue("status") as string
            return <Badge variant={status === "CONFIRMED" ? "default" : "destructive"}>{status}</Badge>
        },
    },
    {
        accessorKey: "totalAmount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total Amount" />
        ),
        cell: ({ row }) =>
        {
            const amount = parseFloat(row.getValue("totalAmount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="font-medium">{formatted}</div>
        },
    },
]

