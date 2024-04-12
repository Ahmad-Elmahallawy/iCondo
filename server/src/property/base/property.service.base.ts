import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  Property, // @ts-ignore
  CondoUnit, // @ts-ignore
  File, // @ts-ignore
  Locker, // @ts-ignore
  Request, // @ts-ignore
  ParkingSpot, // @ts-ignore
  Company,
  CommonFacility as PrismaCommonFacility,
} from "@prisma/client";

export class PropertyServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.PropertyCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.PropertyCountArgs>
  ): Promise<number> {
    return this.prisma.property.count(args);
  }

  async properties<T extends Prisma.PropertyFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PropertyFindManyArgs>
  ): Promise<Property[]> {
    return this.prisma.property.findMany(args);
  }
  async property<T extends Prisma.PropertyFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PropertyFindUniqueArgs>
  ): Promise<Property | null> {
    return this.prisma.property.findUnique(args);
  }
  async createProperty<T extends Prisma.PropertyCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PropertyCreateArgs>
  ): Promise<Property> {
    return this.prisma.property.create<T>(args);
  }
  async updateProperty<T extends Prisma.PropertyUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PropertyUpdateArgs>
  ): Promise<Property> {
    return this.prisma.property.update<T>(args);
  }
  async deleteProperty<T extends Prisma.PropertyDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PropertyDeleteArgs>
  ): Promise<Property> {
    return this.prisma.property.delete(args);
  }

  async findCondoUnits(
    parentId: number,
    args: Prisma.CondoUnitFindManyArgs
  ): Promise<CondoUnit[]> {
    return this.prisma.property
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .condoUnits(args);
  }
  async findRequests(
      parentId: number,
      args: Prisma.RequestFindManyArgs
  ): Promise<Request[]> {
    return this.prisma.property
        .findUniqueOrThrow({
          where: { id: parentId },
        })
        .requests(args);
  }

  async findFiles(
    parentId: number,
    args: Prisma.FileFindManyArgs
  ): Promise<File[]> {
    return this.prisma.property
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .files(args);
  }

  async findLockers(
    parentId: number,
    args: Prisma.LockerFindManyArgs
  ): Promise<Locker[]> {
    return this.prisma.property
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .Lockers(args);
  }

  async findParkingSpots(
    parentId: number,
    args: Prisma.ParkingSpotFindManyArgs
  ): Promise<ParkingSpot[]> {
    return this.prisma.property
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .ParkingSpots(args);
  }

  async findCommonFacilities(
      parentId: number,
      args: Prisma.CommonFacilityFindManyArgs
  ): Promise<PrismaCommonFacility[]> {
    return this.prisma.property
        .findUniqueOrThrow({
          where: { id: parentId },
        })
        .commonFacilities(args);
  }

  async getCompany(parentId: number): Promise<Company | null> {
    return this.prisma.property
        .findUnique({
          where: { id: parentId },
        })
        .company();
  }
}
