// Only include dotenv in server-side code
if (typeof window === "undefined") {
  require("dotenv").config();
}

export const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api";
