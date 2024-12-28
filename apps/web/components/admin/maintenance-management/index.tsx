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
import { useState } from "react";

export default function MaintenanceManagement()
{
  const [maintenance] = useState(mockDb.maintenance);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Maintenance Management</h2>
        <Button>Create Request</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room</TableHead>
            <TableHead>Issue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reported Date</TableHead>
            <TableHead>Scheduled Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenance.map((item) => (
            <TableRow key={item.id}>
              <TableCell>Room {mockDb.rooms.find(r => r.id === item.roomId)?.number}</TableCell>
              <TableCell>{item.issue}</TableCell>
              <TableCell>
                <Badge variant={item.status === "PENDING" ? "secondary" : "default"}>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(item.reportedDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(item.scheduledDate).toLocaleDateString()}</TableCell>
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