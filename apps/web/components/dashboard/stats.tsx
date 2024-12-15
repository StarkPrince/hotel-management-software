"use client";

import { Card } from "@/apps/web/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsProps
{
  stats: {
    title: string;
    value: string;
    icon: LucideIcon;
    description: string;
  }[];
}

export function DashboardStats({ stats }: StatsProps)
{
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <h2 className="text-3xl font-bold">{stat.value}</h2>
            </div>
            <stat.icon className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {stat.description}
          </p>
        </Card>
      ))}
    </div>
  );
}