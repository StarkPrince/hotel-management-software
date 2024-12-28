"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { Progress } from "@/apps/web/components/ui/progress";
import mockDb from "@/apps/web/data/mock-db.json";

export function RoomStatusOverview()
{
  const totalRooms = mockDb.rooms.length;
  const availableRooms = mockDb.rooms.filter(r => r.status === "AVAILABLE").length;
  const occupiedRooms = mockDb.rooms.filter(r => r.status === "OCCUPIED").length;
  const maintenanceRooms = mockDb.rooms.filter(r => r.status === "MAINTENANCE").length;

  const occupancyRate = (occupiedRooms / totalRooms) * 100;

  return (
    <Card className="col-span-2 md:col-span-1">
      <CardHeader>
        <CardTitle>Room Status Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Occupancy Rate</span>
            <span className="text-sm font-medium">{occupancyRate.toFixed(1)}%</span>
          </div>
          <Progress value={occupancyRate} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4">
          <div>
            <div className="text-2xl font-bold">{availableRooms}</div>
            <div className="text-xs text-muted-foreground">Available</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{occupiedRooms}</div>
            <div className="text-xs text-muted-foreground">Occupied</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{maintenanceRooms}</div>
            <div className="text-xs text-muted-foreground">Maintenance</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}