"use client"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Shift } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

export const shiftColumns: ColumnDef<Shift>[] = [
    {
        accessorKey: "staffId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Staff ID" />
        ),
    },
    {
        accessorKey: "startTime",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Start Time" />
        ),
        cell: ({ row }) => format(new Date(row.getValue("startTime")), "PPP HH:mm"),
    },
    {
        accessorKey: "endTime",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="End Time" />
        ),
        cell: ({ row }) => format(new Date(row.getValue("endTime")), "PPP HH:mm"),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) =>
        {
            const status = row.getValue("status") as string
            return <Badge variant={status === "COMPLETED" ? "default" : "destructive"}>{status}</Badge>
        },
    },
]

