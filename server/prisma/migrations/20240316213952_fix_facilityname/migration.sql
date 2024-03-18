/*
  Warnings:

  - The `facilityType` column on the `CommonFacility` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `requestType` column on the `Request` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EnumCommonFacilityType" AS ENUM ('sky_lounge', 'spa_fitness', 'sauna');

-- CreateEnum
CREATE TYPE "EnumRequestType" AS ENUM ('moving_in', 'moving_out', 'intercom_change', 'access_request', 'violation_report', 'deficiency_report', 'question');

-- AlterTable
ALTER TABLE "CommonFacility" DROP COLUMN "facilityType",
ADD COLUMN     "facilityType" "EnumCommonFacilityType";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "requestType",
ADD COLUMN     "requestType" "EnumRequestType";

-- DropEnum
DROP TYPE "EnumCommonFacilityFacilityType";

-- DropEnum
DROP TYPE "EnumRequestRequestType";
