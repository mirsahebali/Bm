import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(req: NextRequest, res: NextResponse) {
  const data = await prisma.board.findMany({
    where: {
      isDeleted: true,
    },
  });
  return NextResponse.json({ data: data });
}
