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

export function TaskManagementTable()
{
    const [tasks] = useState(mockDb.tasks);

    const getStatusColor = (status: string) =>
    {
        const colors = {
            COMPLETED: "outline",
            PENDING: "secondary",
            IN_PROGRESS: "default",
            CANCELLED: "destructive",
        } as const;
        return colors[status as keyof typeof colors] || "default";
    };

    const getPriorityColor = (priority: string) =>
    {
        const colors = {
            HIGH: "destructive",
            MEDIUM: "secondary",
            LOW: "default",
        } as const;
        return colors[priority as keyof typeof colors] || "default";
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task) =>
                    {
                        const assignedTo = mockDb.users.find(u => u.id === task.userId);
                        return (
                            <TableRow key={task.id}>
                                <TableCell className="font-medium">{task.title}</TableCell>
                                <TableCell>{assignedTo?.name}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                </TableCell>
                                <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
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
                            </TableRow>);
                    })}
                </TableBody>tt
            </Table>
        </div>
    );
}