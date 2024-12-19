// qr.controller.ts
import prisma from "../prisma";
import { generateQRCode } from "../utils/qrCode";

class QRServices {
  generateAndUpdateQRCode = async (id: string, user: any) => {
    if (user.role !== "ADMIN" && user.role !== "MANAGER") {
      throw new Error("Insufficient permissions");
    }

    // Get booking
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    // Create QR code with booking info and OTP
    const qrCode = await generateQRCode({
      bookingId: booking.id,
      userId: booking.userId,
      checkOut: booking.checkOut,
    });

    // Update booking with QR code
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        qrCode,
      },
    });

    return { qrCode: updatedBooking.qrCode };
  };
}

export default new QRServices();
