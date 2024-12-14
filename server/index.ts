import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import { bookingPlatformIntegration } from "./services/bookingPlatformIntegration";
import { bookingService } from "./services/bookingService";
import { dashboardService } from "./services/dashboardService";
import { maintenanceService } from "./services/maintenanceService";
import { roomService } from "./services/roomService";
import { staffService } from "./services/staffService";
import { taskService } from "./services/taskService";
import dotenv from "dotenv";
dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: "*",
});

const prisma = new PrismaClient();

// Health check endpoint
fastify.get("/health", async () => {
  return { status: "ok" };
});

// Dashboard endpoints
fastify.get("/api/dashboard/stats", async () => {
  return await dashboardService.getStats(prisma);
});

fastify.get("/api/dashboard/revenue-chart", async () => {
  return await dashboardService.getRevenueChart(prisma);
});

// Room endpoints
fastify.get("/api/rooms", async () => {
  return await roomService.getAllRooms(prisma);
});

fastify.get("/api/rooms/:id", async (request: any) => {
  return await roomService.getRoomById(prisma, request.params.id);
});

fastify.post("/api/rooms", async (request: any, reply: any) => {
  return await roomService.createRoom(prisma, request.body);
});

fastify.put("/api/rooms/:id", async (request: any) => {
  return await roomService.updateRoom(prisma, request.params.id, request.body);
});

// Booking endpoints
fastify.get("/api/bookings", async () => {
  return await bookingService.getAllBookings(prisma);
});

fastify.post("/api/bookings", async (request: any, reply: any) => {
  return await bookingService.createBooking(prisma, request.body);
});

fastify.put("/api/bookings/:id/status", async (request: any) => {
  return await bookingService.updateBookingStatus(
    prisma,
    request.params.id,
    request.body.status
  );
});

// External Platform Integration endpoints
fastify.get("/api/external-bookings/:platform", async (request: any) => {
  console.log(request.params.platform);
  return await bookingPlatformIntegration.getExternalBookings(
    request.params.platform
  );
});

fastify.post("/api/external-bookings/sync", async () => {
  return await bookingPlatformIntegration.syncAllPlatforms();
});

// Staff endpoints
fastify.get("/api/staff", async () => {
  return await staffService.getAllStaff(prisma);
});

fastify.post("/api/staff/shifts", async (request: any) => {
  return await staffService.createShift(prisma, request.body);
});

// Task endpoints
fastify.get("/api/tasks", async () => {
  return await taskService.getAllTasks(prisma);
});

fastify.post("/api/tasks", async (request: any) => {
  return await taskService.createTask(prisma, request.body);
});

// Maintenance endpoints
fastify.get("/api/maintenance", async () => {
  return await maintenanceService.getAllLogs(prisma);
});

fastify.post("/api/maintenance", async (request: any) => {
  return await maintenanceService.createMaintenanceLog(prisma, request.body);
});
const BACKEND_PORT = process.env.BACKEND_PORT || 4000;
const start = async () => {
  try {
    await fastify.listen({ port : BACKEND_PORT as number });
    console.log("Server listening on port 4000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
