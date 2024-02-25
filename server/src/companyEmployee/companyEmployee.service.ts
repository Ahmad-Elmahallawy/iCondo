import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CompanyEmployeeServiceBase } from "./base/companyEmployee.service.base";

@Injectable()
export class CompanyEmployeeService extends CompanyEmployeeServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
