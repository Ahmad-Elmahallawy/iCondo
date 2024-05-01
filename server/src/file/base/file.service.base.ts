import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  File, // @ts-ignore
  Company, // @ts-ignore
  CondoUnit, // @ts-ignore
  Property, // @ts-ignore
  User,
} from "@prisma/client";

export class FileServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.FileCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.FileCountArgs>
  ): Promise<number> {
    return this.prisma.file.count(args);
  }

  async files<T extends Prisma.FileFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.FileFindManyArgs>
  ): Promise<File[]> {
    return this.prisma.file.findMany(args);
  }
  async file<T extends Prisma.FileFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.FileFindUniqueArgs>
  ): Promise<File | null> {
    return this.prisma.file.findUnique(args);
  }
  async createFile<T extends Prisma.FileCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.FileCreateArgs>
  ): Promise<File> {
    return this.prisma.file.create<T>(args);
  }
  async updateFile<T extends Prisma.FileUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.FileUpdateArgs>
  ): Promise<File> {
    return this.prisma.file.update<T>(args);
  }
  async deleteFile<T extends Prisma.FileDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.FileDeleteArgs>
  ): Promise<File> {
    return this.prisma.file.delete(args);
  }

  async getCompany(parentId: number): Promise<Company | null> {
    return this.prisma.file
      .findUnique({
        where: { id: parentId },
      })
      .company();
  }

  async getCondoUnit(parentId: number): Promise<CondoUnit | null> {
    return this.prisma.file
      .findUnique({
        where: { id: parentId },
      })
      .condoUnit();
  }

  async getProperty(parentId: number): Promise<Property | null> {
    return this.prisma.file
      .findUnique({
        where: { id: parentId },
      })
      .property();
  }

  async getUser(parentId: number): Promise<User | null> {
    return this.prisma.file
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}
