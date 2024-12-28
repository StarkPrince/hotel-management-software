"use client";

import { OccupancyStats } from "@/apps/web/components/admin/stats/occupancy-stats";
import { RevenueChart } from "@/apps/web/components/admin/stats/revenue-chart";

export function ChartsGrid()
{
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-6">
      <div className="md:col-span-4">
        <RevenueChart />
      </div>
      <div className="md:col-span-2">
        <OccupancyStats />
      </div>
    </div>
  );
}