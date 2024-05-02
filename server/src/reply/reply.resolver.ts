import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { ReplyResolverBase } from "./base/reply.resolver.base";
import { Reply } from "./base/Reply";
import { ReplyService } from "./reply.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Reply)
export class ReplyResolver extends ReplyResolverBase {
    constructor(
        protected readonly service: ReplyService,
        @nestAccessControl.InjectRolesBuilder()
        protected readonly rolesBuilder: nestAccessControl.RolesBuilder
    ) {
        super(service, rolesBuilder);
    }
}