import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function POST(req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.pathname;
  const bId = id.replace("/api/boards/restore/", "");

  const data = await prisma.board.update({
    where: {
      id: bId,
    },
    data: {
      isDeleted: false,
    },
  });
  return NextResponse.json({ data: data });
}
