import prisma from "../prisma";
import { Priority, TaskStatus } from "../schemas/enum";

export const taskService = {
  async getAllTasks() {
    return await prisma.task.findMany({
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
        userId: data.userId,
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
