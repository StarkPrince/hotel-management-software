// booking.routes.ts
import { FastifyPluginAsync } from "fastify";
import BookingController from "../controller/booking.controller";

const bookingRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/api/bookings", {
    handler: BookingController.getAllBookings,
  });

  fastify.post("/api/bookings", {
    handler: BookingController.createBooking,
  });

  fastify.post("/verify-qr", {
    handler: BookingController.verifyQRCode,
  });

  fastify.put("/api/bookings/:id/status", {
    handler: BookingController.updateBookingStatus,
  });

  fastify.get("/api/external-bookings/sync", {
    handler: BookingController.syncAllPlatforms,
  });

  fastify.get("/api/external-bookings/:platform", {
    handler: BookingController.getExternalBookings,
  });
};

export default bookingRoutes;
