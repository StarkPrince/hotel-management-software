import jwt from "@fastify/jwt";
import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest) => Promise<void>;
  }
}

export default fp(async (fastify) => {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET!,
  });

  fastify.decorate("authenticate", async (request: FastifyRequest) => {
    try {
      console.log("request", request);
      await request.jwtVerify();
    } catch (err) {
      throw new Error("Unauthorized");
    }
  });
});
