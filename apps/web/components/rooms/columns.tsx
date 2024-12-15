"use client"

import { Badge } from "@/apps/web/components/ui/badge"
import { Button } from "@/apps/web/components/ui/button"
import { DataTableColumnHeader } from "@/apps/web/components/ui/data-table-column-header"
import { Room, RoomStatus } from "@/apps/web/types"
import { ColumnDef } from "@tanstack/react-table"
import { Edit } from 'lucide-react'

export const roomColumns: ColumnDef<Room>[] = [
    {
        accessorKey: "number",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Room Number" />
        ),
    },
    {
        accessorKey: "type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) =>
        {
            const status = row.getValue("status") as RoomStatus
            return <Badge variant={status === RoomStatus.AVAILABLE ? "default" : "secondary"}>{status}</Badge>
        },
    },
    {
        accessorKey: "floor",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Floor" />
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) =>
        {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "amenities",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Amenities" />
        ),
        cell: ({ row }) =>
        {
            const amenities = row.getValue("amenities") as { name: string }[]
            return (
                <div className="flex flex-wrap gap-1">
                    {amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">{amenity.name}</Badge>
                    ))}
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) =>
        {
            const room = row.original
            return (
                <Button
                    variant="ghost"
                    onClick={() => row.toggleSelected(!row.getIsSelected())}
                >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </Button>
            )
        },
    },
]

