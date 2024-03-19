import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  CompanyEmployee, // @ts-ignore
  Company, // @ts-ignore
    Request,
  User,
} from "@prisma/client";

export class CompanyEmployeeServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.CompanyEmployeeCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyEmployeeCountArgs>
  ): Promise<number> {
    return this.prisma.companyEmployee.count(args);
  }

  async companyEmployees<T extends Prisma.CompanyEmployeeFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyEmployeeFindManyArgs>
  ): Promise<CompanyEmployee[]> {
    return this.prisma.companyEmployee.findMany(args);
  }
  async companyEmployee<T extends Prisma.CompanyEmployeeFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyEmployeeFindUniqueArgs>
  ): Promise<CompanyEmployee | null> {
    return this.prisma.companyEmployee.findUnique(args);
  }
  async createCompanyEmployee<T extends Prisma.CompanyEmployeeCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyEmployeeCreateArgs>
  ): Promise<CompanyEmployee> {
    return this.prisma.companyEmployee.create<T>(args);
  }
  async updateCompanyEmployee<T extends Prisma.CompanyEmployeeUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyEmployeeUpdateArgs>
  ): Promise<CompanyEmployee> {
    return this.prisma.companyEmployee.update<T>(args);
  }
  async deleteCompanyEmployee<T extends Prisma.CompanyEmployeeDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompanyEmployeeDeleteArgs>
  ): Promise<CompanyEmployee> {
    return this.prisma.companyEmployee.delete(args);
  }

  async getCompany(parentId: number): Promise<Company | null> {
    return this.prisma.companyEmployee
      .findUnique({
        where: { id: parentId },
      })
      .company();
  }

  async getUser(parentId: number): Promise<User | null> {
    return this.prisma.companyEmployee
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }

  async findRequests(
      parentId: number,
      args: Prisma.RequestFindManyArgs
  ): Promise<Request[]> {
    return this.prisma.companyEmployee
        .findUniqueOrThrow({
          where: { id: parentId },
        })
        .requests(args);
  }
}
