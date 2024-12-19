// qr.routes.ts
import { FastifyPluginAsync } from "fastify";
import QRController from "../controller/qr.controller";

const qrRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post("/:id/qr", {
    onRequest: [fastify.authenticate],
    handler: QRController.generateAndUpdateQRCode,
  });
};

export default qrRoutes;
