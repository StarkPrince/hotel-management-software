import { FastifyInstance } from "fastify";
import { maintenanceService } from "../services/maintenanceService";

export async function maintenanceRoutes(fastify: FastifyInstance) {
  fastify.get("/api/maintenance", async () => {
    return await maintenanceService.getAllLogs();
  });

  fastify.post("/api/maintenance", async (request: any) => {
    return await maintenanceService.createMaintenanceLog(request.body);
  });
}
