import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await prisma.board.update({
    where: {
      id: params.id,
    },
    data: {
      isDeleted: true,
    },
  });
  return NextResponse.json(data);
}
