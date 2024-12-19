// maintenance.routes.ts
import { FastifyPluginAsync } from "fastify";
import MaintenanceController from "../controller/maintenance.controller";

const maintenanceRoutes: FastifyPluginAsync = async (
  fastify
): Promise<void> => {
  fastify.get("/api/maintenance", {
    handler: MaintenanceController.getAllLogs,
  });

  fastify.post("/api/maintenance", {
    handler: MaintenanceController.createMaintenanceLog,
  });
};

export default maintenanceRoutes;
