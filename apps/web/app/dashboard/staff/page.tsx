"use client";

import { DepartmentOverview } from "@/apps/web/components/dashboard/staff/department-overview";
import { StaffManagementTable } from "@/apps/web/components/dashboard/staff/staff-management-table";
import { StaffPerformance } from "@/apps/web/components/dashboard/staff/staff-performance";
import { Button } from "@/apps/web/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StaffPage()
{
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <Button onClick={() => router.push("/dashboard/staff/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add Staff Member
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <DepartmentOverview />
        <StaffPerformance />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          <StaffManagementTable />
        </CardContent>
      </Card>
    </div>
  );
}