import { Priority, TaskStatus } from "../enum";
import prisma from "../prisma";

export const taskService = {
  async getAllTasks() {
    return await prisma.task.findMany({
      include: {
        assignedTo: true,
      },
      orderBy: [
        {
          priority: "desc",
        },
        {
          dueDate: "asc",
        },
      ],
    });
  },

  async createTask(data: any) {
    return await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        userId: data.assignedToId,
        dueDate: new Date(data.dueDate),
        priority: data.priority as Priority,
        status: TaskStatus.PENDING,
      },
      include: {
        assignedTo: true,
      },
    });
  },
};
