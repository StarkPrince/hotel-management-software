"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "@/components/ui/card";
import { TaskStatus } from "@prisma/client";

const columns = [
  { id: "PENDING", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "COMPLETED", title: "Completed" },
];

interface Task {
  id: string;
  title: string;
  assignedTo: string;
  priority: string;
  status: string;
  dueDate: Date;
}

interface TaskBoardProps {
  tasks: Task[];
}

export function TaskBoard({ tasks }: TaskBoardProps) {
  const grouped = tasks.reduce((acc, task) => {
    const status = task.status as TaskStatus;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(task);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  return (
    <div className="grid grid-cols-3 gap-4">
      {columns.map((column) => (
        <div key={column.id} className="space-y-4">
          <h3 className="font-medium">{column.title}</h3>
          <Card className="p-4 space-y-4">
            {(grouped[column.id as TaskStatus] || []).map((task) => (
              <Card key={task.id} className="p-3">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-muted-foreground">
                  Assigned to: {task.assignedTo}
                </p>
              </Card>
            ))}
          </Card>
        </div>
      ))}
    </div>
  );
}