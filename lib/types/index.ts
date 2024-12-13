// Common types used across the application
import { z } from "zod";

export const UserRoleEnum = z.enum(["ADMIN", "MANAGER", "STAFF"]);
export const RoomTypeEnum = z.enum(["STANDARD", "DELUXE", "SUITE", "PRESIDENTIAL"]);
export const RoomStatusEnum = z.enum(["AVAILABLE", "OCCUPIED", "MAINTENANCE", "CLEANING"]);
export const BookingSourceEnum = z.enum(["DIRECT", "BOOKING_COM", "MAKEMYTRIP", "GOIBIBO", "EXPEDIA", "OTHERS"]);
export const BookingStatusEnum = z.enum(["CONFIRMED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"]);
export const TaskStatusEnum = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]);

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email(),
  role: UserRoleEnum,
  permissions: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const BookingSchema = z.object({
  id: z.string(),
  roomId: z.string(),
  guestName: z.string(),
  guestEmail: z.string().email(),
  checkIn: z.date(),
  checkOut: z.date(),
  source: BookingSourceEnum,
  status: BookingStatusEnum,
  totalAmount: z.number(),
  numberOfGuests: z.number(),
  specialRequests: z.string().optional(),
  paymentStatus: z.enum(["PENDING", "PARTIAL", "COMPLETED"]),
  platformFee: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
export type Booking = z.infer<typeof BookingSchema>;