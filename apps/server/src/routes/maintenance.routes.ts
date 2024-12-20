// maintenance.routes.ts
import { FastifyPluginAsync } from "fastify";
import MaintenanceController from "../controller/maintenance.controller";

const maintenanceRoutes: FastifyPluginAsync = async (
  fastify
): Promise<void> => {
  fastify.get("/api/maintenance", {
    handler: MaintenanceController.getAllLogs,
  });

  fastify.get("/api/maintenance/:id", {
    handler: MaintenanceController.getMaintenanceLogById,
  });

  fastify.post("/api/maintenance", {
    handler: MaintenanceController.createMaintenanceLog,
  });

  fastify.put("/api/maintenance/:id", {
    handler: MaintenanceController.updateMaintenanceLog,
  });
};

export default maintenanceRoutes;
