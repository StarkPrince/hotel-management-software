import prisma from "../prisma";
import { UserDTO } from "../schemas";
import { UserRole } from "../schemas/enum";
import { verifyQRCode } from "../utils/qrCode";

export class AuthService {
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

  async register(data: UserDTO) {
    return await prisma.user.create({
      data,
    });
  }

  async createStaff(data: UserDTO) {
    const updatedData: UserDTO = { ...data, role: UserRole.STAFF };
    return await prisma.user.create({
      data: updatedData,
    });
  }
}

export const authService = new AuthService();
