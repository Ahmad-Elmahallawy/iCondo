/*
  Warnings:

  - You are about to drop the column `commonFacilityIDId` on the `Reservation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_commonFacilityIDId_fkey";

-- AlterTable
ALTER TABLE "CommonFacility" ADD COLUMN     "propertyId" INTEGER;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "propertyId" INTEGER,
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "commonFacilityIDId",
ADD COLUMN     "commonFacilityID" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonFacility" ADD CONSTRAINT "CommonFacility_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_commonFacilityID_fkey" FOREIGN KEY ("commonFacilityID") REFERENCES "CommonFacility"("id") ON DELETE SET NULL ON UPDATE CASCADE;
