import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RegistrationKeyServiceBase } from "./base/registrationKey.service.base";

@Injectable()
export class RegistrationKeyService extends RegistrationKeyServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    // @ts-ignore
    super(prisma);
  }
}
