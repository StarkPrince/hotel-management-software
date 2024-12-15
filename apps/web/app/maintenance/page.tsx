"use client"

import { createMaintenance, fetchMaintenance, updateMaintenanceStatus } from "@/apps/web/api"
import { AddMaintenanceDialog } from "@/apps/web/components/maintenance/add-maintenance-dialog"
import { maintenanceColumns } from "@/apps/web/components/maintenance/columns"
import { Button } from "@/apps/web/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card"
import { DataTable } from "@/apps/web/components/ui/data-table"
import { MaintenanceLog, TaskStatus } from "@/apps/web/types"
import { Plus } from 'lucide-react'
import { useEffect, useState } from "react"

export default function MaintenancePage()
{
    const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceLog[]>([])
    const [isAddMaintenanceDialogOpen, setIsAddMaintenanceDialogOpen] = useState(false)

    useEffect(() =>
    {
        const loadMaintenance = async () =>
        {
            const data = await fetchMaintenance()
            setMaintenanceRequests(data)
        }
        loadMaintenance()
    }, [])

    const handleAddMaintenance = async (maintenanceData: Partial<MaintenanceLog>) =>
    {
        try {
            const newMaintenance = await createMaintenance(maintenanceData)
            setMaintenanceRequests([...maintenanceRequests, newMaintenance])
            setIsAddMaintenanceDialogOpen(false)
        } catch (error) {
            console.error("Failed to add maintenance request:", error)
        }
    }

    const handleUpdateMaintenanceStatus = async (maintenanceId: string, status: TaskStatus) =>
    {
        try {
            const updatedMaintenance = await updateMaintenanceStatus(maintenanceId, status)
            setMaintenanceRequests(maintenanceRequests.map(m => m.id === updatedMaintenance.id ? updatedMaintenance : m))
        } catch (error) {
            console.error("Failed to update maintenance status:", error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Maintenance Management</h1>
                <Button onClick={() => setIsAddMaintenanceDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Maintenance Request
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Maintenance Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={maintenanceColumns}
                        data={maintenanceRequests}
                    />
                </CardContent>
            </Card>
            <AddMaintenanceDialog
                isOpen={isAddMaintenanceDialogOpen}
                onClose={() => setIsAddMaintenanceDialogOpen(false)}
                onAddMaintenance={handleAddMaintenance}
            />
        </div>
    )
}

