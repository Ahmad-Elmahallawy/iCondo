-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "requestID" TEXT,
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_requestID_fkey" FOREIGN KEY ("requestID") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
