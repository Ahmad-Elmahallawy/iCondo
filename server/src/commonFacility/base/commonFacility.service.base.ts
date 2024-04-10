import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  CommonFacility as PrismaCommonFacility,
  Reservation as PrismaReservation,
  Property as PrismaProperty,
} from "@prisma/client";

export class CommonFacilityServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count (args: Omit<Prisma.CommonFacilityCountArgs, "select">
  ): Promise<number> {
    return this.prisma.commonFacility.count(args);
  }

  async commonFacilities<T extends Prisma.CommonFacilityFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CommonFacilityFindManyArgs>
  ): Promise<PrismaCommonFacility[]> {
    return this.prisma.commonFacility.findMany<Prisma.CommonFacilityFindManyArgs>(
        args
    );
  }
  async commonFacility<T extends Prisma.CommonFacilityFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CommonFacilityFindUniqueArgs>
  ): Promise<PrismaCommonFacility | null> {
    return this.prisma.commonFacility.findUnique(args);
  }
  async createCommonFacility<T extends Prisma.CommonFacilityCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CommonFacilityCreateArgs>
  ): Promise<PrismaCommonFacility> {
    return this.prisma.commonFacility.create<T>(args);
  }
  async updateCommonFacility<T extends Prisma.CommonFacilityUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CommonFacilityUpdateArgs>
  ): Promise<PrismaCommonFacility> {
    return this.prisma.commonFacility.update<T>(args);
  }
  async deleteCommonFacility<T extends Prisma.CommonFacilityDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CommonFacilityDeleteArgs>
  ): Promise<PrismaCommonFacility> {
    return this.prisma.commonFacility.delete(args);
  }

  async findAvailabilities(
    parentId: string,
    args: Prisma.ReservationFindManyArgs
  ): Promise<PrismaReservation[]> {
    return this.prisma.commonFacility
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .availabilities(args);
  }
  
  async getProperty(parentId: string): Promise<PrismaProperty | null> {
    return this.prisma.commonFacility
        .findUnique({
          where: { id: parentId },
        })
        .property();
  }
}
