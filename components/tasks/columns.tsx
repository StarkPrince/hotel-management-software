"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Task } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

export const taskColumns: ColumnDef<Task>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
    },
    {
        accessorKey: "assignedTo.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Assigned To" />
        ),
    },
    {
        accessorKey: "dueDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Due Date" />
        ),
        cell: ({ row }) => format(new Date(row.getValue("dueDate")), "PPP"),
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
            return <Badge variant={status === "COMPLETED" ? "secondary" : "default"}>{status}</Badge>
        },
    },
    {
        id: "actions",
        cell: ({ row }) =>
        {
            const task = row.original
            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => row.toggleSelected(!row.getIsSelected())}
                >
                    {task.status === "COMPLETED" ? "Reopen" : "Complete"}
                </Button>
            )
        },
    },
]

