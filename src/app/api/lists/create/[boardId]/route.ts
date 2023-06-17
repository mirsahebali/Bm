import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function POST(
  request: NextRequest,
  context: { params: { boardId: string } }
) {
  const id = context.params.boardId;
  const name = await request.json();
  const data = await prisma.board.update({
    where: {
      id: id,
    },
    data: {
      lists: {
        create: [
          {
            name: name.name,
          },
        ],
      },
    },
  });
  return NextResponse.json({ data });
}
