import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

export const protectRoute = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      return reply
        .status(401)
        .send({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const session = await prisma.session.findFirst({
      where: { jwt: token, expiresAt: { gte: new Date() } },
    });

    if (!session) {
      return reply.status(401).send({ error: "Session expired or invalid" });
    }

    request.user = { id: decoded.userId, sessionId: session.id };
  } catch (error) {
    return reply.status(401).send({ error: "Unauthorized: Invalid token" });
  }
};
