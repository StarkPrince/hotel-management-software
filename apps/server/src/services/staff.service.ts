import prisma from "../prisma";
import { StaffShiftDTO } from "../schemas";
import { UserRole } from "../schemas/enum";

export const staffService = {
  async getAllShifts() {
    return await prisma.staffShift.findMany({
      include: {
        user: true,
      },
    });
  },

  getAllStaff() {
    return prisma.user.findMany({
      where: {
        role: "STAFF",
      },
      include: {
        shifts: true,
      },
    });
  },

  async createShift(data: StaffShiftDTO) {
    // check if the user exist and is a staff
    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
        role: UserRole.STAFF,
      },
    });
    return await prisma.staffShift.create({
      data: {
        userId: data.userId,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
      },
      include: {
        user: true,
      },
    });
  },

  async updateStaffShift(id: string, data: any) {
    return await prisma.staffShift.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
  },

  async updateStaff(id: string, data: any) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },
};
