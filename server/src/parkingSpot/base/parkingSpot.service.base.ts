import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  ParkingSpot, // @ts-ignore
  CondoUnit, // @ts-ignore
  Property,
} from "@prisma/client";

export class ParkingSpotServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ParkingSpotCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.ParkingSpotCountArgs>
  ): Promise<number> {
    return this.prisma.parkingSpot.count(args);
  }

  async parkingSpots<T extends Prisma.ParkingSpotFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ParkingSpotFindManyArgs>
  ): Promise<ParkingSpot[]> {
    return this.prisma.parkingSpot.findMany(args);
  }
  async parkingSpot<T extends Prisma.ParkingSpotFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ParkingSpotFindUniqueArgs>
  ): Promise<ParkingSpot | null> {
    return this.prisma.parkingSpot.findUnique(args);
  }
  async createParkingSpot<T extends Prisma.ParkingSpotCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ParkingSpotCreateArgs>
  ): Promise<ParkingSpot> {
    return this.prisma.parkingSpot.create<T>(args);
  }
  async updateParkingSpot<T extends Prisma.ParkingSpotUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ParkingSpotUpdateArgs>
  ): Promise<ParkingSpot> {
    return this.prisma.parkingSpot.update<T>(args);
  }
  async deleteParkingSpot<T extends Prisma.ParkingSpotDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ParkingSpotDeleteArgs>
  ): Promise<ParkingSpot> {
    return this.prisma.parkingSpot.delete(args);
  }

  async getCondoUnit(parentId: number): Promise<CondoUnit | null> {
    return this.prisma.parkingSpot
      .findUnique({
        where: { id: parentId },
      })
      .condoUnit();
  }

  async getProperty(parentId: number): Promise<Property | null> {
    return this.prisma.parkingSpot
      .findUnique({
        where: { id: parentId },
      })
      .property();
  }
}
