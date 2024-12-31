export enum RoomType {
  STANDARD = "STANDARD",
  DELUXE = "DELUXE",
  SUITE = "SUITE",
  PRESIDENTIAL = "PRESIDENTIAL",
}

export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  MAINTENANCE = "MAINTENANCE",
  CLEANING = "CLEANING",
}

export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
  GUEST = "GUEST",
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  password: string;
  role: UserRole;
  departmentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// types/Department.ts
export interface Department {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// types/Booking.ts
export enum BookingSource {
  DIRECT = "DIRECT",
  BOOKING_COM = "BOOKING_COM",
  MAKEMYTRIP = "MAKEMYTRIP",
  GOIBIBO = "GOIBIBO",
  EXPEDIA = "EXPEDIA",
  OTHERS = "OTHERS",
}

export enum BookingStatus {
  CONFIRMED = "CONFIRMED",
  CHECKED_IN = "CHECKED_IN",
  CHECKED_OUT = "CHECKED_OUT",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PARTIAL = "PARTIAL",
  COMPLETED = "COMPLETED",
  REFUNDED = "REFUNDED",
}

export interface Booking {
  externalBookingId?: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  source: string;
  status: string;
  totalAmount: number;
  paymentStatus: string;
  specialRequests?: string;
  room: Room;
}

// types/PlatformBooking.ts
export interface PlatformBooking {
  id: string;
  bookingId: string;
  platform: BookingSource;
  platformId: string;
  metadata: object;
  createdAt: Date;
  updatedAt: Date;
}

// types/CleaningSchedule.ts
export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface CleaningSchedule {
  id: string;
  roomId: string;
  staffId: string;
  date: Date;
  status: TaskStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// types/MaintenanceLog.ts
export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export interface MaintenanceLog {
  id: string;
  roomId: string;
  issue: string;
  priority: Priority;
  status: TaskStatus;
  assignedTo?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// types/Task.ts
export interface Task {
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  title: string;
  description: string;
  userId: string;
  dueDate: string;
  priority: string;
  assignedToId: string;
}

// types/StaffShift.ts
export enum ShiftStatus {
  SCHEDULED = "SCHEDULED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface StaffShift {
  id: string;
  staffId: string;
  startTime: Date;
  endTime: Date;
  status: ShiftStatus;
  createdAt: Date;
  updatedAt: Date;
}

// types/Amenity.ts
export interface Amenity {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExternalBooking extends Booking {
  externalBookingId: string;
  platformBooking: {
    id: string;
    platformName: string;
    platformBookingId: string;
    bookingDetails: string;
  };
}

export interface Room {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  number: string;
  type: RoomType;
  status: RoomStatus;
  floor: number;
  price: number;
  amenities: Amenity[];
}

export interface ExternalBooking extends Booking {
  externalBookingId: string;
  platformBooking: {
    id: string;
    platformName: string;
    platformBookingId: string;
    bookingDetails: string;
  };
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  departmentId: string;
  department: {
    id: string;
    name: string;
  };
  tasks: Task[];
  shifts: Shift[];
}

export interface Shift {
  id: string;
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  department: string;
  status: "SCHEDULED" | "PENDING" | "COMPLETED" | "CANCELLED";
}

export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  source: string;
  status: string;
  totalAmount: number;
  paymentStatus: string;
  specialRequests?: string;
  room: Room;
}

export interface ExternalBooking extends Booking {
  externalBookingId: string;
  platformBooking: {
    id: string;
    platformName: string;
    platformBookingId: string;
    bookingDetails: string;
  };
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  departmentId: string;
  department: {
    id: string;
    name: string;
  };
  tasks: Task[];
  shifts: Shift[];
}

export interface Shift {
  id: string;
  staffId: string;
  startTime: string;
  endTime: string;
  status: string;
}

export interface Amenity {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
