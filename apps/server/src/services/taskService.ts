import { PrismaClient } from "@prisma/client";
import { Priority, TaskStatus } from "../enum";

export const taskService = {
  async getAllTasks(prisma: PrismaClient) {
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

  async createTask(prisma: PrismaClient, data: any) {
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
