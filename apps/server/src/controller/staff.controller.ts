// staff.controller.ts
import { staffService } from "../services/staffService";

class StaffController {
  getAllStaff = async (request: any) => {
    return await staffService.getAllStaff();
  };

  createShift = async (request: any) => {
    return await staffService.createShift(request.body);
  };
}
export default new StaffController();
