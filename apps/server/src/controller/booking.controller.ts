// booking.controller.ts
import { bookingPlatformIntegration } from "../services/bookingPlatformIntegration";
import { bookingService } from "../services/bookingService";

class BookingController {
  getAllBookings = async () => {
    return await bookingService.getAllBookings();
  };

  createBooking = async (request: any) => {
    return await bookingService.createBooking(request.body);
  };

  verifyQRCode = async (request: any) => {
    return await bookingService.verifyQRCode(request.body.qrCode);
  };

  updateBookingStatus = async (request: any) => {
    return await bookingService.updateBookingStatus(
      request.params.id,
      request.body.status
    );
  };

  syncAllPlatforms = async () => {
    return await bookingPlatformIntegration.syncAllPlatforms();
  };

  getExternalBookings = async (request: any) => {
    return await bookingPlatformIntegration.getExternalBookings(
      request.params.platform
    );
  };
}

export default new BookingController();
