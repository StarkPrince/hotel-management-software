"use client"

import { Badge } from "@/apps/web/components/ui/badge"
import { Button } from "@/apps/web/components/ui/button"
import { DataTableColumnHeader } from "@/apps/web/components/ui/data-table-column-header"
import { MaintenanceLog, TaskStatus } from "@/apps/web/types"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

export const maintenanceColumns: ColumnDef<MaintenanceLog>[] = [
    {
        accessorKey: "room.number",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Room" />
        ),
    },
    {
        accessorKey: "issue",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Issue" />
        ),
    },
    {
        accessorKey: "priority",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Priority" />
        ),
        cell: ({ row }) =>
        {
            const priority = row.getValue("priority") as string
            return <Badge variant={priority === "URGENT" ? "destructive" : "default"}>{priority}</Badge>
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) =>
        {
            const status = row.getValue("status") as string
            return <Badge variant={status === "RESOLVED" ? "secondary" : "default"}>{status}</Badge>
        },
    },
    {
        accessorKey: "assignedTo",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Assigned To" />
        ),
        cell: ({ row }) =>
        {
            const assignedTo = row.getValue("assignedTo") as string | null
            return assignedTo ? assignedTo : "Unassigned"
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => format(new Date(row.getValue("createdAt")), "PPP"),
    },
    {
        id: "actions",
        cell: ({ row }) =>
        {
            const maintenance = row.original
            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => row.toggleSelected(!row.getIsSelected())}
                >
                    {maintenance.status === TaskStatus.COMPLETED ? "Reopen" : "Resolve"}
                </Button>
            )
        },
    },
]

