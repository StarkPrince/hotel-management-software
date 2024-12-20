import prisma from "../prisma";
import { MaintenanceLogDTO } from "../schemas";
import { Priority, TaskStatus } from "../schemas/enum";

export class MaintenanceService {
  // Fetch all maintenance logs
  async getAllLogs() {
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
  }

  async createMaintenanceLog(data: MaintenanceLogDTO) {
    // check if room exists
    const room = await prisma.room.findUnique({
      where: { id: data.roomId },
    });
    if (!room) {
      throw new Error("Room not found");
    }
    if (room.status === "MAINTENANCE") {
      throw new Error("Room is already in maintenance");
    }
    const log = await prisma.maintenanceLog.create({
      data: {
        room: {
          connect: {
            id: data.roomId,
          },
        },
        issue: data.issue,
        priority: data.priority as Priority,
        status: TaskStatus.PENDING,
        assignedTo: data.assignedTo,
      },
      include: {
        room: true,
      },
    });

    await prisma.room.update({
      where: { id: data.roomId },
      data: { status: "MAINTENANCE" },
    });

    return log;
  }

  async updateMaintenanceLog(id: string, data: any) {
    // if maintenance log is not found, return null
    const maintenanceLog = await prisma.maintenanceLog.findUnique({
      where: { id },
    });
    if (!maintenanceLog) {
      throw new Error("Maintenance log not found");
    }
    return await prisma.maintenanceLog.update({
      where: { id },
      data,
      include: {
        room: true,
      },
    });
  }

  async getMaintenanceLogById(id: string) {
    return await prisma.maintenanceLog.findUnique({
      where: { id },
      include: {
        room: true,
      },
    });
  }
}

export const maintenanceService = new MaintenanceService();
