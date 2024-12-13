"use client";

import { Card } from "@/components/ui/card";
import {
  BedDouble,
  Users,
  CalendarCheck,
  TrendingUp,
  Percent,
} from "lucide-react";
import { DashboardChart } from "@/components/dashboard/chart";
import { DashboardStats } from "@/components/dashboard/stats";

const stats = [
  {
    title: "Total Rooms",
    value: "50",
    icon: BedDouble,
    description: "5 currently available",
  },
  {
    title: "Occupancy Rate",
    value: "85%",
    icon: Percent,
    description: "↑ 12% from last month",
  },
  {
    title: "Active Bookings",
    value: "42",
    icon: CalendarCheck,
    description: "8 check-ins today",
  },
  {
    title: "Revenue",
    value: "$25,400",
    icon: TrendingUp,
    description: "↑ 8% from last month",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardStats stats={stats} />
      <DashboardChart />
    </div>
  );
}