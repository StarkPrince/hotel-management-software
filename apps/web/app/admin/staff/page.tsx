"use client"

import { createShift, fetchStaff } from "@/apps/web/api"
import { AddShiftDialog } from "@/apps/web/components/admin/staff/add-shit-dialog"
import { staffColumns } from "@/apps/web/components/admin/staff/columns"
import { shiftColumns } from "@/apps/web/components/admin/staff/shift-columns"
import { taskColumns } from "@/apps/web/components/admin/staff/task-columns"
import { Button } from "@/apps/web/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card"
import { DataTable } from "@/apps/web/components/ui/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/apps/web/components/ui/tabs"
import { Shift, Staff } from "@/apps/web/types"
import { Plus } from 'lucide-react'
import { useEffect, useState } from "react"

export default function StaffPage()
{
    const [staff, setStaff] = useState<Staff[]>([])
    const [isAddShiftDialogOpen, setIsAddShiftDialogOpen] = useState(false)
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)

    useEffect(() =>
    {
        const loadStaff = async () =>
        {
            const data = await fetchStaff()
            setStaff(data)
        }
        loadStaff()
    }, [])

    const handleAddShift = async (shiftData: Partial<Shift>) =>
    {
        try {
            const newShift = await createShift(shiftData)
            setStaff(staff.map(s =>
                s.id === newShift.staffId
                    ? { ...s, shifts: [...s.shifts, newShift] }
                    : s
            ))
            setIsAddShiftDialogOpen(false)
        } catch (error) {
            console.error("Failed to add shift:", error)
        }
    }

    const allShifts = staff.flatMap(s => s.shifts)
    const allTasks = staff.flatMap(s => s.tasks)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Staff Management</h1>
                <Button onClick={() => setIsAddShiftDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Shift
                </Button>
            </div>
            <Tabs defaultValue="staff">
                <TabsList>
                    <TabsTrigger value="staff">Staff</TabsTrigger>
                    <TabsTrigger value="shifts">Shifts</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                </TabsList>
                <TabsContent value="staff">
                    <Card>
                        <CardHeader>
                            <CardTitle>Staff List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={staffColumns} data={staff} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="shifts">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Shifts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={shiftColumns} data={allShifts} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="tasks">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={taskColumns} data={allTasks} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <AddShiftDialog
                isOpen={isAddShiftDialogOpen}
                onClose={() => setIsAddShiftDialogOpen(false)}
                onAddShift={handleAddShift}
                staff={staff}
            />
        </div>
    )
}

