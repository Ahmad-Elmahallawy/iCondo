import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  Reservation, // @ts-ignore
  CommonFacility, // @ts-ignore
  User,
} from "@prisma/client";

export class ReservationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ReservationCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReservationCountArgs>
  ): Promise<number> {
    return this.prisma.reservation.count(args);
  }

  async reservations<T extends Prisma.ReservationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReservationFindManyArgs>
  ): Promise<Reservation[]> {
    return this.prisma.reservation.findMany(args);
  }
  async reservation<T extends Prisma.ReservationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReservationFindUniqueArgs>
  ): Promise<Reservation | null> {
    return this.prisma.reservation.findUnique(args);
  }
  async createReservation<T extends Prisma.ReservationCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReservationCreateArgs>
  ): Promise<Reservation> {
    return this.prisma.reservation.create<T>(args);
  }
  async updateReservation<T extends Prisma.ReservationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReservationUpdateArgs>
  ): Promise<Reservation> {
    return this.prisma.reservation.update<T>(args);
  }
  async deleteReservation<T extends Prisma.ReservationDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReservationDeleteArgs>
  ): Promise<Reservation> {
    return this.prisma.reservation.delete(args);
  }

  async getCommonFacility(parentId: string): Promise<CommonFacility | null> {
    return this.prisma.reservation
      .findUnique({
        where: { id: parentId },
      })
      .commonFacility();
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.reservation
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}
