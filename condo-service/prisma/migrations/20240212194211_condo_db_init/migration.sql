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

-- CreateIndex
CREATE UNIQUE INDEX "condo_Unit_unit_ID_key" ON "condo_Unit"("unit_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Property_property_ID_key" ON "Property"("property_ID");

-- CreateIndex
CREATE UNIQUE INDEX "parkingSpot_spot_ID_key" ON "parkingSpot"("spot_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Locker_locker_ID_key" ON "Locker"("locker_ID");

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
