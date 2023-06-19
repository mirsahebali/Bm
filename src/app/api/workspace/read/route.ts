import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
export const revalidate = true;
export async function GET(
  req: NextRequest,
  context: { params: { email: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json("Unauthorized");
  }
  const data = await prisma.workspace.findMany({
    where: {
      email: session?.user?.email,
    },
    include:{
      boards: true
    }
  });
  return NextResponse.json({ data });
}
