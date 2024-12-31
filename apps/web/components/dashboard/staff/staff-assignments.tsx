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
import { StaffMember } from "@/apps/web/types/staff";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export function StaffAssignments({ staff }: { staff: StaffMember })
{
    const [assignments] = useState([...mockDb.tasks, ...mockDb.tickets]);

    const getStatusColor = (status: string) =>
    {
        const colors = {
            OPEN: "default",
            IN_PROGRESS: "secondary",
            COMPLETED: "default",
            CANCELLED: "destructive",
            PENDING: "outline",
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
                    {assignments.map((assignment) =>
                    {
                        const staff = mockDb.users.find(u => u.id === assignment.id);
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