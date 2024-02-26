/*
  Warnings:

  - Added the required column `role` to the `RegistrationKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RegistrationKey" ADD COLUMN     "role" TEXT NOT NULL;
