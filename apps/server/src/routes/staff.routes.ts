import { FastifyInstance } from "fastify";
import { staffService } from "../services/staffService";

export async function staffRoutes(fastify: FastifyInstance) {
  fastify.get("/api/staff", async () => {
    return await staffService.getAllStaff();
  });

  fastify.post("/api/staff/shifts", async (request: any) => {
    return await staffService.createShift(request.body);
  });
}
