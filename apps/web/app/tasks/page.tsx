"use client"

import { createTask, fetchTasks, updateTaskStatus } from "@/apps/web/api"
import { AddTaskDialog } from "@/apps/web/components/tasks/add-task-dialog"
import { taskColumns } from "@/apps/web/components/tasks/columns"
import { Button } from "@/apps/web/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card"
import { DataTable } from "@/apps/web/components/ui/data-table"
import { Task } from "@/apps/web/types"
import { Plus } from 'lucide-react'
import { useEffect, useState } from "react"

export default function TasksPage()
{
    const [tasks, setTasks] = useState<Task[]>([])
    const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)

    useEffect(() =>
    {
        const loadTasks = async () =>
        {
            const data = await fetchTasks()
            setTasks(data)
        }
        loadTasks()
    }, [])

    const handleAddTask = async (taskData: Partial<Task>) =>
    {
        try {
            const newTask = await createTask(taskData)
            setTasks([...tasks, newTask])
            setIsAddTaskDialogOpen(false)
        } catch (error) {
            console.error("Failed to add task:", error)
        }
    }

    const handleUpdateTaskStatus = async (taskId: string, status: string) =>
    {
        try {
            const updatedTask = await updateTaskStatus(taskId, status)
            setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
        } catch (error) {
            console.error("Failed to update task status:", error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Task Management</h1>
                <Button onClick={() => setIsAddTaskDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={taskColumns}
                        data={tasks}
                    />
                </CardContent>
            </Card>
            <AddTaskDialog
                isOpen={isAddTaskDialogOpen}
                onClose={() => setIsAddTaskDialogOpen(false)}
                onAddTask={handleAddTask}
            />
        </div>
    )
}

