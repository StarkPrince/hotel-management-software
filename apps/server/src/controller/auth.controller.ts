// auth.controller.ts
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prisma";
import { comparePassword, hashPassword } from "../utils/auth";

class AuthController {
  login = async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as any;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = await reply.jwtSign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { token };
  };

  register = async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password, name } = request.body as any;

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = await reply.jwtSign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { token };
  };
}

export default new AuthController();
