import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch (err) {
    throw new Error("Invalid token");
  }
}

export async function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return null;
  }

  try {
    return await verifyAuth(token.value);
  } catch (err) {
    return null;
  }
}
