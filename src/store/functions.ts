import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createWorkspace(userId: string, name:string){
  await prisma.workspace.create({
    data:{
      userId:userId,
      name:name,
    }
  })
}
