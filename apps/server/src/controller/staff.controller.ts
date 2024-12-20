// staff.controller.ts
import { FastifyReply } from "fastify";
import { validateRequest } from "../middleware/validateRequest";
import {
  StaffShiftUpdateZodSchema,
  StaffShiftZodSchema,
  UserUpdateZodSchema,
} from "../schemas";
import { staffService } from "../services/staff.service";

class StaffController {
  getAllStaff = async (_: any) => {
    return await staffService.getAllStaff();
  };

  createShift = async (request: any, reply: FastifyReply) => {
    validateRequest(StaffShiftZodSchema)(request, reply);
    return await staffService.createShift(request.body);
  };

  getAllShifts = async (_: any) => {
    return await staffService.getAllShifts();
  };

  updateStaffShift = async (request: any, reply: FastifyReply) => {
    validateRequest(StaffShiftUpdateZodSchema)(request, reply);
    return await staffService.updateStaffShift(request.params.id, request.body);
  };

  updateStaff = async (request: any, reply: FastifyReply) => {
    validateRequest(UserUpdateZodSchema)(request, reply);
    return await staffService.updateStaff(request.params.id, request.body);
  };
}
export default new StaffController();
