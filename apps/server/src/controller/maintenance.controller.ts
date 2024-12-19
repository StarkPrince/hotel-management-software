// maintenance.controller.ts
import { maintenanceService } from "../services/maintenanceService";

class MaintenanceController {
  getAllLogs = async () => {
    return await maintenanceService.getAllLogs();
  };

  createMaintenanceLog = async (request: any) => {
    return await maintenanceService.createMaintenanceLog(request.body);
  };
}

export default new MaintenanceController();
