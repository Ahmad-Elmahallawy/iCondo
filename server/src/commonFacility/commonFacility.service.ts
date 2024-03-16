import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CommonFacilityServiceBase } from "./base/commonFacility.service.base";

@Injectable()
export class CommonFacilityService extends CommonFacilityServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
