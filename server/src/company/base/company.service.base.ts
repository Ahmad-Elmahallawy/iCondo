/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  Company, // @ts-ignore
  CompanyEmployee, // @ts-ignore
  File,
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
}