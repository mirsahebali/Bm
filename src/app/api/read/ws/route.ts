import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export const revalidate = true
export async function GET(req: NextRequest, res: NextResponse) {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new  Error("Unauthorized?hello?");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });
  const data = await prisma.workspace.findMany({
    where: {
      userId: user?.id,
    },
  });
  return NextResponse.json(data);
}
