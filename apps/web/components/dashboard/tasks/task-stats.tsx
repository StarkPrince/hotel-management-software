"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import mockDb from "@/apps/web/data/mock-db.json";
import { AlertTriangle, CheckCircle, Clock, ListTodo } from "lucide-react";

export function TaskStats()
{
    const stats = [
        {
            title: "Total Tasks",
            value: mockDb.tasks.length,
            icon: ListTodo,
            description: "All tasks",
        },
        {
            title: "Pending Tasks",
            value: mockDb.tasks.filter(t => t.status === "PENDING").length,
            icon: Clock,
            description: "Awaiting action",
        },
        {
            title: "Completed Tasks",
            value: mockDb.tasks.filter(t => t.status === "COMPLETED").length,
            icon: CheckCircle,
            description: "Successfully finished",
        },
        {
            title: "High Priority",
            value: mockDb.tasks.filter(t => t.priority === "HIGH").length,
            icon: AlertTriangle,
            description: "Urgent tasks",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {stat.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}