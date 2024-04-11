/*
  Warnings:

  - You are about to drop the column `propertyId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_propertyId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "propertyId",
DROP COLUMN "status";
