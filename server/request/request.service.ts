import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RequestServiceBase } from "./base/request.service.base";

@Injectable()
export class RequestService extends RequestServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
