-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company_employee" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "company_id" INTEGER,

    CONSTRAINT "Company_employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile_image" (
    "id" SERIAL NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- AddForeignKey
ALTER TABLE "Company_employee" ADD CONSTRAINT "fk_company" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Company_employee" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "fk_image" FOREIGN KEY ("profile_image_id") REFERENCES "Profile_image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "rules" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
