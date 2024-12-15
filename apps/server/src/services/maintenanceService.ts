import { Priority, TaskStatus } from "../enum";
import PrismaClient from "../prisma";

export const maintenanceService = {
  async getAllLogs(prisma: PrismaClient) {
    return await prisma.maintenanceLog.findMany({
      include: {
        room: true,
      },
      orderBy: [
        {
          priority: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });
  },

  async createMaintenanceLog(prisma: PrismaClient, data: any) {
    const log = await prisma.maintenanceLog.create({
      data: {
        roomId: data.roomId,
        issue: data.issue,
        priority: data.priority as Priority,
        status: TaskStatus.PENDING,
        assignedTo: data.assignedTo,
      },
      include: {
        room: true,
      },
    });

    // Update room status
    await prisma.room.update({
      where: { id: data.roomId },
      data: { status: "MAINTENANCE" },
    });

    return log;
  },
};
