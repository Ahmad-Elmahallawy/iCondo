import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ReplyService } from "./reply.service";
import { ReplyControllerBase } from "./base/reply.controller.base";

@swagger.ApiTags("replies")
@common.Controller("replies")
export class ReplyController extends ReplyControllerBase {
    constructor(
        protected readonly service: ReplyService,
        @nestAccessControl.InjectRolesBuilder()
        protected readonly rolesBuilder: nestAccessControl.RolesBuilder
    ) {
        super(service, rolesBuilder);
    }
}