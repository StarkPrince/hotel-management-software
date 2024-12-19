// staff.routes.ts
import { FastifyPluginAsync } from "fastify";
import StaffController from "../controller/staff.controller";

const staffRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/api/staff", {
    handler: StaffController.getAllStaff,
  });

  fastify.post("/api/staff/shifts", {
    handler: StaffController.createShift,
  });
};

export default staffRoutes;
