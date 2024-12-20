"use client"

import { Button } from "@/apps/web/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/apps/web/components/ui/dialog"
import { Input } from "@/apps/web/components/ui/input"
import { Label } from "@/apps/web/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/apps/web/components/ui/select"
import { Textarea } from "@/apps/web/components/ui/textarea"
import { Task } from "@/apps/web/types"
import { useState } from "react"

interface AddTaskDialogProps
{
    isOpen: boolean
    onClose: () => void
    onAddTask: (taskData: Partial<Task>) => void
}

export function AddTaskDialog({ isOpen, onClose, onAddTask }: AddTaskDialogProps)
{
    const [taskData, setTaskData] = useState<Partial<Task>>({
        title: "",
        description: "",
        assignedToId: "",
        dueDate: "",
        priority: "MEDIUM",
    })

    const handleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault()
        onAddTask(taskData)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={taskData.title}
                                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={taskData.description}
                                onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="assignedToId" className="text-right">
                                Assigned To
                            </Label>
                            <Input
                                id="assignedToId"
                                value={taskData.assignedToId}
                                onChange={(e) => setTaskData({ ...taskData, assignedToId: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dueDate" className="text-right">
                                Due Date
                            </Label>
                            <Input
                                id="dueDate"
                                type="datetime-local"
                                value={taskData.dueDate}
                                onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="priority" className="text-right">
                                Priority
                            </Label>
                            <Select
                                value={taskData.priority}
                                onValueChange={(value) => setTaskData({ ...taskData, priority: value })}
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
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

