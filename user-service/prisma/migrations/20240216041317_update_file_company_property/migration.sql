-- AlterTable
ALTER TABLE "File" ADD COLUMN     "companyId" INTEGER,
ADD COLUMN     "propertyProperty_id" INTEGER;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_propertyProperty_id_fkey" FOREIGN KEY ("propertyProperty_id") REFERENCES "Property"("property_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
