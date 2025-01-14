"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tool, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import mockDb from "@/data/mock-db.json";

export function MaintenanceStats() {
  const stats = [
    {
      title: "Total Requests",
      value: mockDb.maintenance.length,
      icon: Tool,
      description: "All maintenance requests",
    },
    {
      title: "Pending",
      value: mockDb.maintenance.filter(m => m.status === "PENDING").length,
      icon: Clock,
      description: "Awaiting action",
    },
    {
      title: "Completed",
      value: mockDb.maintenance.filter(m => m.status === "COMPLETED").length,
      icon: CheckCircle,
      description: "Successfully resolved",
    },
    {
      title: "Urgent Issues",
      value: mockDb.maintenance.filter(m => m.status === "PENDING").length,
      icon: AlertTriangle,
      description: "High priority requests",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}