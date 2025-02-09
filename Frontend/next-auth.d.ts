import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name?: string;
      email?: string;
      image?: string;
      username?: string;
      gender?: string;
      language?: string;
      country?: string;
    };
  }

  interface User {
    _id: string;
    name?: string;
    email?: string;
    image?: string;
    username?: string;
    gender?: string;
    language?: string;
    country?: string;
  }
}
