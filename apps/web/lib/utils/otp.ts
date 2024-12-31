// OTP generation and validation utilities
export function generateOTP(length: number = 6): string {
  return Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, "0");
}

export function generateExpiryTime(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}
