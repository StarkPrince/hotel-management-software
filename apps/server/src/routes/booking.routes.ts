import { FastifyInstance } from "fastify";
import { bookingPlatformIntegration } from "../services/bookingPlatformIntegration";
import { bookingService } from "../services/bookingService";

export async function bookingRoutes(fastify: FastifyInstance) {
  fastify.get("/api/bookings", async () => {
    return await bookingService.getAllBookings();
  });

  fastify.post("/api/bookings", async (request: any) => {
    return await bookingService.createBooking(request.body);
  });

  fastify.put("/api/bookings/:id/status", async (request: any) => {
    return await bookingService.updateBookingStatus(
      request.params.id,
      request.body.status
    );
  });

  fastify.get("/api/external-bookings/sync", async () => {
    return await bookingPlatformIntegration.syncAllPlatforms();
  });

  fastify.get("/api/external-bookings/:platform", async (request: any) => {
    return await bookingPlatformIntegration.getExternalBookings(
      request.params.platform
    );
  });
}
