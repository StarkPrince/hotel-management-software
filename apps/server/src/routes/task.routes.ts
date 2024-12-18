import { FastifyInstance } from "fastify";
import { taskService } from "../services/taskService";

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.get("/api/tasks", async () => {
    return await taskService.getAllTasks();
  });

  fastify.post("/api/tasks", async (request: any) => {
    return await taskService.createTask(request.body);
  });
}
