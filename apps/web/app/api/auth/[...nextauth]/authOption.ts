// apps/web/app/api/auth/[...nextauth]/route.ts
import { BASE_URL, NEXTAUTH_SECRET } from "@/apps/web/config";
import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          console.log("API Response:", data); // Debugging purpose

          if (!response.ok) {
            throw new Error(data.message || "Authentication failed");
          }

          if (data && data.token) {
            return {
              id: data.id, // Ensure this matches your API response
              email: data.email,
              name: data.name,
              token: data.token,
            };
          }

          throw new Error("Invalid response structure");
        } catch (error: any) {
          console.error("Authorization error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // This should point to the login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // token.token = user.token; // Ensure token is passed here
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email,
          token: token.token as string, // Include token if needed
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: NEXTAUTH_SECRET,
  debug: true, // Set to false in production
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
