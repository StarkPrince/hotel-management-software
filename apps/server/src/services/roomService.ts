import { RoomStatus, RoomType } from "../enum";
import prisma from "../prisma";

export const roomService = {
  async getAllRooms() {
    return await prisma.room.findMany({
      include: {
        amenities: true,
        bookings: {
          where: {
            status: {
              in: ["CONFIRMED", "CHECKED_IN"],
            },
          },
        },
        maintenanceLogs: {
          where: {
            status: "IN_PROGRESS",
          },
        },
      },
    });
  },

  async getRoomById(id: string) {
    return await prisma.room.findUnique({
      where: { id },
      include: {
        amenities: true,
        bookings: true,
        maintenanceLogs: true,
        cleaningLogs: true,
      },
    });
  },

  async createRoom(data: any) {
    return await prisma.room.create({
      data: {
        number: data.number,
        type: data.type as RoomType,
        floor: parseInt(data.number.charAt(0)),
        price: data.price,
        amenities: {
          connect: data.amenityIds?.map((id: string) => ({ id })) || [],
        },
      },
      include: {
        amenities: true,
      },
    });
  },

  async updateRoom(id: string, data: any) {
    return await prisma.room.update({
      where: { id },
      data: {
        status: data.status as RoomStatus,
        price: data.price,
        amenities: {
          set: data.amenityIds?.map((id: string) => ({ id })),
        },
      },
      include: {
        amenities: true,
      },
    });
  },
};
