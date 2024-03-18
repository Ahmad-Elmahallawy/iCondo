-- CreateEnum
CREATE TYPE "EnumRequestStatus" AS ENUM ('New', 'In_Progress', 'Pending_Approval', 'Approved', 'Disapproved', 'Complete');

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "status" "EnumRequestStatus";
