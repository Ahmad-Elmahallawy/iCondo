import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ReplyServiceBase } from "./base/reply.service.base";

@Injectable()
export class ReplyService extends ReplyServiceBase {
    constructor(protected readonly prisma: PrismaService) {
        super(prisma);
    }
}