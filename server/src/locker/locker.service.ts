import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LockerServiceBase } from "./base/locker.service.base";

@Injectable()
export class LockerService extends LockerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
