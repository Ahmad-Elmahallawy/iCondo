import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserCondoServiceBase } from "./base/userCondo.service.base";

@Injectable()
export class UserCondoService extends UserCondoServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
