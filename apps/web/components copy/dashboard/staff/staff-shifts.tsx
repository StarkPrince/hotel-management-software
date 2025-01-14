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
import { Shift } from "@/types/staff";
import { getStatusColor, formatTimeRange, formatDate } from "@/lib/utils/staff";
import mockDb from "@/data/mock-db.json";

interface StaffShiftsProps {
  staffId?: string;
}

export function StaffShifts({ staffId }: StaffShiftsProps) {
  const [shifts] = useState<Shift[]>([
    {
      id: "1",
      staffId: "3",
      date: "2024-03-25",
      startTime: "09:00",
      endTime: "17:00",
      department: "Housekeeping",
      status: "SCHEDULED"
    },
    {
      id: "2",
      staffId: "3",
      date: "2024-03-26",
      startTime: "10:00",
      endTime: "18:00",
      department: "Maintenance",
      status: "PENDING"
    }
  ]);

  const filteredShifts = staffId 
    ? shifts.filter(shift => shift.staffId === staffId)
    : shifts;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff Member</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredShifts.map((shift) => {
            const staff = mockDb.users.find(u => u.id === shift.staffId);
            return (
              <TableRow key={shift.id}>
                <TableCell className="font-medium">{staff?.name}</TableCell>
                <TableCell>{formatDate(shift.date)}</TableCell>
                <TableCell>{formatTimeRange(shift.startTime, shift.endTime)}</TableCell>
                <TableCell>{shift.department}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(shift.status)}>
                    {shift.status}
                  </Badge>
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
            )})}
        </TableBody>
      </Table>
    </div>
  );
}