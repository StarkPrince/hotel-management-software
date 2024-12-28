"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/apps/web/components/ui/table";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Mock data for staff performance
const staffPerformanceData = [
    { name: "John Doe", tasks: 45, rating: 4.8, efficiency: 92 },
    { name: "Jane Smith", tasks: 38, rating: 4.6, efficiency: 88 },
    { name: "Mike Johnson", tasks: 42, rating: 4.7, efficiency: 90 },
    { name: "Emily Brown", tasks: 40, rating: 4.5, efficiency: 86 },
    { name: "Chris Lee", tasks: 47, rating: 4.9, efficiency: 94 },
];

export function StaffPerformance()
{
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle className="text-sm font-medium">Staff Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={staffPerformanceData}>
                                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                <YAxis tick={{ fontSize: 10 }} />
                                <Tooltip contentStyle={{ fontSize: 10 }} />
                                <Bar dataKey="efficiency" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]">Name</TableHead>
                                <TableHead>Tasks Completed</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Efficiency</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {staffPerformanceData.map((staff) => (
                                <TableRow key={staff.name}>
                                    <TableCell className="font-medium">{staff.name}</TableCell>
                                    <TableCell>{staff.tasks}</TableCell>
                                    <TableCell>{staff.rating.toFixed(1)}</TableCell>
                                    <TableCell>{staff.efficiency}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}

