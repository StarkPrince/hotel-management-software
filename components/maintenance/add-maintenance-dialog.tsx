"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MaintenanceLog, Priority } from "@/types"
import { useState } from "react"

interface AddMaintenanceDialogProps
{
    isOpen: boolean
    onClose: () => void
    onAddMaintenance: (maintenanceData: Partial<MaintenanceLog>) => void
}

export function AddMaintenanceDialog({ isOpen, onClose, onAddMaintenance }: AddMaintenanceDialogProps)
{
    const [maintenanceData, setMaintenanceData] = useState<Partial<MaintenanceLog>>({
        roomId: "",
        issue: "",
        priority: Priority.MEDIUM,
        assignedTo: "",
    })

    const handleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault()
        onAddMaintenance(maintenanceData)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Maintenance Request</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="roomId" className="text-right">
                                Room
                            </Label>
                            <Input
                                id="roomId"
                                value={maintenanceData.roomId}
                                onChange={(e) => setMaintenanceData({ ...maintenanceData, roomId: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="issue" className="text-right">
                                Issue
                            </Label>
                            <Textarea
                                id="issue"
                                value={maintenanceData.issue}
                                onChange={(e) => setMaintenanceData({ ...maintenanceData, issue: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="priority" className="text-right">
                                Priority
                            </Label>
                            <Select
                                value={maintenanceData.priority}
                                onValueChange={(value: Priority) => setMaintenanceData({ ...maintenanceData, priority: value })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LOW">Low</SelectItem>
                                    <SelectItem value="MEDIUM">Medium</SelectItem>
                                    <SelectItem value="HIGH">High</SelectItem>
                                    <SelectItem value="URGENT">Urgent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="assignedTo" className="text-right">
                                Assigned To
                            </Label>
                            <Input
                                id="assignedTo"
                                value={maintenanceData.assignedTo}
                                onChange={(e) => setMaintenanceData({ ...maintenanceData, assignedTo: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Maintenance Request</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

