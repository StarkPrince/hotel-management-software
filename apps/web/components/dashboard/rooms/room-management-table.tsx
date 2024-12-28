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
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export function RoomManagementTable()
{
  const [rooms] = useState(mockDb.rooms);

  const getRoomStatusColor = (status: string) =>
  {
    const colors = {
      AVAILABLE: "success",
      OCCUPIED: "warning",
      MAINTENANCE: "destructive",
      CLEANING: "secondary",
    } as const;
    return colors[status as keyof typeof colors] || "default";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Floor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Last Cleaned</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell className="font-medium">{room.number}</TableCell>
              <TableCell>{room.type}</TableCell>
              <TableCell>{room.floor}</TableCell>
              <TableCell>
                <Badge variant={getRoomStatusColor(room.status)}>{room.status}</Badge>
              </TableCell>
              <TableCell>${room.price}</TableCell>
              <TableCell>{new Date(room.lastCleaned).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}