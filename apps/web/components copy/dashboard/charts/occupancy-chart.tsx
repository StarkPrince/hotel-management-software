"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", occupancy: 85 },
  { day: "Tue", occupancy: 78 },
  { day: "Wed", occupancy: 90 },
  { day: "Thu", occupancy: 95 },
  { day: "Fri", occupancy: 98 },
  { day: "Sat", occupancy: 100 },
  { day: "Sun", occupancy: 92 },
];

export function OccupancyChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Weekly Occupancy Rate (%)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="occupancy" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}