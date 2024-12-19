import { createHash } from "crypto";

export function generateOTP(length: number = 6): string {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  return otp;
}

export function hashOTP(otp: string): string {
  return createHash("sha256").update(otp).digest("hex");
}

export function verifyOTP(inputOTP: string, hashedOTP: string): boolean {
  const hashedInput = hashOTP(inputOTP);
  return hashedInput === hashedOTP;
}
