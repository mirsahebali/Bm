import prisma from "@/lib/prisma";
import axios from "axios";
import { NextResponse } from "next/server";
export async function POST(req: Request, { params }: { params: { data: string[] } }) {
  const [listId] = params.data;
  const body = await req.json();
  const { data } = await axios.post("https://api.linkpreview.net", {
    q: body.url,
    key: process.env.NEXT_PUBLIC_LINKPREVIEW_API_KEY,
    fields: ["title, description"],
  });
  const url = new URL(body.url).hostname;
  const favicon = `https://www.google.com/s2/favicons?domain=${url}&sz=${20}`;
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
            favicon: favicon,
            title: data?.title,
            description: data?.description,
          },
        ],
      },
    },
  });
  return NextResponse.json(bookmark)
}
export async function GET(req:Request, {params}: {params:{data:string[]}}){
  const [listId] = params.data;
  const data = await prisma.bookmark.findMany({
    where:{
      listId: listId
    }
  })
return NextResponse.json(data)
}
