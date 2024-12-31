import mockDb from "@/apps/web/data/mock-db.json";
import { createToken } from "@/apps/web/lib/auth";
import { generateExpiryTime } from "@/apps/web/lib/utils/otp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { qrCode } = body;

    // Parse QR code data
    const qrData = JSON.parse(qrCode);
    const { bookingId, otp } = qrData;

    // In a real app, validate booking and OTP against database
    const booking = mockDb.bookings.find((b: any) => b.id === bookingId);
    if (!booking) {
      return NextResponse.json({ error: "Invalid booking" }, { status: 400 });
    }

    // Calculate session duration based on checkout date
    const checkOut = new Date(booking.checkOut);
    const now = new Date();
    const daysUntilCheckout = Math.ceil(
      (checkOut.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    const guestUser = {
      name: booking.guestName,
      role: "GUEST",
      bookingId: booking.id,
      checkIn: now,
      checkOut: checkOut,
    };

    const token = await createToken(guestUser);
    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: generateExpiryTime(daysUntilCheckout),
    });

    return response;
  } catch (error) {
    console.error("Check-in error:", error);
    return NextResponse.json({ error: "Check-in failed" }, { status: 400 });
  }
}
