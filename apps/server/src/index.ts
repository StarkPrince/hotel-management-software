import cors from "@fastify/cors";
import dotenv from "dotenv";
import Fastify from "fastify";
import { bookingPlatformIntegration } from "./services/bookingPlatformIntegration";
import { bookingService } from "./services/bookingService";
import { dashboardService } from "./services/dashboardService";
import { maintenanceService } from "./services/maintenanceService";
import { roomService } from "./services/roomService";
import { staffService } from "./services/staffService";
import { taskService } from "./services/taskService";
dotenv.config();

const PORT = parseInt(process.env.BACKEND_PORT || "4000");
console.log("PORT", PORT);

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: "*",
});

// Health check endpoint
fastify.get("/health", async () => {
  return { status: "ok" };
});

// Dashboard endpoints
fastify.get("/api/dashboard/stats", async () => {
  return await dashboardService.getStats();
});

fastify.get("/api/dashboard/revenue-chart", async () => {
  return await dashboardService.getRevenueChart();
});

// Room endpoints
fastify.get("/api/rooms", async () => {
  return await roomService.getAllRooms();
});

fastify.get("/api/rooms/:id", async (request: any) => {
  return await roomService.getRoomById(request.params.id);
});

fastify.post("/api/rooms", async (request: any, _: any) => {
  return await roomService.createRoom(request.body);
});

fastify.put("/api/rooms/:id", async (request: any) => {
  return await roomService.updateRoom(request.params.id, request.body);
});

// Booking endpoints
fastify.get("/api/bookings", async () => {
  return await bookingService.getAllBookings();
});

fastify.post("/api/bookings", async (request: any, _: any) => {
  return await bookingService.createBooking(request.body);
});

fastify.put("/api/bookings/:id/status", async (request: any) => {
  return await bookingService.updateBookingStatus(
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
  return await staffService.getAllStaff();
});

fastify.post("/api/staff/shifts", async (request: any) => {
  return await staffService.createShift(request.body);
});

// Task endpoints
fastify.get("/api/tasks", async () => {
  return await taskService.getAllTasks();
});

fastify.post("/api/tasks", async (request: any) => {
  return await taskService.createTask(request.body);
});

// Maintenance endpoints
fastify.get("/api/maintenance", async () => {
  return await maintenanceService.getAllLogs();
});

fastify.post("/api/maintenance", async (request: any) => {
  return await maintenanceService.createMaintenanceLog(request.body);
});
const BACKEND_PORT = process.env.BACKEND_PORT || 4000;
const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    console.log(`Server listening on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
