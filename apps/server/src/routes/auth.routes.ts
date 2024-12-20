// auth.routes.ts
import { FastifyPluginAsync } from "fastify";
import AuthController from "../controller/auth.controller";

const authRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  // TODO: This route is not working
  fastify.post("/api/register", {
    handler: AuthController.register,
  });

  // TODO: This route is not working
  fastify.post("/api/login", {
    handler: AuthController.login,
  });

  fastify.post("/api/staffs", {
    handler: AuthController.createStaff,
  });
};

export default authRoutes;
