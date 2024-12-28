"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// Mock data for department overview
const departmentData = [
    { name: "Housekeeping", value: 30, color: "#0088FE" },
    { name: "Front Desk", value: 25, color: "#00C49F" },
    { name: "Food & Beverage", value: 20, color: "#FFBB28" },
    { name: "Maintenance", value: 15, color: "#FF8042" },
    { name: "Management", value: 10, color: "#8884D8" },
];

export function DepartmentOverview()
{
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">Department Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={departmentData}
                                cx="50%"
                                cy="50%"
                                innerRadius={30}
                                outerRadius={60}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {departmentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ fontSize: 10 }} />
                            <Legend wrapperStyle={{ fontSize: 10 }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-1">
                    {departmentData.map((dept) => (
                        <div key={dept.name} className="flex justify-between text-xs">
                            <span>{dept.name}</span>
                            <span className="font-medium">{dept.value} staff</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

