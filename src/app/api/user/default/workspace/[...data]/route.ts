import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function PUT(req: Request, { params }: { params: { data: string[] } }) {
  const [email, wsId] = params.data;
  const user = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      defaultWs: wsId,
    },
  });
  const data = await prisma.workspace.findFirst({
    where:{
      id: wsId!
    }
  })
  return NextResponse.json({ data });
}
export async function GET(req: Request, { params }: { params: { data: string[] } }) {
  const [email] = params.data;
  const data = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  return NextResponse.json({ id: data?.defaultWs });
}
