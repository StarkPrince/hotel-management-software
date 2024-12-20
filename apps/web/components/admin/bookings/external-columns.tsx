"use client"

import { Badge } from "@/apps/web/components/ui/badge"
import { DataTableColumnHeader } from "@/apps/web/components/ui/data-table-column-header"
import { ExternalBooking } from "@/apps/web/types"
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
            try {

                return <Badge>{source.replace("_", ".")}</Badge>
            }
            catch (error) {
                return <Badge>{source}</Badge>
            }
        },
    },
    {
        accessorKey: "checkIn",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Check-in" />
        ),
        cell: ({ row }) =>
            format(new Date(row.getValue("checkIn") || new Date()), "PPP")
    },
    {
        accessorKey: "checkOut",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Check-out" />
        ),
        cell: ({ row }) => format(new Date(row.getValue("checkIn") || new Date()), "PPP")
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

