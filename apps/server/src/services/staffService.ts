import prisma from "../prisma";

export const staffService = {
  async getAllStaff() {
    return await prisma.user.findMany({
      include: {
        department: true,
        tasks: {
          where: {
            status: {
              in: ["PENDING", "IN_PROGRESS"],
            },
          },
        },
        shifts: {
          where: {
            startTime: {
              gte: new Date(),
            },
          },
        },
      },
    });
  },

  async createShift(data: any) {
    return await prisma.staffShift.create({
      data: {
        staffId: data.staffId,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
      },
      include: {
        staff: true,
      },
    });
  },
};
