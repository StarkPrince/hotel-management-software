// maintenance.controller.ts
import { FastifyReply } from "fastify";
import { validateRequest } from "../middleware/validateRequest";
import {
  MaintenanceLogUpdateZodSchema,
  MaintenanceLogZodSchema,
} from "../schemas";
import { maintenanceService } from "../services/maintenance.service";

class MaintenanceController {
  getAllLogs = async () => {
    return await maintenanceService.getAllLogs();
  };

  getMaintenanceLogById = async (request: any) => {
    return await maintenanceService.getMaintenanceLogById(request.params.id);
  };

  createMaintenanceLog = async (request: any, reply: FastifyReply) => {
    validateRequest(MaintenanceLogZodSchema)(request, reply);
    return await maintenanceService.createMaintenanceLog(request.body);
  };

  updateMaintenanceLog = async (request: any, reply: FastifyReply) => {
    if (!request.params.id) {
      return reply.status(400).send({ error: "ID is required" });
    }
    validateRequest(MaintenanceLogUpdateZodSchema)(request, reply);
    return await maintenanceService.updateMaintenanceLog(
      request.params.id,
      request.body
    );
  };
}

export default new MaintenanceController();
