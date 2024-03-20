import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationServiceBase } from "./base/notification.service.base";

@Injectable()
export class NotificationService extends NotificationServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
