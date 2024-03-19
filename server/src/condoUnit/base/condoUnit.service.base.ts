import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  CondoUnit, // @ts-ignore
  File, // @ts-ignore
  ParkingSpot, // @ts-ignore
  UserCondo, // @ts-ignore
  Locker, // @ts-ignore
  Request, // @ts-ignore
  Property, // @ts-ignore
  RegistrationKey,
} from "@prisma/client";

export class CondoUnitServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.CondoUnitCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.CondoUnitCountArgs>
  ): Promise<number> {
    return this.prisma.condoUnit.count(args);
  }

  async condoUnits<T extends Prisma.CondoUnitFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CondoUnitFindManyArgs>
  ): Promise<CondoUnit[]> {
    return this.prisma.condoUnit.findMany(args);
  }
  async condoUnit<T extends Prisma.CondoUnitFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CondoUnitFindUniqueArgs>
  ): Promise<CondoUnit | null> {
    return this.prisma.condoUnit.findUnique(args);
  }
  async createCondoUnit<T extends Prisma.CondoUnitCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CondoUnitCreateArgs>
  ): Promise<CondoUnit> {
    return this.prisma.condoUnit.create<T>(args);
  }
  async updateCondoUnit<T extends Prisma.CondoUnitUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CondoUnitUpdateArgs>
  ): Promise<CondoUnit> {
    return this.prisma.condoUnit.update<T>(args);
  }
  async deleteCondoUnit<T extends Prisma.CondoUnitDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CondoUnitDeleteArgs>
  ): Promise<CondoUnit> {
    return this.prisma.condoUnit.delete(args);
  }

  async findFile(
    parentId: number,
    args: Prisma.FileFindManyArgs
  ): Promise<File[]> {
    return this.prisma.condoUnit
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .file(args);
  }

  async findParkingSpot(
    parentId: number,
    args: Prisma.ParkingSpotFindManyArgs
  ): Promise<ParkingSpot[]> {
    return this.prisma.condoUnit
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .parkingSpot(args);
  }

  async findRequests(
      parentId: number,
      args: Prisma.RequestFindManyArgs
  ): Promise<Request[]> {
    return this.prisma.condoUnit
        .findUniqueOrThrow({
          where: { id: parentId },
        })
        .requests(args);
  }

  async findUserCondos(
    parentId: number,
    args: Prisma.UserCondoFindManyArgs
  ): Promise<UserCondo[]> {
    return this.prisma.condoUnit
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .userCondos(args);
  }

  async getLocker(parentId: number): Promise<Locker | null> {
    return this.prisma.condoUnit
      .findUnique({
        where: { id: parentId },
      })
      .locker();
  }

  async getPropertyId(parentId: number): Promise<Property | null> {
    return this.prisma.condoUnit
      .findUnique({
        where: { id: parentId },
      })
      .propertyID();
  }

  async getRegistrationKeys(parentId: number): Promise<RegistrationKey | null> {
    return this.prisma.condoUnit
      .findUnique({
        where: { id: parentId },
      })
      .registrationKeys();
  }
}
