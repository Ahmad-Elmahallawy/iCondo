-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "condoUnitID" INTEGER,
ADD COLUMN     "elevator" TEXT,
ADD COLUMN     "employeeID" INTEGER,
ADD COLUMN     "key" TEXT,
ADD COLUMN     "propertyID" INTEGER,
ADD COLUMN     "question" TEXT,
ADD COLUMN     "reportMessage" TEXT,
ADD COLUMN     "response" TEXT;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_condoUnitID_fkey" FOREIGN KEY ("condoUnitID") REFERENCES "CondoUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_propertyID_fkey" FOREIGN KEY ("propertyID") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;
