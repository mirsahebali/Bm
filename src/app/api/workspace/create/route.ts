import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
export async function POST(
  request: NextRequest,
  context: { params: { data: string[] } }
) {
const n = await request.json()
  const session = await getServerSession(authOptions);
  if (!session) {
    NextResponse.redirect("http://localhost:3000/api/auth/login");
  }
  const data = await prisma.user.update({
    where: {
      email: session?.user?.email!,
    },
    data: {
      workspaces: {
        create: [
          {
            name: n.name,
            email: session?.user?.email!,
          },
        ],
      },
    },
  });
  return new Response(JSON.stringify(data));
}
