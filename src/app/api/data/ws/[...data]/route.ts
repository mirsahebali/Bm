import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function GET(request: NextRequest, context: { params: { data: string[] } }) {
  const [ name] = context.params.data
const prisma = new PrismaClient()
const session = await getServerSession(authOptions)  
  if (!session) {
    NextResponse.redirect('http://localhost:3000/api/auth/login') 
  }
  const data = await prisma.user.update({
   where: {
      email: session?.user?.email!
    }, 
    data: {
      workspaces: {
        create: [{
          name:name
        }]
      }
    }
  })
  return new NextResponse(JSON.stringify({ data}));
}
