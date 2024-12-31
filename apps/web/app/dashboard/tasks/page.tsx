"use client";

import { TaskDistribution } from "@/apps/web/components/dashboard/tasks/task-distribution";
import { TaskManagementTable } from "@/apps/web/components/dashboard/tasks/task-management-table";
import { TaskStats } from "@/apps/web/components/dashboard/tasks/task-stats";
import { Button } from "@/apps/web/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { Plus } from "lucide-react";

export default function TasksPage()
{
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Task Management</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Task
                </Button>
            </div>

            <TaskStats />

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-6">
                <div className="lg:col-span-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TaskManagementTable />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <TaskDistribution />
                </div>
            </div>
        </div>
    );
}