-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
