"use client";

import { StatsGrid } from "./stats-grid";
import { ChartsGrid } from "./charts-grid";

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <StatsGrid />
      <ChartsGrid />
    </div>
  );
}