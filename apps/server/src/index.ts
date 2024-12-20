import cors from "@fastify/cors";
import dotenv from "dotenv";
import Fastify from "fastify";
import authRoutes from "./routes/auth.routes";
import bookingRoutes from "./routes/booking.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import healthRoutes from "./routes/health.routes";
import maintenanceRoutes from "./routes/maintenance.routes";
import roomRoutes from "./routes/room.routes";
import staffRoutes from "./routes/staff.routes";
import taskRoutes from "./routes/task.routes";

dotenv.config();

const PORT = parseInt(process.env.BACKEND_PORT || "4000");

const fastify = Fastify({
  // logger: true,
});

fastify.register(cors, { origin: "*" });

fastify.register(authRoutes);
fastify.register(healthRoutes);
fastify.register(dashboardRoutes);
fastify.register(roomRoutes);
fastify.register(bookingRoutes);
fastify.register(staffRoutes);
fastify.register(taskRoutes);
fastify.register(maintenanceRoutes);

fastify.setErrorHandler((error, _, reply) => {
  reply.code(500).send({ error: error.message });
});

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
