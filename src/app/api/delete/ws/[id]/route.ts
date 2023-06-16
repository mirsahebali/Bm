import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname;
  const WsId = id.replace("/api/delete/ws/", "");
  const data = await prisma.workspace.delete({
    where: {
      id: WsId,
    },
  });
  return NextResponse.json(data);
}
