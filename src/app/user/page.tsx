import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
const prisma = new PrismaClient();
export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log("Session in user/page.tsx", session);
  return (
    <div>

      <h1>Page</h1>
    </div>
  );
}
