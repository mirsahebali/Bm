import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.redirect("/api/auth/signin")   
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    include:{
      workspaces: true,
    }
  })

  return NextResponse.json(user)
}
