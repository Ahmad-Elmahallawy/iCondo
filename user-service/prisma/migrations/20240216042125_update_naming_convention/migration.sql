/*
  Warnings:

  - You are about to drop the column `condo_Fee` on the `CondoUnit` table. All the data in the column will be lost.
  - You are about to drop the column `locker_id` on the `CondoUnit` table. All the data in the column will be lost.
  - You are about to drop the column `parkingspot_id` on the `CondoUnit` table. All the data in the column will be lost.
  - You are about to drop the column `property_id` on the `CondoUnit` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `condoUnitId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `propertyProperty_id` on the `File` table. All the data in the column will be lost.
  - The primary key for the `Locker` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `locker_id` on the `Locker` table. All the data in the column will be lost.
  - You are about to drop the column `property_id` on the `Locker` table. All the data in the column will be lost.
  - The primary key for the `ParkingSpot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `property_id` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `spot_id` on the `ParkingSpot` table. All the data in the column will be lost.
  - The primary key for the `Property` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `locker_Count` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `parking_count` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `property_id` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `unit_count` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `condo_unit_id` on the `RegistrationKey` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parkingspotID]` on the table `CondoUnit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lockerID]` on the table `CondoUnit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lockerID]` on the table `Locker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spotID]` on the table `ParkingSpot` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyID]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `condoFee` to the `CondoUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lockerID` to the `CondoUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parkingspotID` to the `CondoUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyID` to the `Locker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyID` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lockerCount` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parkingCount` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitCount` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condoUnitID` to the `RegistrationKey` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CondoUnit" DROP CONSTRAINT "CondoUnit_locker_id_fkey";

-- DropForeignKey
ALTER TABLE "CondoUnit" DROP CONSTRAINT "CondoUnit_parkingspot_id_fkey";

-- DropForeignKey
ALTER TABLE "CondoUnit" DROP CONSTRAINT "CondoUnit_property_id_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_companyId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_condoUnitId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_propertyProperty_id_fkey";

-- DropForeignKey
ALTER TABLE "Locker" DROP CONSTRAINT "Locker_property_id_fkey";

-- DropForeignKey
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_property_id_fkey";

-- DropForeignKey
ALTER TABLE "RegistrationKey" DROP CONSTRAINT "RegistrationKey_condo_unit_id_fkey";

-- DropIndex
DROP INDEX "CondoUnit_locker_id_key";

-- DropIndex
DROP INDEX "CondoUnit_parkingspot_id_key";

-- DropIndex
DROP INDEX "Locker_locker_id_key";

-- DropIndex
DROP INDEX "ParkingSpot_spot_id_key";

-- DropIndex
DROP INDEX "Property_property_id_key";

-- AlterTable
ALTER TABLE "CondoUnit" DROP COLUMN "condo_Fee",
DROP COLUMN "locker_id",
DROP COLUMN "parkingspot_id",
DROP COLUMN "property_id",
ADD COLUMN     "condoFee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lockerID" INTEGER NOT NULL,
ADD COLUMN     "parkingspotID" INTEGER NOT NULL,
ADD COLUMN     "propertyID" INTEGER;

-- AlterTable
ALTER TABLE "File" DROP COLUMN "companyId",
DROP COLUMN "condoUnitId",
DROP COLUMN "propertyProperty_id",
ADD COLUMN     "companyID" INTEGER,
ADD COLUMN     "condoUnitID" INTEGER,
ADD COLUMN     "propertyID" INTEGER;

-- AlterTable
ALTER TABLE "Locker" DROP CONSTRAINT "Locker_pkey",
DROP COLUMN "locker_id",
DROP COLUMN "property_id",
ADD COLUMN     "lockerID" SERIAL NOT NULL,
ADD COLUMN     "propertyID" INTEGER NOT NULL,
ADD CONSTRAINT "Locker_pkey" PRIMARY KEY ("lockerID");

-- AlterTable
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_pkey",
DROP COLUMN "property_id",
DROP COLUMN "spot_id",
ADD COLUMN     "propertyID" INTEGER NOT NULL,
ADD COLUMN     "spotID" SERIAL NOT NULL,
ADD CONSTRAINT "ParkingSpot_pkey" PRIMARY KEY ("spotID");

-- AlterTable
ALTER TABLE "Property" DROP CONSTRAINT "Property_pkey",
DROP COLUMN "locker_Count",
DROP COLUMN "parking_count",
DROP COLUMN "property_id",
DROP COLUMN "unit_count",
ADD COLUMN     "lockerCount" INTEGER NOT NULL,
ADD COLUMN     "parkingCount" INTEGER NOT NULL,
ADD COLUMN     "propertyID" SERIAL NOT NULL,
ADD COLUMN     "unitCount" INTEGER NOT NULL,
ADD CONSTRAINT "Property_pkey" PRIMARY KEY ("propertyID");

-- AlterTable
ALTER TABLE "RegistrationKey" DROP COLUMN "condo_unit_id",
ADD COLUMN     "condoUnitID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CondoUnit_parkingspotID_key" ON "CondoUnit"("parkingspotID");

-- CreateIndex
CREATE UNIQUE INDEX "CondoUnit_lockerID_key" ON "CondoUnit"("lockerID");

-- CreateIndex
CREATE UNIQUE INDEX "Locker_lockerID_key" ON "Locker"("lockerID");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingSpot_spotID_key" ON "ParkingSpot"("spotID");

-- CreateIndex
CREATE UNIQUE INDEX "Property_propertyID_key" ON "Property"("propertyID");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_condoUnitID_fkey" FOREIGN KEY ("condoUnitID") REFERENCES "CondoUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_propertyID_fkey" FOREIGN KEY ("propertyID") REFERENCES "Property"("propertyID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CondoUnit" ADD CONSTRAINT "CondoUnit_propertyID_fkey" FOREIGN KEY ("propertyID") REFERENCES "Property"("propertyID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CondoUnit" ADD CONSTRAINT "CondoUnit_parkingspotID_fkey" FOREIGN KEY ("parkingspotID") REFERENCES "ParkingSpot"("spotID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CondoUnit" ADD CONSTRAINT "CondoUnit_lockerID_fkey" FOREIGN KEY ("lockerID") REFERENCES "Locker"("lockerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSpot" ADD CONSTRAINT "ParkingSpot_propertyID_fkey" FOREIGN KEY ("propertyID") REFERENCES "Property"("propertyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locker" ADD CONSTRAINT "Locker_propertyID_fkey" FOREIGN KEY ("propertyID") REFERENCES "Property"("propertyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationKey" ADD CONSTRAINT "RegistrationKey_condoUnitID_fkey" FOREIGN KEY ("condoUnitID") REFERENCES "CondoUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
