import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Enable logging for debugging (optional)
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default PrismaClient;
