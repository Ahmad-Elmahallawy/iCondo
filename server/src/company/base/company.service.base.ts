import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  Company, // @ts-ignore
  CompanyEmployee, // @ts-ignore
  File, // @ts-ignore
  Forum, // @ts-ignore
  Property, // @ts-ignore
  Request,
} from "@prisma/client";

export class CompanyServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.CompanyCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyCountArgs>
  ): Promise<number> {
    return this.prisma.company.count(args);
  }

  async companies<T extends Prisma.CompanyFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyFindManyArgs>
  ): Promise<Company[]> {
    return this.prisma.company.findMany(args);
  }
  async company<T extends Prisma.CompanyFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyFindUniqueArgs>
  ): Promise<Company | null> {
    return this.prisma.company.findUnique(args);
  }
  async createCompany<T extends Prisma.CompanyCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyCreateArgs>
  ): Promise<Company> {
    return this.prisma.company.create<T>(args);
  }
  async updateCompany<T extends Prisma.CompanyUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyUpdateArgs>
  ): Promise<Company> {
    return this.prisma.company.update<T>(args);
  }
  async deleteCompany<T extends Prisma.CompanyDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyDeleteArgs>
  ): Promise<Company> {
    return this.prisma.company.delete(args);
  }

  async findCompanyEmployees(
    parentId: number,
    args: Prisma.CompanyEmployeeFindManyArgs
  ): Promise<CompanyEmployee[]> {
    return this.prisma.company
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .companyEmployees(args);
  }

  async findFile(
    parentId: number,
    args: Prisma.FileFindManyArgs
  ): Promise<File[]> {
    return this.prisma.company
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .file(args);
  }

  async findForums(
      parentId: number,
      args: Prisma.ForumFindManyArgs
  ): Promise<Forum[]> {
    return this.prisma.company
        .findUniqueOrThrow({
          where: { id: parentId },
        })
        .forums(args);
  }

  async findProperties(
      parentId: number,
      args: Prisma.PropertyFindManyArgs
  ): Promise<Property[]> {
    return this.prisma.company
        .findUniqueOrThrow({
          where: { id: parentId },
        })
        .properties(args);
  }
  async findRequests(
      parentId: number,
      args: Prisma.RequestFindManyArgs
  ): Promise<Request[]> {
    return this.prisma.company
        .findUniqueOrThrow({
          where: { id: parentId },
        })
        .requests(args);
  }
}
