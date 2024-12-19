// task.controller.ts
import { taskService } from "../services/taskService";

class TaskController {
  getAllTasks = async (request: any) => {
    return await taskService.getAllTasks();
  };

  createTask = async (request: any) => {
    const { title, description, dueDate } = request.body;
    return await taskService.createTask({ title, description, dueDate });
  };
}

export default new TaskController();
