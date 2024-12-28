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

export function StaffManagementTable()
{
  const [staff] = useState(mockDb.users.filter(user => user.role !== "GUEST"));

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>
                <Badge>{member.role}</Badge>
              </TableCell>
              <TableCell>{member.departmentId || "N/A"}</TableCell>
              <TableCell>
                <Badge variant="outline">Active</Badge>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}