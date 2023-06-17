import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
export async function POST(req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.pathname;
  const WsId = id.replace("/api/boards/create/", "");
  const r = await req.json();
  const data = await prisma.workspace.update({
    where: {
      id: WsId,
    },
    data: {
      boards: {
        create: {
          name: r.name,
          isDeleted: false,
        },
      },
    },
  });

  return NextResponse.json({ data, r });
}
