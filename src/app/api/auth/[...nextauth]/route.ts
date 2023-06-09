import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: process.env.NEXT_PUBLIC_EMAIL_SERVER!,
      from: process.env.NEXT_PUBLIC_EMAIL_FROM!,
    }),
  ],
  events: {
    async signIn(message) {
      console.log("is new user?", message.isNewUser);
      console.log("message", message);
    },
    async createUser(message) {
      await prisma.userData.create({
        data: {
          userId: message.user.id,
        },
      });
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
