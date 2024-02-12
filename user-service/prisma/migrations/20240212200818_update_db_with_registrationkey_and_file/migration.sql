/*
  Warnings:

  - You are about to drop the `Company_employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile_image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Company_employee" DROP CONSTRAINT "fk_company";

-- DropForeignKey
ALTER TABLE "Company_employee" DROP CONSTRAINT "fk_user";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "fk_image";

-- DropTable
DROP TABLE "Company_employee";

-- DropTable
DROP TABLE "Profile_image";

-- CreateTable
CREATE TABLE "company_Employee" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "company_id" INTEGER,

    CONSTRAINT "company_Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "bucket" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "condo_UnitUnit_ID" INTEGER,

    CONSTRAINT "profile_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "condo_Unit" (
    "unit_ID" SERIAL NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "condo_Fee" DOUBLE PRECISION NOT NULL,
    "propertyProperty_ID" INTEGER,
    "parkingSpotSpot_ID" INTEGER NOT NULL,
    "lockerLocker_ID" INTEGER NOT NULL,

    CONSTRAINT "condo_Unit_pkey" PRIMARY KEY ("unit_ID")
);

-- CreateTable
CREATE TABLE "Property" (
    "property_ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit_Count" INTEGER NOT NULL,
    "parking_Count" INTEGER NOT NULL,
    "locker_Count" INTEGER NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("property_ID")
);

-- CreateTable
CREATE TABLE "parkingSpot" (
    "spot_ID" SERIAL NOT NULL,
    "property_ID" INTEGER NOT NULL,

    CONSTRAINT "parkingSpot_pkey" PRIMARY KEY ("spot_ID")
);

-- CreateTable
CREATE TABLE "Locker" (
    "locker_ID" SERIAL NOT NULL,
    "property_ID" INTEGER NOT NULL,

    CONSTRAINT "Locker_pkey" PRIMARY KEY ("locker_ID")
);

-- CreateTable
CREATE TABLE "registrationKey" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "condo_UnitUnit_ID" INTEGER NOT NULL,

    CONSTRAINT "registrationKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserTocondo_Unit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "condo_Unit_unit_ID_key" ON "condo_Unit"("unit_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Property_property_ID_key" ON "Property"("property_ID");

-- CreateIndex
CREATE UNIQUE INDEX "parkingSpot_spot_ID_key" ON "parkingSpot"("spot_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Locker_locker_ID_key" ON "Locker"("locker_ID");

-- CreateIndex
CREATE UNIQUE INDEX "registrationKey_id_key" ON "registrationKey"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_UserTocondo_Unit_AB_unique" ON "_UserTocondo_Unit"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTocondo_Unit_B_index" ON "_UserTocondo_Unit"("B");

-- AddForeignKey
ALTER TABLE "company_Employee" ADD CONSTRAINT "fk_company" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_Employee" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_condo_UnitUnit_ID_fkey" FOREIGN KEY ("condo_UnitUnit_ID") REFERENCES "condo_Unit"("unit_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "fk_image" FOREIGN KEY ("profile_image_id") REFERENCES "File"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "condo_Unit" ADD CONSTRAINT "condo_Unit_propertyProperty_ID_fkey" FOREIGN KEY ("propertyProperty_ID") REFERENCES "Property"("property_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "condo_Unit" ADD CONSTRAINT "condo_Unit_parkingSpotSpot_ID_fkey" FOREIGN KEY ("parkingSpotSpot_ID") REFERENCES "parkingSpot"("spot_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "condo_Unit" ADD CONSTRAINT "condo_Unit_lockerLocker_ID_fkey" FOREIGN KEY ("lockerLocker_ID") REFERENCES "Locker"("locker_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parkingSpot" ADD CONSTRAINT "parkingSpot_property_ID_fkey" FOREIGN KEY ("property_ID") REFERENCES "Property"("property_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locker" ADD CONSTRAINT "Locker_property_ID_fkey" FOREIGN KEY ("property_ID") REFERENCES "Property"("property_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrationKey" ADD CONSTRAINT "registrationKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrationKey" ADD CONSTRAINT "registrationKey_condo_UnitUnit_ID_fkey" FOREIGN KEY ("condo_UnitUnit_ID") REFERENCES "condo_Unit"("unit_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTocondo_Unit" ADD CONSTRAINT "_UserTocondo_Unit_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTocondo_Unit" ADD CONSTRAINT "_UserTocondo_Unit_B_fkey" FOREIGN KEY ("B") REFERENCES "condo_Unit"("unit_ID") ON DELETE CASCADE ON UPDATE CASCADE;
