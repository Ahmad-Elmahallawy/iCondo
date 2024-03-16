import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ForumService } from "./forum.service";
import { ForumControllerBase } from "./base/forum.controller.base";

@swagger.ApiTags("forums")
@common.Controller("forums")
export class ForumController extends ForumControllerBase {
  constructor(
    protected readonly service: ForumService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
