import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.pathname;
  const WsId = id.replace("/api/boards/read/", "");
  const data = await prisma.board.findMany({
    where: {
      wsId: WsId,
    },
    include: {
      lists: true
    }
  });
  return NextResponse.json({ data: data });
}
