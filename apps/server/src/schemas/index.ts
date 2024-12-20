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
} from "./enum";

// Schemas
export const UserZodSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().optional(),
  departmentId: z.string().nullable().optional(),
  role: z.nativeEnum(UserRole).default(UserRole.GUEST),
});

export const UserUpdateZodSchema = z.object({
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  departmentId: z.string().nullable().optional(),
});

export const DepartmentZodSchema = z.object({
  name: z.string(),
});

export const RoomZodSchema = z.object({
  number: z.string(),
  type: z.nativeEnum(RoomType),
  status: z.nativeEnum(RoomStatus).default(RoomStatus.AVAILABLE),
  floor: z.number(),
  price: z.number(),
});

export const PlatformBookingZodSchema = z.object({
  bookingId: z.string(),
  platform: z.nativeEnum(BookingSource),
  platformId: z.string(),
  metadata: z.any(),
});

export const CleaningScheduleZodSchema = z.object({
  roomId: z.string(),
  staffId: z.string(),
  date: z.date(),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.PENDING),
  notes: z.string().nullable().optional(),
});

export const MaintenanceLogZodSchema = z.object({
  roomId: z.string(),
  issue: z.string(),
  priority: z.nativeEnum(Priority).default(Priority.MEDIUM),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.PENDING),
  assignedTo: z.string().nullable().optional(),
});

export const MaintenanceLogUpdateZodSchema = z.object({
  issue: z.string().nullable().optional(),
  priority: z.nativeEnum(Priority).nullable().optional(),
  status: z.nativeEnum(TaskStatus).nullable().optional(),
  assignedTo: z.string().nullable().optional(),
});

export const TaskZodSchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  userId: z.string(),
  dueDate: z.string(),
  priority: z.nativeEnum(Priority).default(Priority.MEDIUM),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.PENDING),
});

export const StaffShiftZodSchema = z.object({
  userId: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  status: z.nativeEnum(ShiftStatus).default(ShiftStatus.SCHEDULED),
});

export const StaffShiftUpdateZodSchema = z.object({
  startTime: z.date().nullable().optional(),
  endTime: z.date().nullable().optional(),
  status: z.nativeEnum(ShiftStatus).nullable().optional(),
});

export const AmenityZodSchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  category: z.nativeEnum(AmenityType),
  isActive: z.boolean().default(true),
  maxUsage: z.number().nullable().optional(),
});

export const BookingZodSchema = z.object({
  name: z.string(),
  email: z.string(),
  roomId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  source: z.nativeEnum(BookingSource),
  status: z.nativeEnum(BookingStatus).default(BookingStatus.PENDING),
  totalAmount: z.number(),
  paymentStatus: z.nativeEnum(PaymentStatus).default(PaymentStatus.PENDING),
  externalBookingId: z.string().nullable().optional(),
  specialRequests: z.string().nullable().optional(),
  qrCode: z.string().nullable().optional(),
});

export const BookingUpdateZodSchema = z.object({
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  roomId: z.string().nullable().optional(),
  checkIn: z.string().nullable().optional(),
  checkOut: z.string().nullable().optional(),
  source: z.nativeEnum(BookingSource).nullable().optional(),
  status: z.nativeEnum(BookingStatus).nullable().optional(),
  totalAmount: z.number().nullable().optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).nullable().optional(),
  externalBookingId: z.string().nullable().optional(),
  specialRequests: z.string().nullable().optional(),
  qrCode: z.string().nullable().optional(),
});

export const SessionZodSchema = z.object({
  userId: z.string(),
  bookingId: z.string(),
  jwt: z.string(),
  expiresAt: z.date(),
  lastActivity: z.date().default(() => new Date()),
  isActive: z.boolean().default(true),
  token: z.string(),
});

export const ProfileZodSchema = z.object({
  userId: z.string(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  preferences: z.any().nullable().optional(),
});

export const RoomAmenityZodSchema = z.object({
  roomId: z.string(),
  amenityId: z.string(),
});

export const AmenityUsageZodSchema = z.object({
  sessionId: z.string(),
  amenityId: z.string(),
  usedAt: z.date().default(() => new Date()),
});

export type UserDTO = z.infer<typeof UserZodSchema>;
export type DepartmentDTO = z.infer<typeof DepartmentZodSchema>;
export type RoomDTO = z.infer<typeof RoomZodSchema>;
export type PlatformBookingDTO = z.infer<typeof PlatformBookingZodSchema>;
export type CleaningScheduleDTO = z.infer<typeof CleaningScheduleZodSchema>;
export type MaintenanceLogDTO = z.infer<typeof MaintenanceLogZodSchema>;
export type TaskDTO = z.infer<typeof TaskZodSchema>;
export type StaffShiftDTO = z.infer<typeof StaffShiftZodSchema>;
export type AmenityDTO = z.infer<typeof AmenityZodSchema>;
export type BookingDTO = z.infer<typeof BookingZodSchema>;
export type SessionDTO = z.infer<typeof SessionZodSchema>;
export type ProfileDTO = z.infer<typeof ProfileZodSchema>;
export type RoomAmenityDTO = z.infer<typeof RoomAmenityZodSchema>;
export type AmenityUsageDTO = z.infer<typeof AmenityUsageZodSchema>;
export type BookingUpdateDTO = z.infer<typeof BookingUpdateZodSchema>;
export type MaintenanceLogUpdateDTO = z.infer<
  typeof MaintenanceLogUpdateZodSchema
>;
export type StaffShiftUpdateDTO = z.infer<typeof StaffShiftUpdateZodSchema>;
