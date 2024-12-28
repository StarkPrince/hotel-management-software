"use client";

import { DepartmentOverview } from "@/apps/web/components/dashboard/staff/department-overview";
import { StaffManagementTable } from "@/apps/web/components/dashboard/staff/staff-management-table";
import { StaffPerformance } from "@/apps/web/components/dashboard/staff/staff-performance";
import { Button } from "@/apps/web/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { Plus } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function StaffPage()
{
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Staff Management</h1>
        <Button size="sm" onClick={() => router.push("/dashboard/staff/new")}>
          <Plus className="mr-1 h-3 w-3" /> Add Staff
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <StaffPerformance />
        <DepartmentOverview />
      </div>

      <Card>
        <CardHeader className="py-2">
          <CardTitle className="text-sm font-medium">All Staff</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <StaffManagementTable />
        </CardContent>
      </Card>
    </div>
  );
}

