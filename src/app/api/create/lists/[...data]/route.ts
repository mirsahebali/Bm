import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient()
export async function GET(request:NextRequest,context: { params: { data: string[] } }){
const [boardId, name] = context.params.data;
  const data = await prisma.board.update({
    where: {
      id: boardId
    },
    data:{
      lists: {
        create:[{
          name: name,
          isDeleted: false
        }]
      }
    }
  }) 
  return new NextResponse(JSON.stringify(data))
}
