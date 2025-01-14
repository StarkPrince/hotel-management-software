"use client";

import { Hotel, Users, Calendar, Tool } from "lucide-react";
import { StatsCard } from "./stats-card";
import mockDb from "@/data/mock-db.json";

export function StatsGrid() {
  const stats = [
    {
      title: "Total Rooms",
      value: mockDb.rooms.length,
      icon: Hotel,
      description: `${mockDb.rooms.filter(r => r.status === "AVAILABLE").length} Available`,
    },
    {
      title: "Active Bookings",
      value: mockDb.bookings.filter(b => b.status === "ACTIVE").length,
      icon: Calendar,
      description: "Current reservations",
    },
    {
      title: "Staff Members",
      value: mockDb.users.filter(u => u.role !== "GUEST").length,
      icon: Users,
      description: "Including managers",
    },
    {
      title: "Maintenance Tasks",
      value: mockDb.maintenance.length,
      icon: Tool,
      description: `${mockDb.maintenance.filter(m => m.status === "PENDING").length} Pending`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}