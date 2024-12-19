// dashboard.controller.ts
import { dashboardService } from "../services/dashboardService";

class DashboardController {
  getStats = async (request: any) => {
    return await dashboardService.getStats();
  };

  getRevenueChart = async (request: any) => {
    return await dashboardService.getRevenueChart();
  };
}

export default new DashboardController();
