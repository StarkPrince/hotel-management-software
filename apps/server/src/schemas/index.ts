export * from "./auth.schema";

import { z } from "zod";
import {
  AmenityType,
  BookingSource,
  BookingStatus,
  PaymentStatus,
  Priority,
  RoomStatus,
  RoomType,
  ShiftStatus,
  TaskStatus,
  UserRole,
} from "../enum";

// Schemas
const UserZodSchema = z.object({
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  password: z.string(),
  role: z.nativeEnum(UserRole),
  departmentId: z.string().nullable().optional(),
});

const DepartmentZodSchema = z.object({
  name: z.string(),
});

const RoomZodSchema = z.object({
  number: z.string(),
  type: z.nativeEnum(RoomType),
  status: z.nativeEnum(RoomStatus).default(RoomStatus.AVAILABLE),
  floor: z.number(),
  price: z.number(),
});

const PlatformBookingZodSchema = z.object({
  bookingId: z.string(),
  platform: z.nativeEnum(BookingSource),
  platformId: z.string(),
  metadata: z.any(),
});

const CleaningScheduleZodSchema = z.object({
  roomId: z.string(),
  staffId: z.string(),
  date: z.date(),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.PENDING),
  notes: z.string().nullable().optional(),
});

const MaintenanceLogZodSchema = z.object({
  roomId: z.string(),
  issue: z.string(),
  priority: z.nativeEnum(Priority).default(Priority.MEDIUM),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.PENDING),
  assignedTo: z.string().nullable().optional(),
  resolvedAt: z.date().nullable().optional(),
});

const TaskZodSchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  userId: z.string(),
  dueDate: z.date(),
  priority: z.nativeEnum(Priority).default(Priority.MEDIUM),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.PENDING),
});

const StaffShiftZodSchema = z.object({
  staffId: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  status: z.nativeEnum(ShiftStatus).default(ShiftStatus.SCHEDULED),
});

const AmenityZodSchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  category: z.nativeEnum(AmenityType),
  isActive: z.boolean().default(true),
  maxUsage: z.number().nullable().optional(),
});

const BookingZodSchema = z.object({
  roomId: z.string(),
  guestName: z.string(),
  guestEmail: z.string(),
  checkIn: z.date(),
  checkOut: z.date(),
  source: z.nativeEnum(BookingSource),
  status: z.nativeEnum(BookingStatus).default(BookingStatus.PENDING),
  totalAmount: z.number(),
  paymentStatus: z.nativeEnum(PaymentStatus).default(PaymentStatus.PENDING),
  externalBookingId: z.string().nullable().optional(),
  specialRequests: z.string().nullable().optional(),
  userId: z.string(),
  qrCode: z.string().nullable().optional(),
});

const SessionZodSchema = z.object({
  userId: z.string(),
  bookingId: z.string(),
  jwt: z.string(),
  expiresAt: z.date(),
  lastActivity: z.date().default(() => new Date()),
  isActive: z.boolean().default(true),
  token: z.string(),
});

const ProfileZodSchema = z.object({
  userId: z.string(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  preferences: z.any().nullable().optional(),
});

const RoomAmenityZodSchema = z.object({
  roomId: z.string(),
  amenityId: z.string(),
});

const AmenityUsageZodSchema = z.object({
  sessionId: z.string(),
  amenityId: z.string(),
  usedAt: z.date().default(() => new Date()),
});

export {
  AmenityType,
  AmenityUsageZodSchema,
  AmenityZodSchema,
  BookingSource,
  BookingStatus,
  BookingZodSchema,
  CleaningScheduleZodSchema,
  DepartmentZodSchema,
  MaintenanceLogZodSchema,
  PaymentStatus,
  PlatformBookingZodSchema,
  Priority,
  ProfileZodSchema,
  RoomAmenityZodSchema,
  RoomStatus,
  RoomType,
  RoomZodSchema,
  SessionZodSchema,
  ShiftStatus,
  StaffShiftZodSchema,
  TaskStatus,
  TaskZodSchema,
  UserRole,
  UserZodSchema,
};
