-- AlterTable
ALTER TABLE "Forum" ADD COLUMN     "companyID" INTEGER;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
