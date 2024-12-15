"use client"

import { fetchRevenueChart } from "@/apps/web/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"



export function DashboardChart()
{
  const [data, setData] = useState([])

  useEffect(() =>
  {
    const loadChartData = async () =>
    {
      const chartData = await fetchRevenueChart()
      setData(chartData)
    }
    loadChartData()
  }, [])

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Amount (₹)" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

