/*
  Warnings:

  - You are about to drop the column `condo_UnitUnit_ID` on the `File` table. All the data in the column will be lost.
  - The primary key for the `Locker` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `locker_ID` on the `Locker` table. All the data in the column will be lost.
  - You are about to drop the column `property_ID` on the `Locker` table. All the data in the column will be lost.
  - The primary key for the `Property` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `parking_Count` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `property_ID` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `unit_Count` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the `_UserTocondo_Unit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company_Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `condo_Unit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parkingSpot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `registrationKey` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[locker_id]` on the table `Locker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[property_id]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `property_id` to the `Locker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parking_count` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_count` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_condo_UnitUnit_ID_fkey";

-- DropForeignKey
ALTER TABLE "Locker" DROP CONSTRAINT "Locker_property_ID_fkey";

-- DropForeignKey
ALTER TABLE "_UserTocondo_Unit" DROP CONSTRAINT "_UserTocondo_Unit_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserTocondo_Unit" DROP CONSTRAINT "_UserTocondo_Unit_B_fkey";

-- DropForeignKey
ALTER TABLE "company_Employee" DROP CONSTRAINT "fk_company";

-- DropForeignKey
ALTER TABLE "company_Employee" DROP CONSTRAINT "fk_user";

-- DropForeignKey
ALTER TABLE "condo_Unit" DROP CONSTRAINT "condo_Unit_lockerLocker_ID_fkey";

-- DropForeignKey
ALTER TABLE "condo_Unit" DROP CONSTRAINT "condo_Unit_parkingSpotSpot_ID_fkey";

-- DropForeignKey
ALTER TABLE "condo_Unit" DROP CONSTRAINT "condo_Unit_propertyProperty_ID_fkey";

-- DropForeignKey
ALTER TABLE "parkingSpot" DROP CONSTRAINT "parkingSpot_property_ID_fkey";

-- DropForeignKey
ALTER TABLE "registrationKey" DROP CONSTRAINT "registrationKey_condo_UnitUnit_ID_fkey";

-- DropForeignKey
ALTER TABLE "registrationKey" DROP CONSTRAINT "registrationKey_userId_fkey";

-- DropIndex
DROP INDEX "Locker_locker_ID_key";

-- DropIndex
DROP INDEX "Property_property_ID_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "condo_UnitUnit_ID",
ADD COLUMN     "condounit_id" INTEGER;

-- AlterTable
ALTER TABLE "Locker" DROP CONSTRAINT "Locker_pkey",
DROP COLUMN "locker_ID",
DROP COLUMN "property_ID",
ADD COLUMN     "locker_id" SERIAL NOT NULL,
ADD COLUMN     "property_id" INTEGER NOT NULL,
ADD CONSTRAINT "Locker_pkey" PRIMARY KEY ("locker_id");

-- AlterTable
ALTER TABLE "Property" DROP CONSTRAINT "Property_pkey",
DROP COLUMN "parking_Count",
DROP COLUMN "property_ID",
DROP COLUMN "unit_Count",
ADD COLUMN     "parking_count" INTEGER NOT NULL,
ADD COLUMN     "property_id" SERIAL NOT NULL,
ADD COLUMN     "unit_count" INTEGER NOT NULL,
ADD CONSTRAINT "Property_pkey" PRIMARY KEY ("property_id");

-- DropTable
DROP TABLE "_UserTocondo_Unit";

-- DropTable
DROP TABLE "company_Employee";

-- DropTable
DROP TABLE "condo_Unit";

-- DropTable
DROP TABLE "parkingSpot";

-- DropTable
DROP TABLE "registrationKey";

-- CreateTable
CREATE TABLE "CompanyEmployee" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "company_id" INTEGER,

    CONSTRAINT "CompanyEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CondoUnit" (
    "id" SERIAL NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "condo_Fee" DOUBLE PRECISION NOT NULL,
    "property_id" INTEGER,
    "parkingspot_id" INTEGER NOT NULL,
    "locker_id" INTEGER NOT NULL,

    CONSTRAINT "CondoUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingSpot" (
    "spot_id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,

    CONSTRAINT "ParkingSpot_pkey" PRIMARY KEY ("spot_id")
);

-- CreateTable
CREATE TABLE "RegistrationKey" (
    "id" SERIAL NOT NULL,
    "condo_unit_id" INTEGER NOT NULL,

    CONSTRAINT "RegistrationKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCondo" (
    "userID" INTEGER NOT NULL,
    "condoID" INTEGER NOT NULL,
    "roleID" INTEGER NOT NULL,

    CONSTRAINT "UserCondo_pkey" PRIMARY KEY ("userID","condoID")
);

-- CreateIndex
CREATE UNIQUE INDEX "CondoUnit_id_key" ON "CondoUnit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CondoUnit_parkingspot_id_key" ON "CondoUnit"("parkingspot_id");

-- CreateIndex
CREATE UNIQUE INDEX "CondoUnit_locker_id_key" ON "CondoUnit"("locker_id");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingSpot_spot_id_key" ON "ParkingSpot"("spot_id");

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationKey_id_key" ON "RegistrationKey"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Locker_locker_id_key" ON "Locker"("locker_id");

-- CreateIndex
CREATE UNIQUE INDEX "Property_property_id_key" ON "Property"("property_id");

-- AddForeignKey
ALTER TABLE "CompanyEmployee" ADD CONSTRAINT "fk_company" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CompanyEmployee" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_condounit_id_fkey" FOREIGN KEY ("condounit_id") REFERENCES "CondoUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CondoUnit" ADD CONSTRAINT "CondoUnit_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("property_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CondoUnit" ADD CONSTRAINT "CondoUnit_parkingspot_id_fkey" FOREIGN KEY ("parkingspot_id") REFERENCES "ParkingSpot"("spot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CondoUnit" ADD CONSTRAINT "CondoUnit_locker_id_fkey" FOREIGN KEY ("locker_id") REFERENCES "Locker"("locker_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSpot" ADD CONSTRAINT "ParkingSpot_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locker" ADD CONSTRAINT "Locker_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationKey" ADD CONSTRAINT "RegistrationKey_condo_unit_id_fkey" FOREIGN KEY ("condo_unit_id") REFERENCES "CondoUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCondo" ADD CONSTRAINT "UserCondo_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCondo" ADD CONSTRAINT "UserCondo_condoID_fkey" FOREIGN KEY ("condoID") REFERENCES "CondoUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
