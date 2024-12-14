"use client"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Staff } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

export const staffColumns: ColumnDef<Staff>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "role",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) =>
        {
            const role = row.getValue("role") as string
            return <Badge>{role}</Badge>
        },
    },
    {
        accessorKey: "department.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Department" />
        ),
    },
    {
        accessorKey: "tasks",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tasks" />
        ),
        cell: ({ row }) =>
        {
            const tasks = row.original.tasks
            return <div>{tasks.length} tasks</div>
        },
    },
    {
        accessorKey: "shifts",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Shifts" />
        ),
        cell: ({ row }) =>
        {
            const shifts = row.original.shifts
            return <div>{shifts.length} shifts</div>
        },
    },
]

