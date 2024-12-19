import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, ZodType } from "zod";

// Fastify validation middleware
export const validateRequest = (schema: ZodType<any>) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      request.body = schema.parse(request.body);
    } catch (err: any) {
      if (err instanceof ZodError) {
        reply.status(400).send({
          message: "Validation failed",
          errors: err.errors,
        });
      } else {
        reply.status(400).send({
          message: "An error occurred during validation",
          error: err.message,
        });
      }
    }
  };
};
