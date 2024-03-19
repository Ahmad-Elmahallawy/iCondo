import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, Notification } from "@prisma/client";

export class NotificationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.NotificationCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.NotificationCountArgs>
  ): Promise<number> {
    return this.prisma.notification.count(args);
  }

  async notifications<T extends Prisma.NotificationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.NotificationFindManyArgs>
  ): Promise<Notification[]> {
    return this.prisma.notification.findMany(args);
  }
  async notification<T extends Prisma.NotificationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.NotificationFindUniqueArgs>
  ): Promise<Notification | null> {
    return this.prisma.notification.findUnique(args);
  }
  async createNotification<T extends Prisma.NotificationCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.NotificationCreateArgs>
  ): Promise<Notification> {
    return this.prisma.notification.create<T>(args);
  }
  async updateNotification<T extends Prisma.NotificationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.NotificationUpdateArgs>
  ): Promise<Notification> {
    return this.prisma.notification.update<T>(args);
  }
  async deleteNotification<T extends Prisma.NotificationDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.NotificationDeleteArgs>
  ): Promise<Notification> {
    return this.prisma.notification.delete(args);
  }
}
