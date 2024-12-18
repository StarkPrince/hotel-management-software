import { FastifyInstance } from "fastify";
import { dashboardService } from "../services/dashboardService";

export async function dashboardRoutes(fastify: FastifyInstance) {
  fastify.get("/api/dashboard/stats", async () => {
    return await dashboardService.getStats();
  });

  fastify.get("/api/dashboard/revenue-chart", async () => {
    return await dashboardService.getRevenueChart();
  });
}
