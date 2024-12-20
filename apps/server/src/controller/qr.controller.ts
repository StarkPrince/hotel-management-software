// booking.controller.ts
import qrServices from "../services/qr.service";

class QRController {
  generateAndUpdateQRCode = async (request: any) => {
    return await qrServices.generateAndUpdateQRCode(
      request.params.id,
      request.user
    );
  };
}

export default new QRController();
