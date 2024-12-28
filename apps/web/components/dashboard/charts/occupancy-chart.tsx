"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", occupancy: 85 },
  { day: "Tue", occupancy: 78 },
  { day: "Wed", occupancy: 90 },
  { day: "Thu", occupancy: 95 },
  { day: "Fri", occupancy: 98 },
  { day: "Sat", occupancy: 100 },
  { day: "Sun", occupancy: 92 },
];

export function OccupancyChart()
{
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Weekly Occupancy Rate (%)</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Bar dataKey="occupancy" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

