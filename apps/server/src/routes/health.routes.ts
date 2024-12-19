import { FastifyPluginAsync } from "fastify";

const healthRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/health", async () => {
    return { status: "ok" };
  });
};

export default healthRoutes;
