import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
export const revalidate = true;
export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized?hello?");
  }

  const data = await prisma.workspace.findMany({
    where: {
      email: session?.user?.email,
    },
  });
  return NextResponse.json({ data });
}
