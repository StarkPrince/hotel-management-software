// booking.controller.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { validateRequest } from "../middleware/validateRequest";
import {
  BookingUpdateDTO,
  BookingUpdateZodSchema,
  BookingZodSchema,
} from "../schemas";
import { bookingPlatformIntegration } from "../services/bookingPlatformIntegration";
import { bookingService } from "../services/booking.service";

class BookingController {
  getAllBookings = async (_: FastifyRequest, reply: FastifyReply) => {
    reply.status(201).send(await bookingService.getAllBookings());
  };

  createBooking = async (request: any, reply: FastifyReply) => {
    validateRequest(BookingZodSchema)(request, reply);
    reply.status(201).send(await bookingService.createBooking(request.body));
  };

  verifyQRCode = async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(201).send(await bookingService.verifyQRCode(request.body));
  };

  updateBooking = async (request: any, reply: FastifyReply) => {
    validateRequest(BookingUpdateZodSchema)(request, reply);
    reply
      .status(201)
      .send(
        await bookingService.updateBookingStatus(
          request.params.id,
          request.body as unknown as BookingUpdateDTO
        )
      );
  };

  syncAllPlatforms = async (_: FastifyRequest, reply: FastifyReply) => {
    reply.status(201).send(await bookingPlatformIntegration.syncAllPlatforms());
  };

  getExternalBookings = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    reply
      .status(201)
      .send(
        await bookingPlatformIntegration.getExternalBookings(request.params)
      );
  };

  getBookingById = async (request: any, reply: FastifyReply) => {
    reply
      .status(201)
      .send(await bookingService.getBookingById(request.params.id));
  };
}

export default new BookingController();
