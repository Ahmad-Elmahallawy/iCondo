-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

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
    "condounit_id" INTEGER,

    CONSTRAINT "profile_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role_id" INTEGER NOT NULL,
    "password" VARCHAR(500),
    "username" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "profile_image_id" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "condo_Unit" (
    "unit_ID" SERIAL NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "condo_Fee" DOUBLE PRECISION NOT NULL,
    "property_id" INTEGER,
    "parkingspot_id" INTEGER NOT NULL,
    "locker_id" INTEGER NOT NULL,

    CONSTRAINT "condo_Unit_pkey" PRIMARY KEY ("unit_ID")
);

-- CreateTable
CREATE TABLE "Property" (
    "property_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit_count" INTEGER NOT NULL,
    "parking_count" INTEGER NOT NULL,
    "locker_Count" INTEGER NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("property_id")
);

-- CreateTable
CREATE TABLE "parking_Spot" (
    "spot_id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,

    CONSTRAINT "parking_Spot_pkey" PRIMARY KEY ("spot_id")
);

-- CreateTable
CREATE TABLE "Locker" (
    "locker_id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,

    CONSTRAINT "Locker_pkey" PRIMARY KEY ("locker_id")
);

-- CreateTable
CREATE TABLE "registration_Key" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "condo_unit_id" INTEGER NOT NULL,

    CONSTRAINT "registration_Key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserTocondo_Unit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "condo_Unit_unit_ID_key" ON "condo_Unit"("unit_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Property_property_id_key" ON "Property"("property_id");

-- CreateIndex
CREATE UNIQUE INDEX "parking_Spot_spot_id_key" ON "parking_Spot"("spot_id");

-- CreateIndex
CREATE UNIQUE INDEX "Locker_locker_id_key" ON "Locker"("locker_id");

-- CreateIndex
CREATE UNIQUE INDEX "registration_Key_id_key" ON "registration_Key"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_UserTocondo_Unit_AB_unique" ON "_UserTocondo_Unit"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTocondo_Unit_B_index" ON "_UserTocondo_Unit"("B");

-- AddForeignKey
ALTER TABLE "company_Employee" ADD CONSTRAINT "fk_company" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_Employee" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_condounit_id_fkey" FOREIGN KEY ("condounit_id") REFERENCES "condo_Unit"("unit_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "fk_image" FOREIGN KEY ("profile_image_id") REFERENCES "File"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "rules" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "condo_Unit" ADD CONSTRAINT "condo_Unit_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("property_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "condo_Unit" ADD CONSTRAINT "condo_Unit_parkingspot_id_fkey" FOREIGN KEY ("parkingspot_id") REFERENCES "parking_Spot"("spot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "condo_Unit" ADD CONSTRAINT "condo_Unit_locker_id_fkey" FOREIGN KEY ("locker_id") REFERENCES "Locker"("locker_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parking_Spot" ADD CONSTRAINT "parking_Spot_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locker" ADD CONSTRAINT "Locker_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_Key" ADD CONSTRAINT "registration_Key_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_Key" ADD CONSTRAINT "registration_Key_condo_unit_id_fkey" FOREIGN KEY ("condo_unit_id") REFERENCES "condo_Unit"("unit_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTocondo_Unit" ADD CONSTRAINT "_UserTocondo_Unit_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTocondo_Unit" ADD CONSTRAINT "_UserTocondo_Unit_B_fkey" FOREIGN KEY ("B") REFERENCES "condo_Unit"("unit_ID") ON DELETE CASCADE ON UPDATE CASCADE;
