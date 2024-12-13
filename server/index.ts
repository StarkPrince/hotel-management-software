import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";

console.log("Starting server...");
const fastify = Fastify({
  logger: true,
});

// allow cross-origin requests
fastify.register(cors, {
  origin: "*",
});

const prisma = new PrismaClient();

// Health check endpoint
fastify.get("/health", async () => {
  return { status: "ok" };
});

// Room endpoints
fastify.get("/api/rooms", async () => {
  console.log("GET /api/rooms");
  const rooms = await prisma.room.findMany({
    include: {
      bookings: true,
    },
  });
  return rooms;
});

fastify.post("/api/rooms", async (request, reply) => {
  const room = request.body as any;
  const newRoom = await prisma.room.create({
    data: room,
  });
  return reply.code(201).send(newRoom);
});

// Booking endpoints
fastify.get("/api/bookings", async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      room: true,
    },
  });
  return bookings;
});

fastify.post("/api/bookings", async (request: any, reply: any) => {
  const booking = request.body as any;
  const newBooking = await prisma.booking.create({
    data: booking,
    include: {
      room: true,
    },
  });
  return reply.code(201).send(newBooking);
});

// Cleaning schedule endpoints
fastify.get("/api/cleaning-schedules", async () => {
  const schedules = await prisma.cleaningSchedule.findMany();
  return schedules;
});

fastify.post("/api/cleaning-schedules", async (request: any, reply: any) => {
  const schedule = request.body as any;
  const newSchedule = await prisma.cleaningSchedule.create({
    data: schedule,
  });
  return reply.code(201).send(newSchedule);
});

const start = async () => {
  try {
    console.log("Server listening on port 3001");
    await fastify.listen({ port: 3001 });
    fastify.log.info(`server listening on ${fastify.server.address()}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
