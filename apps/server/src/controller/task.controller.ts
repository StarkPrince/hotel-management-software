// task.controller.ts
import { FastifyReply } from "fastify";
import { validateRequest } from "../middleware/validateRequest";
import { TaskZodSchema } from "../schemas";
import { taskService } from "../services/task.service";

class TaskController {
  getAllTasks = async (request: any) => {
    return await taskService.getAllTasks();
  };

  createTask = async (request: any, reply: FastifyReply) => {
    validateRequest(TaskZodSchema)(request, reply);
    reply.status(201).send(await taskService.createTask(request.body));
  };
}

export default new TaskController();
