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
import { Edit, Trash2 } from "lucide-react";
import mockDb from "@/data/mock-db.json";

export function MaintenanceManagementTable() {
  const [maintenance] = useState(mockDb.maintenance);

  const getStatusColor = (status: string) => {
    const colors = {
      COMPLETED: "success",
      PENDING: "warning",
      SCHEDULED: "default",
      CANCELLED: "destructive",
    } as const;
    return colors[status as keyof typeof colors] || "default";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room</TableHead>
            <TableHead>Issue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reported Date</TableHead>
            <TableHead>Scheduled Date</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenance.map((item) => {
            const room = mockDb.rooms.find(r => r.id === item.roomId);
            const assignedTo = mockDb.users.find(u => u.id === item.assignedTo);
            return (
              <TableRow key={item.id}>
                <TableCell>Room {room?.number}</TableCell>
                <TableCell>{item.issue}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(item.status)}>{item.status}</Badge>
                </TableCell>
                <TableCell>{new Date(item.reportedDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(item.scheduledDate).toLocaleDateString()}</TableCell>
                <TableCell>{assignedTo?.name}</TableCell>
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
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}