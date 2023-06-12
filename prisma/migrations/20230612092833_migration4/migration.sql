/*
  Warnings:

  - The primary key for the `Board` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bid` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Board` table. All the data in the column will be lost.
  - The primary key for the `Bookmark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bmid` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `favicon` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Bookmark` table. All the data in the column will be lost.
  - The primary key for the `List` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isDeleted` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `lid` on the `List` table. All the data in the column will be lost.
  - The primary key for the `Workspace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Workspace` table. All the data in the column will be lost.
  - You are about to drop the column `wsid` on the `Workspace` table. All the data in the column will be lost.
  - The required column `id` was added to the `Board` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Bookmark` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `List` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Workspace` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_bid_fkey";

-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_bmid_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_lid_fkey";

-- AlterTable
ALTER TABLE "Board" DROP CONSTRAINT "Board_pkey",
DROP COLUMN "bid",
DROP COLUMN "isDeleted",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Board_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_pkey",
DROP COLUMN "bmid",
DROP COLUMN "favicon",
DROP COLUMN "isDeleted",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "List" DROP CONSTRAINT "List_pkey",
DROP COLUMN "isDeleted",
DROP COLUMN "lid",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "List_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_pkey",
DROP COLUMN "email",
DROP COLUMN "wsid",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id");
