import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = await prisma.list.findMany({
    where: {
      boardId: id,
    },
  });
  return NextResponse.json({ data });
}
