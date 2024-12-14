require("dotenv").config();

export const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://localhost:4000/api";
