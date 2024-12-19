// task.routes.ts
import { FastifyPluginAsync } from "fastify";
import TaskController from "../controller/task.controller";

const taskRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/api/tasks", {
    handler: TaskController.getAllTasks,
  });

  fastify.post("/api/tasks", {
    handler: TaskController.createTask,
  });
};

export default taskRoutes;
