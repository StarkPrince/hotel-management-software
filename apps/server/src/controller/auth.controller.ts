// booking.controller.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { validateRequest } from "../middleware/validateRequest";
import { UserZodSchema } from "../schemas";
import { authService } from "../services/auth.service";

class AuthController {
  register = async (request: any, reply: FastifyReply) => {
    validateRequest(UserZodSchema)(request, reply);
    reply.status(201).send(await authService.register(request.body));
  };

  login = async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(201).send(await authService.login(request.body));
  };

  createStaff = async (request: any, reply: FastifyReply) => {
    validateRequest(UserZodSchema)(request, reply);
    reply.status(201).send(await authService.createStaff(request.body));
  };
}

export default new AuthController();
