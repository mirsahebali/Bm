import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function GET(request: NextRequest, context: { params: { data: string[] } }) {
  const [email, name, id] = context.params.data
const prisma = new PrismaClient()
const session = await getServerSession(authOptions)  
  if (!session) {
    NextResponse.redirect('/api/auth/login') 
  }
  const data = await prisma.user.update({
   where: {
      email: email
    }, 
    data: {
      workspaces: {
        create: [{
          name:name
        }]
      }
    }
  })
  return new NextResponse(JSON.stringify({email, name, id,data}));
}
