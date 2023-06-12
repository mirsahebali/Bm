/*
  Warnings:

  - Added the required column `wsId` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wsId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_wsId_fkey" FOREIGN KEY ("wsId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
