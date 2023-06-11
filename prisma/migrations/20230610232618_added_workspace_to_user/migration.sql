-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_id_fkey";

-- AlterTable
ALTER TABLE "UserData" ADD COLUMN     "email" TEXT;
