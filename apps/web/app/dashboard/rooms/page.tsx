"use client";

import { RoomManagementTable } from "@/apps/web/components/dashboard/rooms/room-management-table";
import { RoomStatusOverview } from "@/apps/web/components/dashboard/rooms/room-status-overview";
import { RoomTypeDistribution } from "@/apps/web/components/dashboard/rooms/room-type-distribution";
import { Button } from "@/apps/web/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { Plus } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function RoomsPage()
{
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Room Management</h1>
        <Button size="sm" onClick={() => router.push("/dashboard/rooms/new")}>
          <Plus className="mr-1 h-3 w-3" /> Add Room
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <RoomStatusOverview />
        <RoomTypeDistribution />
      </div>

      <Card>
        <CardHeader className="py-2">
          <CardTitle className="text-sm">All Rooms</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <RoomManagementTable />
        </CardContent>
      </Card>
    </div>
  );
}

