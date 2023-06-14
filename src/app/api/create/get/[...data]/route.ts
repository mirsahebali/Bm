import { NextRequest } from "next/server";
export async function GET(request:NextRequest,context:{params:{data:string[]}}) {
  const [a,b,c] = context.params.data
  return new Response(JSON.stringify({a,b,c}));


}
