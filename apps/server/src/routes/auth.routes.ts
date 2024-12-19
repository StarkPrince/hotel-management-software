// auth.routes.ts
import { FastifyPluginAsync } from "fastify";
import AuthController from "../controller/auth.controller";
import { LoginSchema, RegisterSchema } from "../schemas";

const authRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post("/login", {
    schema: {
      body: LoginSchema,
    },
    handler: AuthController.login,
  });

  fastify.post("/register", {
    schema: {
      body: RegisterSchema,
    },
    handler: AuthController.register,
  });
};

export default authRoutes;
