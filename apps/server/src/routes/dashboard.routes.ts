// dashboard.routes.ts
import { FastifyPluginAsync } from "fastify";
import DashboardController from "../controller/dashboard.controller";

const dashboardRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/api/dashboard/stats", {
    handler: DashboardController.getStats,
  });

  fastify.get("/api/dashboard/revenue-chart", {
    handler: DashboardController.getRevenueChart,
  });
};

export default dashboardRoutes;
