import prisma from "@/lib/prisma";
import axios from "axios";
import { NextResponse } from "next/server";
export async function POST(req: Request, { params }: { params: { data: string[] } }) {
  const [listId] = params.data;
  const body = await req.json();
 
const res = await fetch('https://api.peekalink.io/', {
    method: 'POST',
    headers: {
        'X-API-Key': process.env.NEXT_PUBLIC_PEEKALINK_KEY!,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        link: body.url,
    })
})
const data = await res.json()
 // const url = new URL(body.url).hostname;
  const bookmark = await prisma.list.update({
    where: {
      id: listId,
    },
    data: {
      bookmarks: {
        create: [
          {
            name: body.name,
            url: body.url,
            favicon: data?.image?.url,
            title: data?.title,
            description: data?.description,
          },
        ],
      },
    },
  });
  return NextResponse.json(bookmark);
}
export async function GET(req: Request, { params }: { params: { data: string[] } }) {
  const [listId] = params.data;
  const data = await prisma.bookmark.findMany({
    where: {
      listId: listId,
    },
  });
  return NextResponse.json(data);
}
