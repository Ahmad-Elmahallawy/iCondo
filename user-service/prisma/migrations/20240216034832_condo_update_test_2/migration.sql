/*
  Warnings:

  - You are about to drop the column `condounit_id` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image_id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_condounit_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "fk_image";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "condounit_id",
ADD COLUMN     "condoUnitId" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_image_id";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_condoUnitId_fkey" FOREIGN KEY ("condoUnitId") REFERENCES "CondoUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
