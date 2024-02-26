import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CondoUnitServiceBase } from "./base/condoUnit.service.base";

@Injectable()
export class CondoUnitService extends CondoUnitServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
