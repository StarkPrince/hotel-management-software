"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import mockDb from "@/data/mock-db.json";

export function RoomManagement() {
  const [rooms] = useState(mockDb.rooms);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Room Management</h2>
        <Button>Add Room</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Last Cleaned</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>{room.number}</TableCell>
              <TableCell>{room.type}</TableCell>
              <TableCell>
                <Badge variant={room.status === "AVAILABLE" ? "default" : "secondary"}>
                  {room.status}
                </Badge>
              </TableCell>
              <TableCell>${room.price}</TableCell>
              <TableCell>{new Date(room.lastCleaned).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}