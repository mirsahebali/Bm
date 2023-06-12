import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest, context: { params: { data: string[] } }) {
  const [listId, name, url] = context.params.data;
  const nUrl = new URL(url).host
  return new NextResponse(JSON.stringify({listId, name}))
}
