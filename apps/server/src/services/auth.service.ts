import prisma from "../prisma";
import { UserDTO } from "../schemas";
import { UserRole } from "../schemas/enum";
import { verifyQRCode } from "../utils/qrCode";

export class AuthService {
  async verifyQRCode(data: any) {
    return verifyQRCode(data.qrCode);
  }

  async register(data: UserDTO) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (user) {
      throw new Error("User with this email already exists");
    }
    return await prisma.user.create({
      data,
    });
  }

  async login(data: any) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.password !== data.password) {
      throw new Error("Invalid password");
    }
    return user;
  }

  async createStaff(data: UserDTO) {
    const updatedData: UserDTO = { ...data, role: UserRole.STAFF };
    return await prisma.user.create({
      data: updatedData,
    });
  }
}

export const authService = new AuthService();
