import crypto from "crypto";
import QRCode from "qrcode";

interface QRCodeData {
  bookingId: string;
  userId: string;
  checkOut: string | Date;
}

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = crypto.randomBytes(32); // Replace with a securely stored key in production
const IV = crypto.randomBytes(16); // Initialization vector

// Helper functions for encryption and decryption
function encrypt(data: string): string {
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, IV);
  const encrypted = Buffer.concat([
    cipher.update(data, "utf8"),
    cipher.final(),
  ]);
  return IV.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(data: string): string {
  const [ivHex, encryptedData] = data.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

export async function generateQRCode(data: QRCodeData): Promise<string> {
  const encrypted = encrypt(JSON.stringify(data));
  return QRCode.toDataURL(encrypted);
}

export async function verifyQRCode(qrCode: string): Promise<QRCodeData> {
  const decrypted = decrypt(qrCode);
  return JSON.parse(decrypted);
}
