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

export function StaffAssignments() {
  const [assignments] = useState([...mockDb.tasks, ...mockDb.tickets]);

  const getStatusColor = (status: string) => {
    const colors = {
      OPEN: "default",
      IN_PROGRESS: "warning",
      COMPLETED: "success",
      CANCELLED: "destructive",
      PENDING: "warning",
    } as const;
    return colors[status as keyof typeof colors] || "default";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((assignment) => {
            const staff = mockDb.users.find(u => u.id === assignment.assignedTo);
            const isTask = 'dueDate' in assignment;
            return (
              <TableRow key={assignment.id}>
                <TableCell>
                  <Badge variant="outline">
                    {isTask ? 'Task' : 'Ticket'}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{assignment.title}</TableCell>
                <TableCell>{staff?.name || 'Unassigned'}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(assignment.status)}>
                    {assignment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {isTask ? new Date(assignment.dueDate).toLocaleDateString() : 'N/A'}
                </TableCell>
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