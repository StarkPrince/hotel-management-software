"use client"

import { fetchDashboardStats } from "@/api"
import { DashboardChart } from "@/components/dashboard/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BedDouble, CalendarCheck, Percent, TrendingUp } from 'lucide-react'
import { useEffect, useState } from "react"

export default function DashboardPage()
{
  const [stats, setStats] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    occupancyRate: 0,
    activeBookings: 0,
    revenue: 0,
  })

  useEffect(() =>
  {
    const loadStats = async () =>
    {
      const data = await fetchDashboardStats()
      setStats(data)
    }
    loadStats()
  }, [])

  const statCards = [
    {
      title: "Total Rooms",
      value: stats.totalRooms,
      icon: BedDouble,
      description: `${stats.totalRooms - stats.occupiedRooms} currently available`,
    },
    {
      title: "Occupancy Rate",
      value: `${stats.occupancyRate}%`,
      icon: Percent,
      description: `${stats.occupiedRooms} rooms occupied`,
    },
    {
      title: "Active Bookings",
      value: stats.activeBookings,
      icon: CalendarCheck,
      description: "Current active bookings",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: TrendingUp,
      description: "Total revenue",
    },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
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
      <DashboardChart />
    </div>
  )
}

