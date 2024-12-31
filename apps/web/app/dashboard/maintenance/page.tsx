"use client";

import { MaintenanceManagementTable } from "@/apps/web/components/dashboard/maintenance/maintenance-management-table";
import { MaintenanceStats } from "@/apps/web/components/dashboard/maintenance/maintenance-stats";
import { MaintenanceTimeline } from "@/apps/web/components/dashboard/maintenance/maintenance-timeline";
import { Button } from "@/apps/web/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { Plus } from "lucide-react";

export default function MaintenancePage()
{
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Maintenance Management</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Request
                </Button>
            </div>

            <MaintenanceStats />

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-6">
                <div className="lg:col-span-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Maintenance Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <MaintenanceManagementTable />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <MaintenanceTimeline />
                </div>
            </div>
        </div>
    );
}