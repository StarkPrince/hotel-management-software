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
import { Edit, Trash2 } from 'lucide-react';
import { useState } from "react";

export function RoomManagementTable()
{
  const [rooms] = useState(mockDb.rooms);

  const getRoomStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" =>
  {
    switch (status) {
      case "AVAILABLE":
        return "outline";
      case "OCCUPIED":
        return "secondary";
      case "MAINTENANCE":
        return "destructive";
      case "CLEANING":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Room Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Floor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Last Cleaned</TableHead>
            <TableHead className="text-right">Actions</TableHead>
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
              <TableCell>${room.price.toFixed(2)}</TableCell>
              <TableCell>{new Date(room.lastCleaned).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="sr-only">Edit</span>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="sr-only">Delete</span>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

