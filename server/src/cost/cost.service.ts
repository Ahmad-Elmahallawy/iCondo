import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CostServiceBase } from "./base/cost.service.base";

@Injectable()
export class CostService extends CostServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
