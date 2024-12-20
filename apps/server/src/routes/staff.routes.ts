// staff.routes.ts
import { FastifyPluginAsync } from "fastify";
import StaffController from "../controller/staff.controller";

const staffRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/api/staffs", {
    handler: StaffController.getAllStaff,
  });

  fastify.get("/api/staffs/shifts", {
    handler: StaffController.getAllShifts,
  });

  fastify.post("/api/staffs/shifts", {
    handler: StaffController.createShift,
  });

  fastify.put("/api/staffs/shifts/:id", {
    handler: StaffController.updateStaffShift,
  });

  fastify.put("/api/staffs/:id", {
    handler: StaffController.updateStaff,
  });
};

export default staffRoutes;
