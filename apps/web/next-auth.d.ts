import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null | undefined;
      name?: string;
      token: string;
    };
    accessToken?: string;
  }
}
