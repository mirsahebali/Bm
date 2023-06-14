import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, response:NextResponse){
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect("http://localhost:3000/api/auth/login");
  }
  return NextResponse.json(session);
}
