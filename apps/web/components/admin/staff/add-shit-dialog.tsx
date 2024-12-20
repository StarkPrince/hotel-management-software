"use client"

import { Button } from "@/apps/web/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/apps/web/components/ui/dialog"
import { Input } from "@/apps/web/components/ui/input"
import { Label } from "@/apps/web/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/apps/web/components/ui/select"
import { Shift, Staff } from "@/apps/web/types"
import { useState } from "react"

interface AddShiftDialogProps
{
    isOpen: boolean
    onClose: () => void
    onAddShift: (shiftData: Partial<Shift>) => void
    staff: Staff[]
}

export function AddShiftDialog({ isOpen, onClose, onAddShift, staff }: AddShiftDialogProps)
{
    const [shiftData, setShiftData] = useState<Partial<Shift>>({
        staffId: "",
        startTime: "",
        endTime: "",
        status: "SCHEDULED",
    })

    const handleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault()
        onAddShift(shiftData)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Shift</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="staffId" className="text-right">
                                Staff Member
                            </Label>
                            <Select
                                value={shiftData.staffId}
                                onValueChange={(value) => setShiftData({ ...shiftData, staffId: value })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select staff member" />
                                </SelectTrigger>
                                <SelectContent>
                                    {staff.map((s) => (
                                        <SelectItem key={s.id} value={s.id}>
                                            {s.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="startTime" className="text-right">
                                Start Time
                            </Label>
                            <Input
                                id="startTime"
                                type="datetime-local"
                                value={shiftData.startTime}
                                onChange={(e) => setShiftData({ ...shiftData, startTime: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="endTime" className="text-right">
                                End Time
                            </Label>
                            <Input
                                id="endTime"
                                type="datetime-local"
                                value={shiftData.endTime}
                                onChange={(e) => setShiftData({ ...shiftData, endTime: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Shift</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

