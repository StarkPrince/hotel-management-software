import prisma from "../prisma";
import { BookingDTO } from "../schemas";
import { verifyQRCode } from "../utils/qrCode";

export class BookingService {
  // Fetch all bookings
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
  }

  async createBooking(data: BookingDTO) {
    let user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
        },
      });
    }

    const booking = await prisma.booking.create({
      data: {
        room: {
          connect: {
            id: data.roomId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
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
  }

  // Fetch a booking by ID
  async getBookingById(id: string) {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id },
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

      return booking;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateBookingStatus(id: string, data: any) {
    const booking = await prisma.booking.update({
      where: { id },
      data,
      include: {
        room: true,
      },
    });

    if (data.status === "CHECKED_OUT") {
      await prisma.room.update({
        where: { id: booking.roomId },
        data: { status: "CLEANING" },
      });
    }

    return booking;
  }

  // Verify QR code
  async verifyQRCode(data: any) {
    return verifyQRCode(data.qrCode);
  }
}

export const bookingService = new BookingService();
