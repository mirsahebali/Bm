/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserData` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "isDelted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "isDelted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "isDelted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "isDelted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "UserData_email_key" ON "UserData"("email");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_id_fkey" FOREIGN KEY ("id") REFERENCES "UserData"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
