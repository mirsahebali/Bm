import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

  const prisma = new PrismaClient();
export async function GET(request: NextRequest, context: { params: { data: string[] } }) {
  const [wsId, name] = context.params.data;
const data = await  prisma.workspace.update({
    where: {
      id: wsId
    },
    data:{
   boards:{
        create: [{
          name: name
        }]
      } 
    }
  })

   return new NextResponse(
    JSON.stringify({
      enteredData: {
        name: name,
        wsId: wsId,
      },
      data: data
    })
  );
}
