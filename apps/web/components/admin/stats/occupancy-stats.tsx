"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { Progress } from "@/apps/web/components/ui/progress";

export function OccupancyStats()
{
  const occupancyRate = 75; // This would come from your API

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Occupancy Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{occupancyRate}%</span>
            <span className="text-sm text-muted-foreground">Current Occupancy</span>
          </div>
          <Progress value={occupancyRate} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}