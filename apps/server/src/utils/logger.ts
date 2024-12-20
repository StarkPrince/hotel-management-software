import crypto from "crypto";
import winston from "winston";
import prisma from "../prisma";
import { LogLevel } from "../schemas/enum";

const maskSensitiveData = (data: string | undefined): string | null => {
  return data ? crypto.createHash("sha256").update(data).digest("hex") : null;
};

const logger = winston.createLogger({
  level: LogLevel.VERBOSE,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.errors({ stack: true }), // Ensure stack traces are included in error logs
    winston.format.printf((info: any) => {
      const { ipAddress, ...otherInfo } = info;
      return JSON.stringify({
        ...otherInfo,
        ipAddress: ipAddress,
      });
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

/**
 * Logs an action to the database and console.
 * @param userId - The ID of the user performing the action.
 * @param ipAddress - The user's IP address.
 * @param objectId - The ID of the object being acted upon.
 * @param action - The action being performed.
 * @param level - The log level (e.g., INFO, ERROR).
 * @param message - The log message.
 */
const loggerUtil = async (
  userId: string | undefined,
  ipAddress: string | null,
  objectId: string,
  action: string,
  level: LogLevel = LogLevel.INFO,
  message: string = "success"
): Promise<void> => {
  const timestamp = new Date();

  // Sanitize and mask sensitive data
  const sanitizedUserId = userId || null;
  const maskedIpAddress = false
    ? maskSensitiveData(ipAddress as string)
    : ipAddress;
  const sanitizedObjectId = objectId; // Assuming objectId is safe to log
  const sanitizedMessage = message || ""; // Ensure message is provided

  try {
    // Insert the log into the database using Prisma
    await prisma.log.create({
      data: {
        userId: sanitizedUserId,
        ipAddress: maskedIpAddress,
        objectId: sanitizedObjectId,
        action: action,
        level: level,
        message: sanitizedMessage,
        timestamp: timestamp,
      },
    });

    // Log the sanitized data to the console or file
    logger.log({
      level: level.toLowerCase(),
      userId: sanitizedUserId,
      ipAddress: maskedIpAddress,
      message: sanitizedMessage,
      timestamp,
    });
  } catch (error: any) {
    // Log the error with minimal details to avoid sensitive data leakage
    logger.error("Error logging to database", {
      error: error.message,
      userId: sanitizedUserId,
      ipAddress: maskedIpAddress,
      message: sanitizedMessage,
      timestamp,
    });
  }
};

export { loggerUtil };
export default logger;
