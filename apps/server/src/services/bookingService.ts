import { BookingStatus } from "../enum";
import prisma from "../prisma";
import { verifyQRCode } from "../utils/qrCode";

export const bookingService = {
  async getAllBookings() {
    return prisma.booking.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        room: true,
      },
    });
  },

  async createBooking(data: any) {
    const booking = await prisma.booking.create({
      data: {
        user: {
          connect: {
            id: data.userId,
          },
        },
        room: {
          connect: {
            id: data.roomId,
          },
        },
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
        source: "DIRECT",
        status: "CONFIRMED",
        totalAmount: data.totalAmount,
        paymentStatus: "PENDING",
        specialRequests: data.specialRequests,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        room: true,
      },
    });

    await prisma.room.update({
      where: { id: data.roomId },
      data: { status: "OCCUPIED" },
    });

    return booking;
  },

  async updateBookingStatus(id: string, status: BookingStatus) {
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        room: true,
      },
    });

    if (status === "CHECKED_OUT") {
      await prisma.room.update({
        where: { id: booking.roomId },
        data: { status: "CLEANING" },
      });
    }

    return booking;
  },

  async verifyQRCode(qrCode: string) {
    return verifyQRCode(qrCode);
  },
};
